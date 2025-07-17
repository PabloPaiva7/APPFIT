import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Play, Pause, RotateCcw, Clock, MessageCircle, Sparkles, Eye } from "lucide-react";
import { useGroqAI } from "@/hooks/useGroqAI";
import { ImageGenerationCard } from "@/components/ui/image-generation-card";
import { toast } from "sonner";

const painAreas = [
  {
    id: "neck",
    name: "Pescoço",
    description: "Tensão por postura de tela",
    icon: "🤕",
    exercises: [
      {
        name: "Mobilidade Cervical",
        duration: 30,
        steps: [
          "Gire lentamente a cabeça para direita (10s)",
          "Retorne ao centro e vá para esquerda (10s)",
          "Incline cabeça para cada lado (10s cada)"
        ]
      },
      {
        name: "Inclinação Lateral",
        duration: 45,
        steps: [
          "Incline cabeça para o ombro direito",
          "Segure por 15 segundos",
          "Repita para o lado esquerdo",
          "Faça 3 repetições para cada lado"
        ]
      }
    ]
  },
  {
    id: "back",
    name: "Costas (Lombar)",
    description: "Muito tempo sentado",
    icon: "🦴",
    exercises: [
      {
        name: "Gato-Vaca",
        duration: 60,
        steps: [
          "Fique em quatro apoios",
          "Arqueie as costas para cima (posição gato)",
          "Baixe o abdômen e levante a cabeça (posição vaca)",
          "Alterne lentamente por 1 minuto"
        ]
      },
      {
        name: "Ponte Pélvica",
        duration: 45,
        steps: [
          "Deite de costas, joelhos flexionados",
          "Levante o quadril contraindo o glúteo",
          "Mantenha por 5 segundos",
          "Desça lentamente e repita"
        ]
      }
    ]
  },
  {
    id: "shoulders",
    name: "Ombros",
    description: "Tensão emocional e postura",
    icon: "💪",
    exercises: [
      {
        name: "Rotação de Ombros",
        duration: 30,
        steps: [
          "Levante os ombros até as orelhas",
          "Gire para trás em movimentos circulares",
          "Faça 10 rotações para trás",
          "Repita 10 rotações para frente"
        ]
      },
      {
        name: "Elevação com Respiração",
        duration: 60,
        steps: [
          "Inspire profundamente levantando os ombros",
          "Segure por 3 segundos",
          "Expire soltando completamente a tensão",
          "Repita 10 vezes"
        ]
      }
    ]
  }
];

export const StretchingModule = () => {
  const [selectedPainArea, setSelectedPainArea] = useState<string | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [currentStep, setCurrentStep] = useState(0);
  const [painDescription, setPainDescription] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [showVisualGuides, setShowVisualGuides] = useState(false);
  const { generateResponse, loading } = useGroqAI();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerActive(false);
      toast.success("Exercício concluído!");
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(30);
  };

  const analyzePain = async () => {
    if (!painDescription.trim()) {
      toast.error("Por favor, descreva sua dor ou desconforto");
      return;
    }

    const response = await generateResponse({
      prompt: painDescription,
      type: 'pain_analysis'
    });

    if (response) {
      setAiAnalysis(response.response);
      toast.success("Análise concluída!");
    } else {
      toast.error("Erro ao analisar o problema");
    }
  };

  const selectedArea = painAreas.find(area => area.id === selectedPainArea);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="text-2xl">🧘‍♀️</div>
          Fisioterapeuta IA - Alongamentos & Alívio
        </CardTitle>
        <CardDescription>
          Análise personalizada de dores com demonstrações visuais e exercícios guiados por IA
        </CardDescription>
        <Button
          onClick={() => setShowVisualGuides(!showVisualGuides)}
          variant="outline"
          className="w-fit"
        >
          <Eye className="w-4 h-4 mr-2" />
          {showVisualGuides ? 'Ocultar' : 'Mostrar'} Demonstrações Visuais
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual Demonstrations */}
        {showVisualGuides && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <ImageGenerationCard
              prompt="Pessoa fazendo alongamento para pescoço, rotação cervical, demonstração clara da postura correta, estilo médico educativo, fundo neutro"
              title="🤕 Alongamento Cervical"
              description="Como executar mobilidade do pescoço corretamente"
              style="medical"
              autoGenerate={true}
            />
            <ImageGenerationCard
              prompt="Demonstração do exercício gato-vaca para alongar as costas, posição quadrupede, movimento correto, estilo fisioterapêutico"
              title="🦴 Exercício Gato-Vaca"
              description="Alongamento para dores lombares"
              style="medical"
            />
            <ImageGenerationCard
              prompt="Pessoa fazendo rotação de ombros, movimento circular completo, demonstração da postura correta, estilo médico"
              title="💪 Rotação de Ombros"
              description="Alívio de tensão nos ombros"
              style="medical"
            />
            <ImageGenerationCard
              prompt="Exercícios de respiração profunda e relaxamento, pessoa em posição confortável, ambiente calmo, estilo wellness"
              title="🌿 Técnicas de Respiração"
              description="Exercícios para relaxamento e alívio do estresse"
              style="medical"
            />
          </div>
        )}

        {/* AI Pain Analysis */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Relate sua Dor ou Desconforto</h3>
          </div>
          <Textarea
            placeholder="Descreva onde sente dor, quando começou, intensidade (1-10), atividades que pioram ou melhoram, se já teve antes..."
            value={painDescription}
            onChange={(e) => setPainDescription(e.target.value)}
            className="mb-3"
            rows={3}
          />
          <Button 
            onClick={analyzePain} 
            disabled={loading}
            className="w-full"
            variant="outline"
          >
            {loading ? "Analisando..." : "Analisar e Receber Orientações"}
          </Button>
        </div>

        {aiAnalysis && (
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              Análise e Recomendações
            </h4>
            <div className="whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200">{aiAnalysis}</div>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Áreas de Dor Comuns</h4>
          <div className="grid grid-cols-2 gap-3">
            {painAreas.map((area) => (
              <Button
                key={area.id}
                variant="outline"
                className="h-auto p-4 justify-start"
                onClick={() => setSelectedPainArea(selectedPainArea === area.id ? null : area.id)}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{area.icon}</span>
                    <span className="font-semibold">{area.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{area.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {selectedArea && (
          <div className="bg-muted/50 p-4 rounded-lg border">
            <h4 className="font-semibold mb-3">Exercícios para {selectedArea.name}</h4>
            <div className="space-y-3">
              {selectedArea.exercises.map((exercise, index) => (
                <div key={index} className="bg-background p-3 rounded border">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium">{exercise.name}</h5>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      {exercise.duration}s
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground mb-3">
                    {exercise.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex gap-2">
                        <span className="text-primary font-medium">{stepIndex + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${timeRemaining === exercise.duration ? 0 : ((exercise.duration - timeRemaining) / exercise.duration) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium min-w-[40px]">
                      {timeRemaining}s
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    {!isTimerActive ? (
                      <Button size="sm" onClick={startTimer} className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Iniciar
                      </Button>
                    ) : (
                      <Button size="sm" onClick={pauseTimer} variant="outline" className="flex-1">
                        <Pause className="h-4 w-4 mr-1" />
                        Pausar
                      </Button>
                    )}
                    <Button size="sm" onClick={resetTimer} variant="outline">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};