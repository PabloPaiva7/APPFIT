
import { useState } from 'react';
import { Upload, Camera, Star, TrendingUp, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/ImageUpload';
import EvaluationCard from '@/components/EvaluationCard';
import ResultsDisplay from '@/components/ResultsDisplay';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState({
    muscleDefinition: 0,
    posture: 0,
    bodyFat: 0,
    analysis: '',
    tip: ''
  });
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowResults(false);
  };

  const handleEvaluationSubmit = () => {
    if (evaluation.muscleDefinition && evaluation.posture && evaluation.bodyFat && evaluation.analysis) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Avaliador Corporal
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Análise Visual <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Profissional</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Avalie a evolução corporal com análise detalhada de definição muscular, postura e composição corporal
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {!uploadedImage ? (
            <ImageUpload onImageUpload={handleImageUpload} />
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Display */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Imagem para Análise</h3>
                  </div>
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={uploadedImage} 
                      alt="Imagem para avaliação"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setUploadedImage(null)}
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Nova Imagem
                  </Button>
                </div>
              </Card>

              {/* Evaluation Form */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Eye className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Avaliação Visual</h3>
                  </div>

                  <EvaluationCard
                    title="Definição Muscular"
                    description="Clareza e separação dos grupos musculares"
                    value={evaluation.muscleDefinition}
                    onChange={(value) => setEvaluation(prev => ({ ...prev, muscleDefinition: value }))}
                    icon={<TrendingUp className="w-5 h-5" />}
                    color="blue"
                  />

                  <EvaluationCard
                    title="Postura"
                    description="Alinhamento corporal e posicionamento"
                    value={evaluation.posture}
                    onChange={(value) => setEvaluation(prev => ({ ...prev, posture: value }))}
                    icon={<Star className="w-5 h-5" />}
                    color="indigo"
                  />

                  <EvaluationCard
                    title="Gordura Corporal Aparente"
                    description="Nível visual de adiposidade corporal"
                    value={evaluation.bodyFat}
                    onChange={(value) => setEvaluation(prev => ({ ...prev, bodyFat: value }))}
                    icon={<Zap className="w-5 h-5" />}
                    color="purple"
                  />

                  <div className="space-y-3">
                    <Label htmlFor="analysis" className="text-sm font-medium text-gray-700">
                      Análise Detalhada
                    </Label>
                    <Textarea
                      id="analysis"
                      placeholder="Descreva visualmente a definição muscular, gordura corporal aparente e postura observadas..."
                      value={evaluation.analysis}
                      onChange={(e) => setEvaluation(prev => ({ ...prev, analysis: e.target.value }))}
                      className="min-h-24 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="tip" className="text-sm font-medium text-gray-700">
                      Dica para Próxima Semana
                    </Label>
                    <Textarea
                      id="tip"
                      placeholder="Sugestão específica para evolução na próxima semana..."
                      value={evaluation.tip}
                      onChange={(e) => setEvaluation(prev => ({ ...prev, tip: e.target.value }))}
                      className="min-h-20 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <Button 
                    onClick={handleEvaluationSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3"
                    disabled={!evaluation.muscleDefinition || !evaluation.posture || !evaluation.bodyFat || !evaluation.analysis}
                  >
                    Gerar Avaliação Completa
                  </Button>
                </div>
              </Card>
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

export default Index;
