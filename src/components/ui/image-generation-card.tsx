import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, RefreshCw, ImageIcon } from 'lucide-react';
import { useImageGeneration } from '@/hooks/useImageGeneration';

interface ImageGenerationCardProps {
  prompt: string;
  title: string;
  description?: string;
  style?: 'professional' | 'medical' | 'fitness' | 'nutrition';
  autoGenerate?: boolean;
  className?: string;
}

export const ImageGenerationCard = ({ 
  prompt, 
  title, 
  description, 
  style = 'professional',
  autoGenerate = false,
  className = ""
}: ImageGenerationCardProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { generateImage, loading } = useImageGeneration();

  const handleGenerateImage = async () => {
    const imageUrl = await generateImage({ prompt, style });
    if (imageUrl) {
      setGeneratedImage(imageUrl);
      setHasGenerated(true);
    }
  };

  // Auto-generate if requested and not yet generated
  if (autoGenerate && !hasGenerated && !loading) {
    handleGenerateImage();
  }

  return (
    <Card className={`p-6 bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            {description && (
              <p className="text-sm text-slate-600">{description}</p>
            )}
          </div>
        </div>

        <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                <p className="text-sm text-slate-600">Gerando imagem...</p>
              </div>
            </div>
          ) : generatedImage ? (
            <img 
              src={generatedImage} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
              <ImageIcon className="w-12 h-12 mb-2" />
              <p className="text-sm">Clique em gerar para ver a demonstração visual</p>
            </div>
          )}
        </div>

        <Button 
          onClick={handleGenerateImage}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              {generatedImage ? 'Gerar Nova Imagem' : 'Gerar Demonstração Visual'}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};