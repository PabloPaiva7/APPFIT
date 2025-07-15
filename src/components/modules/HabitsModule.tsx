import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Target, Clock, Sparkles } from "lucide-react";
import { useGroqAI } from "@/hooks/useGroqAI";
import { toast } from "sonner";

export const HabitsModule = () => {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    objetivos: "",
    nivelEstresse: "",
    tempoDisponivel: ""
  });
  const [habitPlan, setHabitPlan] = useState<string | null>(null);
  const { generateResponse, loading } = useGroqAI();

  const generateHabitPlan = async () => {
    if (!formData.nome || !formData.idade || !formData.objetivos) {
      toast.error("Por favor, preencha pelo menos nome, idade e objetivos principais.");
      return;
    }

    const context = `Nome: ${formData.nome}, Idade: ${formData.idade} anos, Nível de estresse: ${formData.nivelEstresse}/10, Tempo disponível: ${formData.tempoDisponivel} minutos/dia`;
    
    const prompt = `
Crie um plano de hábitos semanais personalizado para:
- Objetivos principais: ${formData.objetivos}
- Contexto: ${context}

O plano deve ter 3-5 hábitos simples, linguagem motivadora, metas diárias específicas, explicação dos benefícios e frase inspiradora final. Format para WhatsApp com emojis.
    `;

    const response = await generateResponse({
      prompt,
      context,
      type: 'habits'
    });

    if (response) {
      setHabitPlan(response.response);
      toast.success("Plano de hábitos personalizado criado!");
    } else {
      toast.error("Erro ao gerar plano de hábitos");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-6 w-6" />
          Hábitos Saudáveis
        </CardTitle>
        <CardDescription>
          Crie um plano personalizado de hábitos saudáveis para melhorar seu bem-estar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!habitPlan ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  placeholder="Sua idade"
                  value={formData.idade}
                  onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objetivos">Objetivos Principais</Label>
              <Textarea
                id="objetivos"
                placeholder="Ex: dormir melhor, reduzir ansiedade, parar de fumar, ter mais energia..."
                value={formData.objetivos}
                onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nivelEstresse">Nível de Estresse (0-10)</Label>
                <Input
                  id="nivelEstresse"
                  placeholder="Ex: 7"
                  value={formData.nivelEstresse}
                  onChange={(e) => setFormData({ ...formData, nivelEstresse: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tempoDisponivel">Tempo Disponível (minutos/dia)</Label>
                <Input
                  id="tempoDisponivel"
                  placeholder="Ex: 30"
                  value={formData.tempoDisponivel}
                  onChange={(e) => setFormData({ ...formData, tempoDisponivel: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={generateHabitPlan} disabled={loading} className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              {loading ? "Criando plano..." : "Gerar Plano de Hábitos com IA"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Seu Plano de Hábitos Personalizado
              </h4>
              <div className="whitespace-pre-wrap text-sm">{habitPlan}</div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setHabitPlan(null);
                  setFormData({
                    nome: "",
                    idade: "",
                    objetivos: "",
                    nivelEstresse: "",
                    tempoDisponivel: ""
                  });
                }}
                variant="outline"
                className="flex-1"
              >
                Criar Novo Plano
              </Button>
              <Button
                onClick={() => navigator.clipboard.writeText(habitPlan)}
                variant="outline"
                className="flex-1"
              >
                <Clock className="w-4 h-4 mr-2" />
                Copiar Plano
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};