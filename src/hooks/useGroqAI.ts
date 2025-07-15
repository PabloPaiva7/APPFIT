import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AIRequest {
  prompt: string;
  context?: string;
  type?: 'workout' | 'pain_analysis' | 'nutrition' | 'mental_coach' | 'habits' | 'general';
}

export interface AIResponse {
  response: string;
  type: string;
}

export const useGroqAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async ({ prompt, context, type = 'general' }: AIRequest): Promise<AIResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('groq-ai', {
        body: { prompt, context, type }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (data.error) {
        throw new Error(data.details || data.error);
      }

      return data as AIResponse;
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao conectar com a IA';
      setError(errorMessage);
      console.error('Groq AI Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateResponse,
    loading,
    error,
    clearError: () => setError(null)
  };
};