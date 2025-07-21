import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const groqApiKey = Deno.env.get('GROQ_API_KEY');

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
    const { prompt, context, type } = await req.json();

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

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${context ? `Contexto: ${context}\n\n` : ''}${prompt}` }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: false
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API Error:', error);
      throw new Error(`Groq API Error: ${response.status} ${error}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

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