import { useState } from 'react';
import { ArrowLeft, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ImageUpload';
import EvaluationCard from '@/components/EvaluationCard';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface NutritionModuleProps {
  onBack: () => void;
}

const NutritionModule = ({ onBack }: NutritionModuleProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState({
    vegetables: 0,
    proteins: 0,
    healthiness: 0,
    analysis: '',
    tip: ''
  });
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowResults(false);
  };

  const handleEvaluationSubmit = () => {
    if (evaluation.vegetables && evaluation.proteins && evaluation.healthiness && evaluation.analysis) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-green-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Nutricionista IA
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Análise Nutricional <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Inteligente</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Envie uma foto do seu prato e receba uma avaliação nutricional completa com classificação de saúde e estimativa de calorias
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {!uploadedImage ? (
            <ImageUpload onImageUpload={handleImageUpload} />
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Display */}
              <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Utensils className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Prato para Análise</h3>
                  </div>
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={uploadedImage} 
                      alt="Prato para avaliação nutricional"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setUploadedImage(null)}
                    className="w-full border-green-200 text-green-600 hover:bg-green-50"
                  >
                    Enviar Nova Foto
                  </Button>
                </div>
              </div>

              {/* Evaluation Form */}
              <div className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-lg p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Avaliação Nutricional</h3>

                  <EvaluationCard
                    title="Presença de Vegetais"
                    description="Quantidade e variedade de vegetais no prato"
                    value={evaluation.vegetables}
                    onChange={(value) => setEvaluation(prev => ({ ...prev, vegetables: value }))}
                    icon={<Utensils className="w-5 h-5" />}
                    color="green"
                  />

                  <EvaluationCard
                    title="Qualidade das Proteínas"
                    description="Presença e preparo das proteínas"
                    value={evaluation.proteins}
                    onChange={(value) => setEvaluation(prev => ({ ...prev, proteins: value }))}
                    icon={<Utensils className="w-5 h-5" />}
                    color="blue"
                  />

                  <EvaluationCard
                    title="Nível de Saudabilidade"
                    description="Avaliação geral do prato (frituras, processados)"
                    value={evaluation.healthiness}
                    onChange={(value) => setEvaluation(prev => ({ ...prev, healthiness: value }))}
                    icon={<Utensils className="w-5 h-5" />}
                    color="emerald"
                  />

                  <div className="space-y-3">
                    <Label htmlFor="analysis" className="text-sm font-medium text-gray-700">
                      Análise Detalhada do Prato
                    </Label>
                    <Textarea
                      id="analysis"
                      placeholder="Descreva os alimentos presentes, métodos de preparo, quantidade e composição nutricional observada..."
                      value={evaluation.analysis}
                      onChange={(e) => setEvaluation(prev => ({ ...prev, analysis: e.target.value }))}
                      className="min-h-24 border-gray-200 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="tip" className="text-sm font-medium text-gray-700">
                      Dica de Melhoria
                    </Label>
                    <Textarea
                      id="tip"
                      placeholder="Sugestão para tornar a refeição mais saudável..."
                      value={evaluation.tip}
                      onChange={(e) => setEvaluation(prev => ({ ...prev, tip: e.target.value }))}
                      className="min-h-20 border-gray-200 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>

                  <Button 
                    onClick={handleEvaluationSubmit}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3"
                    disabled={!evaluation.vegetables || !evaluation.proteins || !evaluation.healthiness || !evaluation.analysis}
                  >
                    Gerar Análise Nutricional
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showResults && (
            <div className="mt-8">
              <ResultsDisplay evaluation={evaluation} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NutritionModule;
