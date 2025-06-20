
import { useState } from 'react';
import { ArrowLeft, Zap, Clock, Target, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StretchingModuleProps {
  onBack: () => void;
}

const StretchingModule = ({ onBack }: StretchingModuleProps) => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [currentExercise, setCurrentExercise] = useState<any>(null);
  const [isExercising, setIsExercising] = useState(false);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState(0);

  const painAreas = [
    {
      id: 'neck',
      name: 'Pescoço',
      cause: 'Postura de tela',
      icon: '🦴',
      color: 'from-blue-500 to-cyan-500',
      exercises: [
        {
          name: 'Mobilidade Cervical',
          duration: 30,
          instructions: [
            'Sente-se com a coluna ereta',
            'Incline a cabeça lentamente para a direita',
            'Mantenha por 15 segundos',
            'Repita para o lado esquerdo',
            'Faça movimentos lentos e controlados'
          ]
        },
        {
          name: 'Inclinação Lateral',
          duration: 30,
          instructions: [
            'Posicione a mão direita sobre a cabeça',
            'Incline suavemente para a direita',
            'Sinta o alongamento no lado esquerdo',
            'Mantenha por 15 segundos',
            'Repita do outro lado'
          ]
        }
      ]
    },
    {
      id: 'back',
      name: 'Costas (Lombar)',
      cause: 'Muito tempo sentado',
      icon: '🦴',
      color: 'from-green-500 to-emerald-500',
      exercises: [
        {
          name: 'Gato-Vaca',
          duration: 45,
          instructions: [
            'Fique em posição de quatro apoios',
            'Arqueie as costas para cima (gato)',
            'Depois arqueie para baixo (vaca)',
            'Respire profundamente em cada movimento',
            'Repita 10 vezes lentamente'
          ]
        },
        {
          name: 'Ponte Pélvica',
          duration: 30,
          instructions: [
            'Deite de costas, joelhos dobrados',
            'Eleve os quadris formando uma linha reta',
            'Contraia os glúteos no topo',
            'Mantenha por 5 segundos',
            'Desça lentamente e repita'
          ]
        }
      ]
    },
    {
      id: 'shoulders',
      name: 'Ombros',
      cause: 'Tensão emocional',
      icon: '💪',
      color: 'from-purple-500 to-violet-500',
      exercises: [
        {
          name: 'Rotação de Ombros',
          duration: 30,
          instructions: [
            'Fique em pé ou sentado confortavelmente',
            'Eleve os ombros em direção às orelhas',
            'Gire para trás fazendo círculos amplos',
            'Faça 10 rotações para trás',
            'Repita 10 rotações para frente'
          ]
        },
        {
          name: 'Elevação com Respiração',
          duration: 60,
          instructions: [
            'Inspire elevando os braços lateralmente',
            'Expire baixando os braços lentamente',
            'Sincronize o movimento com a respiração',
            'Sinta o relaxamento dos ombros',
            'Repita 8 vezes'
          ]
        }
      ]
    },
    {
      id: 'knees',
      name: 'Joelhos',
      cause: 'Treinos intensos ou sedentarismo',
      icon: '🦵',
      color: 'from-orange-500 to-red-500',
      exercises: [
        {
          name: 'Alongamento Posterior da Coxa',
          duration: 45,
          instructions: [
            'Sente na borda de uma cadeira',
            'Estenda uma perna à frente',
            'Incline o tronco suavemente para frente',
            'Sinta o alongamento atrás da coxa',
            'Mantenha 20s cada perna'
          ]
        },
        {
          name: 'Cadeira Invisível',
          duration: 30,
          instructions: [
            'Fique em pé com os pés afastados',
            'Flexione os joelhos como se fosse sentar',
            'Mantenha as costas retas',
            'Desça até onde for confortável',
            'Suba lentamente'
          ]
        }
      ]
    },
    {
      id: 'wrists',
      name: 'Punhos',
      cause: 'Computador / celular',
      icon: '✋',
      color: 'from-pink-500 to-rose-500',
      exercises: [
        {
          name: 'Flexão e Extensão de Punho',
          duration: 30,
          instructions: [
            'Estenda o braço à frente',
            'Com a outra mão, puxe os dedos para trás',
            'Mantenha 15 segundos',
            'Agora flexione o punho para baixo',
            'Mantenha 15 segundos'
          ]
        },
        {
          name: 'Rotação de Punhos',
          duration: 30,
          instructions: [
            'Estenda os braços à frente',
            'Faça círculos com os punhos',
            '10 rotações para cada lado',
            'Movimentos suaves e controlados',
            'Sinta o relaxamento das articulações'
          ]
        }
      ]
    }
  ];

  const startExercise = (exercise: any) => {
    setCurrentExercise(exercise);
    setIsExercising(true);
    setExerciseTimer(0);
    setExerciseProgress(0);
    
    // Simulate exercise timer
    const interval = setInterval(() => {
      setExerciseTimer(prev => {
        const newTime = prev + 1;
        const progress = (newTime / exercise.duration) * 100;
        setExerciseProgress(progress);
        
        if (newTime >= exercise.duration) {
          clearInterval(interval);
          setIsExercising(false);
          return exercise.duration;
        }
        return newTime;
      });
    }, 1000);
  };

  const resetExercise = () => {
    setCurrentExercise(null);
    setIsExercising(false);
    setExerciseTimer(0);
    setExerciseProgress(0);
  };

  const selectedAreaData = painAreas.find(area => area.id === selectedArea);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-teal-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Alongamentos & Alívio de Dores
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {!selectedArea ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Alívio <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Inteligente</span> de Dores
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Exercícios simples e seguros para aliviar as dores mais comuns do dia a dia
              </p>
            </div>

            {/* Quick Relief Section */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
              <div className="text-center">
                <Target className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Alívio Rápido</h3>
                <p className="text-gray-600 mb-4">
                  Selecione a área que está incomodando para receber exercícios personalizados
                </p>
                <Badge className="bg-teal-500 text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  2-5 minutos por exercício
                </Badge>
              </div>
            </Card>

            {/* Pain Areas Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {painAreas.map((area) => (
                <Card
                  key={area.id}
                  className="p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/70 backdrop-blur-sm"
                  onClick={() => setSelectedArea(area.id)}
                >
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center text-3xl mx-auto`}>
                      {area.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {area.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Causa comum:</strong> {area.cause}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {area.exercises.length} exercícios
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : currentExercise ? (
          // Exercise in Progress
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentExercise.name}
                </h2>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge className={`bg-gradient-to-r ${selectedAreaData?.color} text-white`}>
                    {selectedAreaData?.name}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentExercise.duration}s
                  </Badge>
                </div>
              </div>

              {/* Timer and Progress */}
              <div className="mb-8">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-teal-600 mb-2">
                    {currentExercise.duration - exerciseTimer}s
                  </div>
                  <Progress value={exerciseProgress} className="w-full h-3" />
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Como executar:</h3>
                <div className="space-y-3">
                  {currentExercise.instructions.map((instruction: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                {exerciseProgress >= 100 ? (
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-green-600 font-medium mb-4">Exercício concluído!</p>
                    <Button
                      onClick={resetExercise}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
                    >
                      Fazer Outro Exercício
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={resetExercise}
                    variant="outline"
                    className="border-teal-200 text-teal-600 hover:bg-teal-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Parar Exercício
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ) : (
          // Exercise Selection for Selected Area
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                onClick={() => setSelectedArea('')}
                className="p-2 hover:bg-teal-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Exercícios para {selectedAreaData?.name}
                </h2>
                <p className="text-gray-600">
                  Causa comum: {selectedAreaData?.cause}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {selectedAreaData?.exercises.map((exercise, index) => (
                <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {exercise.name}
                      </h3>
                      <Badge className="bg-teal-500 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {exercise.duration}s
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {exercise.instructions.slice(0, 3).map((instruction, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-4 h-4 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <p>{instruction}</p>
                        </div>
                      ))}
                      {exercise.instructions.length > 3 && (
                        <p className="text-xs text-gray-500 ml-6">
                          +{exercise.instructions.length - 3} passos adicionais
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => startExercise(exercise)}
                      className={`w-full bg-gradient-to-r ${selectedAreaData?.color} text-white font-medium`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar Exercício
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Tips */}
            <Card className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
              <h3 className="font-semibold text-gray-800 mb-3">💡 Dicas Importantes:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Execute os movimentos lentamente e com controle</li>
                <li>• Pare imediatamente se sentir dor intensa</li>
                <li>• Respire profundamente durante os exercícios</li>
                <li>• Seja consistente: alguns minutos diários fazem diferença</li>
              </ul>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default StretchingModule;
