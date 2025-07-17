import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Home, Trophy, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGroqAI } from '@/hooks/useGroqAI';
import { toast } from 'sonner';

interface Exercise {
  id: string;
  name: string;
  duration: number;
  muscleGroup: string;
  imageUrl: string;
  instructions: string;
}

interface WorkoutSession {
  exercises: Exercise[];
  totalTime: number;
  startTime: Date;
}

interface MuscleGroup {
  id: string;
  name: string;
  emoji: string;
  exercises: Exercise[];
}

const muscleGroups: MuscleGroup[] = [
  {
    id: 'abs',
    name: 'Abdominais',
    emoji: '💪',
    exercises: [
      {
        id: 'abs1',
        name: 'Abdominal Tradicional',
        duration: 40,
        muscleGroup: 'Abdominais',
        imageUrl: '/placeholder.svg',
        instructions: 'Deite-se de costas, flexione os joelhos e eleve o tronco contraindo o abdômen'
      },
      {
        id: 'abs2',
        name: 'Prancha',
        duration: 30,
        muscleGroup: 'Abdominais',
        imageUrl: '/placeholder.svg',
        instructions: 'Mantenha o corpo reto apoiado nos antebraços e pontas dos pés'
      },
      {
        id: 'abs3',
        name: 'Bicicleta',
        duration: 45,
        muscleGroup: 'Abdominais',
        imageUrl: '/placeholder.svg',
        instructions: 'Alterne cotovelos tocando os joelhos opostos em movimento de pedalada'
      }
    ]
  },
  {
    id: 'legs',
    name: 'Pernas',
    emoji: '🦵',
    exercises: [
      {
        id: 'legs1',
        name: 'Agachamento Livre',
        duration: 40,
        muscleGroup: 'Pernas',
        imageUrl: '/placeholder.svg',
        instructions: 'Pés na largura dos ombros, desça como se fosse sentar numa cadeira'
      },
      {
        id: 'legs2',
        name: 'Afundo',
        duration: 35,
        muscleGroup: 'Pernas',
        imageUrl: '/placeholder.svg',
        instructions: 'Dê um passo à frente e flexione ambos os joelhos em 90 graus'
      },
      {
        id: 'legs3',
        name: 'Elevação de Panturrilha',
        duration: 30,
        muscleGroup: 'Pernas',
        imageUrl: '/placeholder.svg',
        instructions: 'Eleve-se nas pontas dos pés contraindo as panturrilhas'
      }
    ]
  },
  {
    id: 'chest',
    name: 'Peito',
    emoji: '💯',
    exercises: [
      {
        id: 'chest1',
        name: 'Flexão de Braço',
        duration: 35,
        muscleGroup: 'Peito',
        imageUrl: '/placeholder.svg',
        instructions: 'Mantenha o corpo reto e flexione os braços até quase tocar o peito no chão'
      },
      {
        id: 'chest2',
        name: 'Flexão Inclinada',
        duration: 40,
        muscleGroup: 'Peito',
        imageUrl: '/placeholder.svg',
        instructions: 'Apoie os pés numa elevação e faça flexões com inclinação'
      },
      {
        id: 'chest3',
        name: 'Flexão Diamante',
        duration: 30,
        muscleGroup: 'Peito',
        imageUrl: '/placeholder.svg',
        instructions: 'Forma um diamante com as mãos e execute flexões mais intensas'
      }
    ]
  }
];

type WorkoutState = 'group-selection' | 'exercise-active' | 'exercise-paused' | 'exercise-completed' | 'workout-summary';

