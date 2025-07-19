import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar se a chave da API está configurada
    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY não está configurada');
      return new Response(
        JSON.stringify({ 
          error: 'Chave da API OpenAI não configurada',
          details: 'OPENAI_API_KEY não está definida nas variáveis de ambiente' 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { prompt, style = 'professional', size = '1024x1024' } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt é obrigatório' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Generating image with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: prompt,
        n: 1,
        size: size,
        quality: 'high',
        output_format: 'webp',
        background: 'auto'
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
    
    // OpenAI gpt-image-1 returns base64 directly
    const imageData = data.data[0];
    
    console.log('Image generated successfully');

    return new Response(
      JSON.stringify({ 
        imageUrl: `data:image/webp;base64,${imageData.b64_json}`,
        success: true
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