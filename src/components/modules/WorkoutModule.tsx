import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, Clock, Target, Zap, Sparkles } from "lucide-react";
import { useGroqAI } from "@/hooks/useGroqAI";
import { toast } from "sonner";

const workouts = [
  {
    id: "strength",
    name: "Força e Potência",
    duration: "45-60 min",
    difficulty: "Intermediário",
    exercises: ["Agachamento", "Supino", "Levantamento Terra", "Desenvolvimento"],
    focus: "Força muscular e potência"
  },
  {
    id: "cardio",
    name: "Cardio HIIT",
    duration: "20-30 min",
    difficulty: "Avançado",
    exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"],
    focus: "Queima de gordura e resistência"
  },
  {
    id: "beginner",
    name: "Iniciante Total",
    duration: "30 min",
    difficulty: "Iniciante",
    exercises: ["Caminhada", "Alongamento", "Exercícios com peso corporal"],
    focus: "Introdução ao movimento"
  },
  {
    id: "mobility",
    name: "Mobilidade e Flexibilidade",
    duration: "25 min",
    difficulty: "Todos os níveis",
    exercises: ["Yoga", "Pilates", "Alongamentos dinâmicos"],
    focus: "Mobilidade articular e flexibilidade"
  }
];

export const WorkoutModule = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [aiWorkout, setAiWorkout] = useState<string | null>(null);
  const { generateResponse, loading } = useGroqAI();

  const handleWorkoutSelect = (workoutId: string) => {
    setSelectedWorkout(selectedWorkout === workoutId ? null : workoutId);
  };

  const generateAIWorkout = async () => {
    if (!userInput.trim()) {
      toast.error("Por favor, descreva seus objetivos e preferências");
      return;
    }

    const response = await generateResponse({
      prompt: userInput,
      type: 'workout'
    });

    if (response) {
      setAiWorkout(response.response);
      toast.success("Treino personalizado gerado!");
    } else {
      toast.error("Erro ao gerar treino personalizado");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6" />
          Treinos Personalizados
        </CardTitle>
        <CardDescription>
          Treinos pré-definidos ou personalizados por IA para seus objetivos específicos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Workout Generator */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Treino Personalizado por IA</h3>
          </div>
          <Textarea
            placeholder="Descreva seus objetivos, limitações, tempo disponível, equipamentos que possui, nível de experiência..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="mb-3"
            rows={3}
          />
          <Button 
            onClick={generateAIWorkout} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Gerando treino..." : "Gerar Treino Personalizado"}
          </Button>
        </div>

        {aiWorkout && (
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Seu Treino Personalizado
            </h4>
            <div className="whitespace-pre-wrap text-sm">{aiWorkout}</div>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Treinos Pré-definidos</h4>
          {workouts.map((workout) => (
            <div key={workout.id} className="mb-3">
              <Button
                variant="outline"
                className="w-full justify-between h-auto p-4"
                onClick={() => handleWorkoutSelect(workout.id)}
              >
                <div className="text-left">
                  <div className="font-semibold">{workout.name}</div>
                  <div className="text-sm text-muted-foreground">{workout.focus}</div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {workout.duration}
                  </Badge>
                  <Badge variant="outline">{workout.difficulty}</Badge>
                </div>
              </Button>
              
              {selectedWorkout === workout.id && (
                <div className="mt-3 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Exercícios inclusos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.map((exercise, index) => (
                      <Badge key={index} variant="outline">
                        {exercise}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Iniciar Treino
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};