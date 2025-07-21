import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const huggingFaceApiKey = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Available Hugging Face models for image generation
const HUGGING_FACE_MODELS = {
  'stable-diffusion-2-1': 'stabilityai/stable-diffusion-2-1',
  'stable-diffusion-xl': 'stabilityai/stable-diffusion-xl-base-1.0',
  'flux-schnell': 'black-forest-labs/FLUX.1-schnell',
  'flux-dev': 'black-forest-labs/FLUX.1-dev',
  'playground-v2': 'playgroundai/playground-v2-1024px-aesthetic',
  'dreamshaper': 'Lykon/DreamShaper',
  'realistic-vision': 'SG161222/Realistic_Vision_V5.1_noVAE'
};

// Function to analyze prompt and suggest best model
async function analyzePrompt(prompt: string): Promise<string> {
  if (!openAIApiKey) return 'flux-schnell'; // Default fallback
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `Analise o prompt de geração de imagem e escolha o melhor modelo da lista:
          
- stable-diffusion-2-1: Modelo versátil, boa qualidade geral
- stable-diffusion-xl: Alta resolução, detalhes nítidos
- flux-schnell: Rápido, boa para testes e protótipos
- flux-dev: Alta qualidade, mais lento
- playground-v2: Estética profissional, boa para marketing
- dreamshaper: Estilo artístico, fantasia
- realistic-vision: Fotorrealismo, pessoas, retratos

Responda APENAS com o nome do modelo (ex: flux-dev).`
        }, {
          role: 'user',
          content: `Prompt: "${prompt}"`
        }],
        max_tokens: 50,
        temperature: 0.1
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const suggestedModel = data.choices[0].message.content.trim();
      return HUGGING_FACE_MODELS[suggestedModel] ? suggestedModel : 'flux-schnell';
    }
  } catch (error) {
    console.error('Error analyzing prompt:', error);
  }
  
  return 'flux-schnell'; // Default fallback
}

// Function to generate image with Hugging Face
async function generateWithHuggingFace(model: string, prompt: string): Promise<string> {
  const modelId = HUGGING_FACE_MODELS[model];
  
  const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${huggingFaceApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        num_inference_steps: model.includes('flux') ? 4 : 20,
        guidance_scale: 7.5,
        width: 1024,
        height: 1024
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Hugging Face API Error:', response.status, errorText);
    throw new Error(`Hugging Face API Error: ${response.status} - ${errorText}`);
  }

  const imageBlob = await response.blob();
  const arrayBuffer = await imageBlob.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  
  return `data:image/png;base64,${base64}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style = 'professional', size = '1024x1024', provider = 'auto', model } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt é obrigatório' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generating image with prompt:', prompt, 'provider:', provider);

    let imageUrl: string;
    let usedModel: string;

    if (provider === 'huggingface' || (provider === 'auto' && huggingFaceApiKey)) {
      // Use Hugging Face with AI model selection
      if (!huggingFaceApiKey) {
        throw new Error('HUGGING_FACE_ACCESS_TOKEN não configurado');
      }

      // Analyze prompt to choose best model
      const selectedModel = model || await analyzePrompt(prompt);
      usedModel = selectedModel;
      
      console.log('Selected model:', selectedModel);
      
      imageUrl = await generateWithHuggingFace(selectedModel, prompt);
      
    } else {
      // Use OpenAI DALL-E as fallback
      if (!openAIApiKey) {
        throw new Error('OPENAI_API_KEY não configurado');
      }

      usedModel = 'dall-e-3';
      
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: size,
          quality: 'hd',
          response_format: 'b64_json'
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API Error Status:', response.status);
        console.error('OpenAI API Error Response:', errorText);
        
        let errorMessage = `OpenAI API Error: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage += ` - ${errorData.error?.message || errorText}`;
        } catch {
          errorMessage += ` - ${errorText}`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const imageData = data.data[0];
      imageUrl = `data:image/png;base64,${imageData.b64_json}`;
    }
    
    console.log('Image generated successfully with model:', usedModel);

    return new Response(
      JSON.stringify({ 
        imageUrl,
        success: true,
        model: usedModel,
        provider: provider === 'auto' ? (huggingFaceApiKey ? 'huggingface' : 'openai') : provider
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-image function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Falha ao gerar imagem',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});