const PersonalTrainerAgent = () => {
  const [workoutState, setWorkoutState] = useState<WorkoutState>('group-selection');
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Exercise[]>([]);
  
  const { generateResponse, loading } = useGroqAI();

  const startTimer = useCallback((duration: number) => {
    setTimeRemaining(duration);
    setIsTimerActive(true);
    setWorkoutState('exercise-active');
    
    // Countdown sound effect (simulation)
    toast("🚀 Iniciando em: 3... 2... 1... Vá!");
  }, []);

  const pauseTimer = () => {
    setIsTimerActive(false);
    setWorkoutState('exercise-paused');
  };

  const resumeTimer = () => {
    setIsTimerActive(true);
    setWorkoutState('exercise-active');
  };

  const nextExercise = () => {
    if (!selectedGroup) return;
    
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < selectedGroup.exercises.length) {
      setCurrentExerciseIndex(nextIndex);
      setCurrentExercise(selectedGroup.exercises[nextIndex]);
      startTimer(selectedGroup.exercises[nextIndex].duration);
    } else {
      completeWorkout();
    }
  };

  const completeWorkout = () => {
    if (workoutSession) {
      const endTime = new Date();
      const totalDuration = Math.round((endTime.getTime() - workoutSession.startTime.getTime()) / 1000);
      setWorkoutSession({
        ...workoutSession,
        totalTime: totalDuration
      });
    }
    setWorkoutState('workout-summary');
    giveFeedback();
  };

  const giveFeedback = async () => {
    if (completedExercises.length === 0) return;
    
    try {
      const response = await generateResponse({
        prompt: `O usuário completou um treino com os seguintes exercícios: ${completedExercises.map(ex => ex.name).join(', ')}. Dê um feedback motivacional e técnico sobre os benefícios desses exercícios.`,
        type: 'workout'
      });
      
      if (response) {
        toast.success("💪 " + response.response);
      }
    } catch (error) {
      console.error('Erro ao gerar feedback:', error);
    }
  };

  const selectMuscleGroup = (group: MuscleGroup) => {
    setSelectedGroup(group);
    setCurrentExerciseIndex(0);
    setCurrentExercise(group.exercises[0]);
    setWorkoutSession({
      exercises: [],
      totalTime: 0,
      startTime: new Date()
    });
    setCompletedExercises([]);
    startTimer(group.exercises[0].duration);
  };

  const resetWorkout = () => {
    setWorkoutState('group-selection');
    setSelectedGroup(null);
    setCurrentExercise(null);
    setCurrentExerciseIndex(0);
    setTimeRemaining(0);
    setIsTimerActive(false);
    setWorkoutSession(null);
    setCompletedExercises([]);
  };

  const handleExerciseComplete = () => {
    if (currentExercise) {
      setCompletedExercises(prev => [...prev, currentExercise]);
    }
    setWorkoutState('exercise-completed');
    setIsTimerActive(false);
  };

  const repeatExercise = () => {
    if (currentExercise) {
      startTimer(currentExercise.duration);
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            handleExerciseComplete();
            toast.success("✅ Exercício concluído! Muito bem!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!currentExercise) return 0;
    return ((currentExercise.duration - timeRemaining) / currentExercise.duration) * 100;
  };

  if (workoutState === 'group-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              🏋️‍♂️ Personal Trainer IA
            </h1>
            <p className="text-xl text-slate-600">
              Qual grupo muscular deseja treinar hoje?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {muscleGroups.map((group) => (
              <Card 
                key={group.id}
                className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50"
                onClick={() => selectMuscleGroup(group)}
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">
                    {group.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {group.name}
                  </h3>
                  <p className="text-slate-600">
                    {group.exercises.length} exercícios
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Iniciar Treino
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (workoutState === 'workout-summary') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              🎉 Treino Concluído!
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Tempo Total:</span>
                <Badge variant="secondary" className="text-lg">
                  {workoutSession ? formatTime(workoutSession.totalTime) : '0:00'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Exercícios Realizados:</span>
                <Badge variant="secondary">{completedExercises.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Grupo Muscular:</span>
                <Badge variant="secondary">{selectedGroup?.name}</Badge>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="text-lg font-semibold text-slate-800">Exercícios Realizados:</h3>
              {completedExercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-medium">{exercise.name}</span>
                  <span className="text-slate-600">{exercise.duration}s</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={resetWorkout}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Home className="w-4 h-4 mr-2" />
              Novo Treino
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-gradient-to-br from-white to-blue-50">
          {currentExercise && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  {currentExercise.name}
                </h2>
                <Badge variant="outline" className="text-lg">
                  {selectedGroup?.name} • Exercício {currentExerciseIndex + 1} de {selectedGroup?.exercises.length}
                </Badge>
              </div>

              {/* Exercise Image */}
              <div className="mb-8">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-slate-600">{currentExercise.name}</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">💡 Como executar:</h3>
                <p className="text-slate-700">{currentExercise.instructions}</p>
              </div>

              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-slate-800 mb-4">
                  {formatTime(timeRemaining)}
                </div>
                <Progress value={getProgressPercentage()} className="w-full h-3 mb-4" />
                <p className="text-slate-600">
                  {workoutState === 'exercise-active' && '⏰ Em andamento...'}
                  {workoutState === 'exercise-paused' && '⏸️ Pausado'}
                  {workoutState === 'exercise-completed' && '✅ Concluído!'}
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {workoutState === 'exercise-active' && (
                  <Button 
                    onClick={pauseTimer}
                    variant="outline"
                    className="w-full"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </Button>
                )}

                {workoutState === 'exercise-paused' && (
                  <Button 
                    onClick={resumeTimer}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Continuar
                  </Button>
                )}

                {workoutState === 'exercise-completed' && (
                  <div className="space-y-3">
                    <p className="text-center text-slate-700 font-medium">
                      💪 Deseja repetir, avançar ou encerrar?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={repeatExercise}
                        variant="outline"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Repetir
                      </Button>
                      <Button 
                        onClick={nextExercise}
                        className="bg-gradient-to-r from-blue-500 to-purple-500"
                      >
                        <SkipForward className="w-4 h-4 mr-2" />
                        {currentExerciseIndex + 1 < (selectedGroup?.exercises.length || 0) ? 'Próximo' : 'Finalizar'}
                      </Button>
                    </div>
                    <Button 
                      onClick={completeWorkout}
                      variant="outline"
                      className="w-full"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Encerrar Treino
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PersonalTrainerAgent;