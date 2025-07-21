import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GenerateImageParams {
  prompt: string;
  style?: 'professional' | 'medical' | 'fitness' | 'nutrition';
  size?: '1024x1024' | '1536x1024' | '1024x1536';
  provider?: 'auto' | 'huggingface' | 'openai';
  model?: 'stable-diffusion-2-1' | 'stable-diffusion-xl' | 'flux-schnell' | 'flux-dev' | 'playground-v2' | 'dreamshaper' | 'realistic-vision';
}

export interface GeneratedImage {
  imageUrl: string;
  success: boolean;
}

export const useImageGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async ({ prompt, style = 'professional', size = '1024x1024', provider = 'auto', model }: GenerateImageParams): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      console.log('Generating image with prompt:', prompt, 'provider:', provider, 'model:', model);
      
      const { data, error: functionError } = await supabase.functions.invoke('generate-image', {
        body: { prompt, style, size, provider, model }
      });

      console.log('Function response:', { data, functionError });

      if (functionError) {
        console.error('Function error details:', functionError);
        throw new Error(functionError.message);
      }

      if (data?.error) {
        console.error('Data error details:', data);
        throw new Error(data.details || data.error);
      }

      if (data.success && data.imageUrl) {
        toast.success('🎨 Imagem gerada com sucesso!');
        return data.imageUrl;
      }

      throw new Error('Falha ao gerar imagem');
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao gerar imagem';
      setError(errorMessage);
      toast.error('❌ ' + errorMessage);
      console.error('Image Generation Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateImage,
    loading,
    error,
    clearError: () => setError(null)
  };
};