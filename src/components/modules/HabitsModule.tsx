
import { useState } from 'react';
import { ArrowLeft, Sparkles, Clock, Target, Brain, Moon, Heart, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

interface HabitsModuleProps {
  onBack: () => void;
}

interface UserData {
  name: string;
  age: string;
  goals: string;
  stressLevel: number;
  availableTime: string;
}

const HabitsModule = ({ onBack }: HabitsModuleProps) => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: '',
    goals: '',
    stressLevel: 5,
    availableTime: ''
  });
  const [habitsPlan, setHabitsPlan] = useState<string>('');

  const generateHabitsPlan = () => {
    const stressEmoji = userData.stressLevel >= 7 ? '😰' : userData.stressLevel >= 4 ? '😊' : '😌';
    
    const plan = `✨ **Plano de Hábitos Saudáveis para ${userData.name}** ✨

Olá, ${userData.name}! 🌟
Com ${userData.age} anos e um nível de estresse ${userData.stressLevel}/10 ${stressEmoji}, criei um plano especial para você alcançar seus objetivos: *${userData.goals}*.

📅 **SEU PLANO SEMANAL** (${userData.availableTime} min/dia)

🌅 **HÁBITO 1: Ritual Matinal Mindful**
• ⏰ Acordar 15min mais cedo
• 🧘‍♀️ 5min de respiração consciente
• 💧 Beber 1 copo de água ao acordar

*Por quê?* Começar o dia com intenção reduz ansiedade e melhora o foco por até 8 horas!

🍎 **HÁBITO 2: Nutrição Consciente**
• 🥗 Incluir 1 porção de vegetais em cada refeição
• ⏱️ Mastigar devagar (pelo menos 20x)
• 💧 Meta: 2L de água por dia

*Por quê?* A digestão consciente melhora absorção de nutrientes e reduz estresse digestivo.

🌙 **HÁBITO 3: Preparação para o Sono**
• 📱 Desligar telas 1h antes de dormir
• 📖 Ler por 10-15min
• 🌡️ Quarto fresco (18-20°C)

*Por quê?* Sono de qualidade é a base para regulação hormonal e recuperação mental.

🎯 **HÁBITO 4: Movimento Intencional**
• 🚶‍♀️ Caminhada de 10min após almoço
• 🧘‍♀️ 5min de alongamento antes de dormir
• 💪 2x na semana: exercício que você gosta

*Por quê?* Movimento regular libera endorfinas e melhora humor em 21 dias.

📝 **HÁBITO 5: Gratidão & Reflexão**
• 📖 Anotar 3 coisas boas do dia
• 🤗 Um ato de gentileza consigo mesmo
• 🎯 Revisar progresso semanal

*Por quê?* Gratidão reconecta com o positivo e reduz cortisol (hormônio do estresse).

🎯 **DICAS EXTRAS PARA VOCÊ:**
${userData.stressLevel >= 7 ? 
  '• 🫁 Técnica 4-7-8: Inspire 4s, segure 7s, expire 8s (3x ao dia)\n• 🎵 Música relaxante durante atividades\n• 🌿 Considere chás calmantes (camomila, melissa)' :
  '• ⚡ Micro-pausas de 2min a cada hora trabalhada\n• 🎨 Reserve tempo para um hobby prazeroso\n• 🌱 Adicione uma planta no seu ambiente'
}

💡 **Lembre-se:** Comece com apenas 1-2 hábitos. Após 2 semanas, adicione mais um. Pequenos passos levam a grandes transformações!

✨ *"Você não precisa ser perfeito, apenas consistente. Cada pequeno hábito é uma semente plantada para o seu futuro mais saudável e feliz."* 🌱

---
Boa jornada, ${userData.name}! 🚀
Você tem tudo que precisa para brilhar! ⭐`;

    setHabitsPlan(plan);
    setStep('result');
  };

  const resetForm = () => {
    setStep('form');
    setUserData({
      name: '',
      age: '',
      goals: '',
      stressLevel: 5,
      availableTime: ''
    });
    setHabitsPlan('');
  };

  if (step === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Seu Plano de Hábitos
                </h1>
                <p className="text-sm text-slate-600">Personalizado para você</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Card className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Plano Criado com Sucesso! 🎉
                </h2>
                <p className="text-slate-600">
                  Aqui está seu plano personalizado de hábitos saudáveis
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
                {habitsPlan}
              </div>

              <div className="flex gap-4 justify-center pt-6">
                <Button
                  onClick={() => navigator.clipboard.writeText(habitsPlan)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg"
                >
                  📋 Copiar Plano
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  🔄 Criar Novo Plano
                </Button>
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  🏠 Voltar ao Início
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Hábitos Saudáveis
              </h1>
              <p className="text-sm text-slate-600">Planos holísticos para bem-estar</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Vamos Criar Seu Plano Personalizado ✨
            </h2>
            <p className="text-lg text-slate-600">
              Um plano holístico focado em sono, foco, estresse, alimentação e bem-estar mental
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="p-4 bg-white/70 backdrop-blur-sm border-pink-200">
              <div className="flex items-center gap-3">
                <Moon className="w-8 h-8 text-pink-500" />
                <div>
                  <h3 className="font-semibold text-slate-800">Sono Reparador</h3>
                  <p className="text-sm text-slate-600">Melhore qualidade e rotina</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/70 backdrop-blur-sm border-purple-200">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-500" />
                <div>
                  <h3 className="font-semibold text-slate-800">Foco & Clareza</h3>
                  <p className="text-sm text-slate-600">Aumente concentração</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/70 backdrop-blur-sm border-rose-200">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-rose-500" />
                <div>
                  <h3 className="font-semibold text-slate-800">Redução do Estresse</h3>
                  <p className="text-sm text-slate-600">Técnicas de relaxamento</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/70 backdrop-blur-sm border-orange-200">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-slate-800">Motivação</h3>
                  <p className="text-sm text-slate-600">Mantenha consistência</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">
                    👋 Qual é o seu nome?
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Maria"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="border-pink-200 focus:border-pink-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-slate-700 font-medium">
                    🎂 Idade
                  </Label>
                  <Input
                    id="age"
                    placeholder="Ex: 28"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    className="border-pink-200 focus:border-pink-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals" className="text-slate-700 font-medium">
                  🎯 Objetivos principais
                </Label>
                <Textarea
                  id="goals"
                  placeholder="Ex: dormir melhor, reduzir ansiedade, ter mais energia..."
                  value={userData.goals}
                  onChange={(e) => setUserData({ ...userData, goals: e.target.value })}
                  className="border-pink-200 focus:border-pink-400 min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-slate-700 font-medium">
                  😰 Nível de estresse atual: {userData.stressLevel}/10
                </Label>
                <Slider
                  value={[userData.stressLevel]}
                  onValueChange={(value) => setUserData({ ...userData, stressLevel: value[0] })}
                  max={10}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>😌 Muito calmo</span>
                  <span>😊 Equilibrado</span>
                  <span>😰 Muito estressado</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-slate-700 font-medium">
                  ⏰ Tempo disponível por dia
                </Label>
                <Select
                  value={userData.availableTime}
                  onValueChange={(value) => setUserData({ ...userData, availableTime: value })}
                >
                  <SelectTrigger className="border-pink-200 focus:border-pink-400">
                    <SelectValue placeholder="Selecione o tempo disponível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15-20">15-20 minutos</SelectItem>
                    <SelectItem value="30-45">30-45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="60+">Mais de 1 hora</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6">
                <Button
                  onClick={generateHabitsPlan}
                  disabled={!userData.name || !userData.age || !userData.goals || !userData.availableTime}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg text-white font-medium py-3 text-lg"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Gerar Meu Plano Personalizado ✨
                </Button>
              </div>

              <div className="text-center text-sm text-slate-500">
                <p>🔒 Seus dados são processados localmente e não são armazenados</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HabitsModule;
