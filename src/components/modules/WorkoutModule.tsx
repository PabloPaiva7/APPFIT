
import { useState } from 'react';
import { ArrowLeft, Dumbbell, Target, Clock, Zap, Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface WorkoutModuleProps {
  onBack: () => void;
}

const WorkoutModule = ({ onBack }: WorkoutModuleProps) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [customNotes, setCustomNotes] = useState('');
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);

  const goals = [
    { id: 'muscle-gain', label: 'Ganho de Massa', icon: <Dumbbell className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'fat-loss', label: 'Perda de Gordura', icon: <Zap className="w-5 h-5" />, color: 'bg-red-500' },
    { id: 'endurance', label: 'Resistência', icon: <Target className="w-5 h-5" />, color: 'bg-green-500' },
    { id: 'strength', label: 'Força', icon: <Dumbbell className="w-5 h-5" />, color: 'bg-purple-500' }
  ];

  const levels = [
    { id: 'beginner', label: 'Iniciante', description: '0-6 meses de treino' },
    { id: 'intermediate', label: 'Intermediário', description: '6 meses - 2 anos' },
    { id: 'advanced', label: 'Avançado', description: '2+ anos de treino' }
  ];

  const durations = [
    { id: '30min', label: '30 minutos', description: 'Treino rápido e eficiente' },
    { id: '45min', label: '45 minutos', description: 'Duração padrão' },
    { id: '60min', label: '60 minutos', description: 'Treino completo' }
  ];

  const generateWorkout = () => {
    // Simulação de geração de treino baseado nas seleções
    const sampleWorkout = {
      name: `Treino ${goals.find(g => g.id === selectedGoal)?.label}`,
      duration: selectedDuration,
      level: selectedLevel,
      exercises: [
        { name: 'Agachamento', sets: 4, reps: '12-15', rest: '60s', muscle: 'Pernas' },
        { name: 'Supino Reto', sets: 4, reps: '8-12', rest: '90s', muscle: 'Peito' },
        { name: 'Remada Curvada', sets: 4, reps: '10-12', rest: '90s', muscle: 'Costas' },
        { name: 'Desenvolvimento', sets: 3, reps: '10-12', rest: '60s', muscle: 'Ombros' },
        { name: 'Rosca Direta', sets: 3, reps: '12-15', rest: '45s', muscle: 'Bíceps' },
        { name: 'Tríceps Pulley', sets: 3, reps: '12-15', rest: '45s', muscle: 'Tríceps' }
      ]
    };
    setGeneratedWorkout(sampleWorkout);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-purple-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Planejador de Treinos
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Seu <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Treino Personalizado</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Configure suas preferências e receba um treino personalizado baseado em seus objetivos e nível
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {!generatedWorkout ? (
            <>
              {/* Goal Selection */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Qual seu objetivo principal?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {goals.map((goal) => (
                    <Card
                      key={goal.id}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedGoal === goal.id 
                          ? 'ring-2 ring-purple-500 bg-purple-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedGoal(goal.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${goal.color} rounded-lg flex items-center justify-center text-white`}>
                          {goal.icon}
                        </div>
                        <span className="font-medium text-gray-800">{goal.label}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Level Selection */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Qual seu nível de experiência?</h3>
                <div className="space-y-3">
                  {levels.map((level) => (
                    <Card
                      key={level.id}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedLevel === level.id 
                          ? 'ring-2 ring-purple-500 bg-purple-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedLevel(level.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-800">{level.label}</h4>
                          <p className="text-sm text-gray-600">{level.description}</p>
                        </div>
                        {selectedLevel === level.id && (
                          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Duration Selection */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quanto tempo você tem disponível?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {durations.map((duration) => (
                    <Card
                      key={duration.id}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedDuration === duration.id 
                          ? 'ring-2 ring-purple-500 bg-purple-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedDuration(duration.id)}
                    >
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-800">{duration.label}</h4>
                        <p className="text-sm text-gray-600">{duration.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Custom Notes */}
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <div className="space-y-3">
                  <Label htmlFor="custom-notes" className="text-lg font-semibold text-gray-800">
                    Observações Adicionais (Opcional)
                  </Label>
                  <Textarea
                    id="custom-notes"
                    placeholder="Limitações físicas, exercícios preferidos, equipamentos disponíveis..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="min-h-20 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </Card>

              {/* Generate Button */}
              <div className="text-center">
                <Button
                  onClick={generateWorkout}
                  disabled={!selectedGoal || !selectedLevel || !selectedDuration}
                  className="px-8 py-3 text-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Gerar Treino Personalizado
                </Button>
              </div>
            </>
          ) : (
            // Generated Workout Display
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 border shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{generatedWorkout.name}</h3>
                    <div className="flex gap-3">
                      <Badge className="bg-purple-500 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {generatedWorkout.duration}
                      </Badge>
                      <Badge variant="outline">
                        {levels.find(l => l.id === generatedWorkout.level)?.label}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedWorkout(null)}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    Novo Treino
                  </Button>
                </div>

                <div className="space-y-4">
                  {generatedWorkout.exercises.map((exercise: any, index: number) => (
                    <Card key={index} className="p-4 bg-white/70">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{exercise.muscle}</p>
                          <div className="flex gap-4 text-sm">
                            <span><strong>Séries:</strong> {exercise.sets}</span>
                            <span><strong>Reps:</strong> {exercise.reps}</span>
                            <span><strong>Descanso:</strong> {exercise.rest}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-purple-200 text-purple-600">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium px-8">
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Treino
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkoutModule;
