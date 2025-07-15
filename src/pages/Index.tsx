
import { useState } from 'react';
import { Utensils, Users, Dumbbell, Heart, Target, TrendingUp, Calendar, Camera, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NutritionModule from '@/components/modules/NutritionModule';
import BodyAssessmentModule from '@/components/modules/BodyAssessmentModule';
import { WorkoutModule } from '@/components/modules/WorkoutModule';
import ProgressModule from '@/components/modules/ProgressModule';
import { HabitsModule } from '@/components/modules/HabitsModule';
import { StretchingModule } from '@/components/modules/StretchingModule';

type ModuleType = 'home' | 'nutrition' | 'body-assessment' | 'workout' | 'progress' | 'habits' | 'stretching';

const Index = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('home');

  const modules = [
    {
      id: 'nutrition' as ModuleType,
      title: 'Nutricionista IA',
      description: 'Análise nutricional de pratos, calorias e dicas alimentares',
      icon: <Utensils className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      id: 'body-assessment' as ModuleType,
      title: 'Avaliação Corporal',
      description: 'Análise visual de composição corporal e postura',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'workout' as ModuleType,
      title: 'Planejador de Treinos',
      description: 'Criação de treinos personalizados e exercícios',
      icon: <Dumbbell className="w-8 h-8" />,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50'
    },
    {
      id: 'stretching' as ModuleType,
      title: 'Alongamentos & Alívio',
      description: 'Exercícios para aliviar dores comuns e tensões do dia a dia',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50'
    },
    {
      id: 'habits' as ModuleType,
      title: 'Hábitos Saudáveis',
      description: 'Planos holísticos para sono, foco, estresse e bem-estar',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50'
    },
    {
      id: 'progress' as ModuleType,
      title: 'Acompanhamento',
      description: 'Monitoramento de progresso e métricas fitness',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'nutrition':
        return <NutritionModule onBack={() => setActiveModule('home')} />;
      case 'body-assessment':
        return <BodyAssessmentModule onBack={() => setActiveModule('home')} />;
      case 'workout':
        return <WorkoutModule />;
      case 'stretching':
        return <StretchingModule />;
      case 'habits':
        return <HabitsModule />;
      case 'progress':
        return <ProgressModule onBack={() => setActiveModule('home')} />;
      default:
        return null;
    }
  };

  if (activeModule !== 'home') {
    return renderActiveModule();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FitAI Ecosystem
              </h1>
              <p className="text-sm text-slate-600">Seu ecossistema fitness completo</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Seu <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ecossistema Fitness</span> Completo
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Uma plataforma holística que combina nutrição inteligente, avaliação corporal, planejamento de treinos 
            e acompanhamento de progresso - tudo em um só lugar para sua jornada fitness.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">AI</p>
            <p className="text-sm text-slate-600">Análise Visual</p>
          </Card>
          <Card className="p-4 text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">360°</p>
            <p className="text-sm text-slate-600">Abordagem Holística</p>
          </Card>
          <Card className="p-4 text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">Personal</p>
            <p className="text-sm text-slate-600">Treinos Customizados</p>
          </Card>
          <Card className="p-4 text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">24/7</p>
            <p className="text-sm text-slate-600">Acompanhamento</p>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className={`p-8 bg-gradient-to-br ${module.bgColor} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105`}
              onClick={() => setActiveModule(module.id)}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className={`w-full bg-gradient-to-r ${module.color} hover:shadow-lg text-white font-medium py-3 text-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    Acessar Módulo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">
            Recursos Integrados
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Análise por IA</h4>
              <p className="text-slate-600 text-sm">Tecnologia avançada para análise visual de alimentos e composição corporal</p>
            </div>
            <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Personalização Total</h4>
              <p className="text-slate-600 text-sm">Planos adaptados aos seus objetivos, limitações e preferências específicas</p>
            </div>
            <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Progresso Contínuo</h4>
              <p className="text-slate-600 text-sm">Acompanhamento detalhado da sua evolução em todas as áreas do fitness</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
