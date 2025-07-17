
import { useState } from 'react';
import { ArrowLeft, Users, Camera, Eye, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/ImageUpload';
import EvaluationCard from '@/components/EvaluationCard';
import { ImageGenerationCard } from '@/components/ui/image-generation-card';
import { useGroqAI } from '@/hooks/useGroqAI';
import { toast } from 'sonner';

interface BodyAssessmentModuleProps {
  onBack: () => void;
}

const BodyAssessmentModule = ({ onBack }: BodyAssessmentModuleProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [assessment, setAssessment] = useState({
    muscleDefinition: 0,
    posture: 0,
    bodyFat: 0,
    visualAnalysis: '',
    weeklyTip: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [showVisualGuides, setShowVisualGuides] = useState(false);
  const [bodyQuery, setBodyQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const { generateResponse, loading } = useGroqAI();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowResults(false);
  };

  const handleAssessmentSubmit = () => {
    if (assessment.muscleDefinition && assessment.posture && assessment.bodyFat && assessment.visualAnalysis) {
      setShowResults(true);
    }
  };

  const askBodyExpert = async () => {
    if (!bodyQuery.trim()) {
      toast.error("Por favor, digite sua pergunta sobre avaliação corporal");
      return;
    }

    const response = await generateResponse({
      prompt: bodyQuery,
      type: 'general',
      context: 'Especialista em avaliação corporal, composição corporal, postura e desenvolvimento muscular'
    });

    if (response) {
      setAiResponse(response.response);
      toast.success("Consulta respondida pelo especialista!");
    } else {
      toast.error("Erro ao consultar o especialista");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-blue-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                👨‍⚕️ Especialista em Avaliação Corporal
              </h1>
              <p className="text-sm text-slate-600">Análise detalhada com demonstrações visuais</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Especialista em <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Avaliação Corporal</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Consulte um especialista virtual com demonstrações visuais e análise detalhada
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Expert Consultation */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">💪 Consulta com Especialista</h3>
                <p className="text-slate-600">Tire dúvidas sobre composição corporal, postura e desenvolvimento</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Textarea
                placeholder="Ex: Como melhorar minha postura? Qual a diferença entre massa magra e gordura corporal? Como avaliar meu progresso no treino?"
                value={bodyQuery}
                onChange={(e) => setBodyQuery(e.target.value)}
                className="min-h-20"
              />
              <div className="flex gap-4">
                <Button
                  onClick={askBodyExpert}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {loading ? 'Consultando...' : 'Consultar Especialista'}
                </Button>
                <Button
                  onClick={() => setShowVisualGuides(!showVisualGuides)}
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showVisualGuides ? 'Ocultar' : 'Mostrar'} Guias Visuais
                </Button>
              </div>
            </div>

            {aiResponse && (
              <div className="mt-6 p-4 bg-white/70 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Resposta do Especialista:
                </h4>
                <div className="whitespace-pre-wrap text-slate-700">{aiResponse}</div>
              </div>
            )}
          </Card>

          {/* Visual Guides */}
          {showVisualGuides && (
            <div className="grid md:grid-cols-2 gap-6">
              <ImageGenerationCard
                prompt="Diagrama de composição corporal mostrando massa magra versus gordura corporal, estilo médico educativo, alta qualidade"
                title="📊 Composição Corporal"
                description="Entenda a diferença entre massa magra e gordura"
                style="medical"
                autoGenerate={true}
              />
              <ImageGenerationCard
                prompt="Demonstração de postura corporal correta e incorreta, alinhamento da coluna, vista lateral, estilo fisioterapêutico"
                title="🦴 Análise Postural"
                description="Como identificar problemas posturais"
                style="medical"
              />
              <ImageGenerationCard
                prompt="Pessoa fazendo medidas corporais com fita métrica, pontos de medição corretos, estilo profissional fitness"
                title="📏 Medidas Corporais"
                description="Pontos corretos para medir o progresso"
                style="fitness"
              />
              <ImageGenerationCard
                prompt="Progressão de desenvolvimento muscular ao longo do tempo, antes e depois, estilo fitness motivacional"
                title="💪 Progressão Muscular"
                description="Como acompanhar o desenvolvimento"
                style="fitness"
              />
            </div>
          )}

          {/* Photo Analysis Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              📷 Análise Corporal por Foto
            </h3>
            <p className="text-slate-600 mb-6">Envie uma foto para avaliação detalhada de composição corporal</p>
            {!uploadedImage ? (
            <div className="max-w-2xl mx-auto">
              <Card className="p-12 text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-dashed border-blue-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-300"
                onClick={() => document.getElementById('body-file-input')?.click()}
              >
                <input
                  id="body-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          handleImageUpload(event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Envie uma Foto para Avaliação
                    </h3>
                    <p className="text-gray-600">
                      Foto de corpo inteiro ou área específica para análise
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Selecionar Foto
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Display */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Foto para Avaliação</h3>
                  </div>
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={uploadedImage} 
                      alt="Foto para avaliação corporal"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setUploadedImage(null)}
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Enviar Nova Foto
                  </Button>
                </div>
              </Card>

              {/* Assessment Form */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Eye className="w-5 h-5 text-cyan-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Avaliação Corporal</h3>
                  </div>

                  <EvaluationCard
                    title="Definição Muscular"
                    description="Nível de definição e desenvolvimento muscular"
                    value={assessment.muscleDefinition}
                    onChange={(value) => setAssessment(prev => ({ ...prev, muscleDefinition: value }))}
                    icon={<TrendingUp className="w-5 h-5" />}
                    color="blue"
                  />

                  <EvaluationCard
                    title="Postura Corporal"
                    description="Alinhamento e posicionamento postural"
                    value={assessment.posture}
                    onChange={(value) => setAssessment(prev => ({ ...prev, posture: value }))}
                    icon={<Users className="w-5 h-5" />}
                    color="emerald"
                  />

                  <EvaluationCard
                    title="Gordura Aparente"
                    description="Percentual visual de gordura corporal"
                    value={assessment.bodyFat}
                    onChange={(value) => setAssessment(prev => ({ ...prev, bodyFat: value }))}
                    icon={<Eye className="w-5 h-5" />}
                    color="green"
                  />

                  <div className="space-y-3">
                    <Label htmlFor="visual-analysis" className="text-sm font-medium text-gray-700">
                      Análise Visual Detalhada
                    </Label>
                    <Textarea
                      id="visual-analysis"
                      placeholder="Descreva a composição corporal, pontos fortes, áreas para melhoria..."
                      value={assessment.visualAnalysis}
                      onChange={(e) => setAssessment(prev => ({ ...prev, visualAnalysis: e.target.value }))}
                      className="min-h-24 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="weekly-tip" className="text-sm font-medium text-gray-700">
                      Dica para Próxima Semana
                    </Label>
                    <Textarea
                      id="weekly-tip"
                      placeholder="Sugestão de foco para a próxima semana..."
                      value={assessment.weeklyTip}
                      onChange={(e) => setAssessment(prev => ({ ...prev, weeklyTip: e.target.value }))}
                      className="min-h-20 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>

                  <Button 
                    onClick={handleAssessmentSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3"
                    disabled={!assessment.muscleDefinition || !assessment.posture || !assessment.bodyFat || !assessment.visualAnalysis}
                  >
                    Gerar Avaliação Corporal
                  </Button>
                </div>
              </Card>
            </div>
          )}
          </Card>

          {showResults && (
            <div className="mt-8">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 border shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Resultado da Avaliação</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Definição Muscular</h4>
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {assessment.muscleDefinition}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <h4 className="font-semibol text-gray-800 mb-2">Postura</h4>
                    <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {assessment.posture}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Gordura Aparente</h4>
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {assessment.bodyFat}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/70 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-2">Análise Visual</h4>
                    <p className="text-gray-700">{assessment.visualAnalysis}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Dica para Próxima Semana</h4>
                    <p className="text-gray-700 font-medium">{assessment.weeklyTip}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BodyAssessmentModule;
