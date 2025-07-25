import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const huggingFaceApiKey = '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';

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
    console.log('Hugging Face API Key available:', !!huggingFaceApiKey);
    if (!huggingFaceApiKey) {
      console.error('Hugging Face API key not found');
      throw new Error('Hugging Face API key não configurada');
    }
    
    const { prompt, context, type } = await req.json();
    console.log('Request received:', { type, hasPrompt: !!prompt, hasContext: !!context });

    let systemPrompt = "";
    
    switch (type) {
      case 'workout':
        systemPrompt = `Você é um personal trainer especialista. Com base nas informações do usuário, crie um treino personalizado, eficiente e seguro. Seja específico sobre exercícios, séries, repetições e tempo de descanso. Use linguagem motivadora e técnica.`;
        break;
      case 'pain_analysis':
        systemPrompt = `Você é um fisioterapeuta e especialista em biomecânica. Analise o relato de dor/desconforto do usuário e forneça orientações sobre possíveis causas, exercícios de alívio e quando procurar ajuda profissional. IMPORTANTE: Sempre recomende consultar um profissional para casos persistentes.`;
        break;
      case 'nutrition':
        systemPrompt = `Você é um nutricionista esportivo. Com base no perfil e objetivos do usuário, forneça orientações nutricionais personalizadas, sugestões de refeições e hidratação. Seja prático e considere a rotina da pessoa.`;
        break;
      case 'mental_coach':
        systemPrompt = `Você é um psicólogo esportivo e coach mental. Ajude o usuário com motivação, gestão de estresse, foco e bem-estar mental. Use técnicas de coaching e psicologia positiva.`;
        break;
      case 'habits':
        systemPrompt = `Você é um especialista em formação de hábitos saudáveis. Crie planos práticos e sustentáveis baseados na ciência comportamental. Foque em pequenas mudanças que geram grandes resultados.`;
        break;
      default:
        systemPrompt = `Você é uma equipe completa de profissionais da saúde e bem-estar (personal trainer, fisioterapeuta, nutricionista, psicólogo esportivo). Forneça orientações holísticas e personalizadas.`;
    }

    const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `<s>[INST] <<SYS>>\n${systemPrompt}\n<</SYS>>\n\n${context ? `Contexto: ${context}\n\n` : ''}${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 2000,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Hugging Face API Error:', error);
      throw new Error(`Hugging Face API Error: ${response.status} ${error}`);
    }

    const data = await response.json();
    console.log('Hugging Face response:', data);
    
    let aiResponse: string;
    if (Array.isArray(data) && data[0]?.generated_text) {
      aiResponse = data[0].generated_text;
    } else if (data.generated_text) {
      aiResponse = data.generated_text;
    } else {
      throw new Error('Formato de resposta inesperado da API');
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      type: type || 'general'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in groq-ai function:', error);
    return new Response(JSON.stringify({ 
      error: 'Falha ao processar solicitação de IA',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});