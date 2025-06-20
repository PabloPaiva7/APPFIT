
import { useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, Target, Award, Activity, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProgressModuleProps {
  onBack: () => void;
}

const ProgressModule = ({ onBack }: ProgressModuleProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = {
    workouts: { current: 12, previous: 8, change: 50 },
    calories: { current: 2850, previous: 3200, change: -11 },
    weight: { current: 75.2, previous: 76.8, change: -2.1 },
    bodyfat: { current: 15.2, previous: 17.1, change: -11.1 }
  };

  const achievements = [
    { id: 1, title: 'Primeira Semana', description: 'Completou sua primeira semana de treinos', icon: <Award className="w-6 h-6" />, earned: true },
    { id: 2, title: 'Consistência', description: '7 dias seguidos de atividade', icon: <Target className="w-6 h-6" />, earned: true },
    { id: 3, title: 'Progresso Nutricional', description: '5 refeições saudáveis avaliadas', icon: <Activity className="w-6 h-6" />, earned: false },
    { id: 4, title: 'Transformação', description: 'Primeira avaliação corporal completa', icon: <Users className="w-6 h-6" />, earned: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-orange-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Acompanhamento
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Seu <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Progresso</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acompanhe sua evolução e conquiste seus objetivos com métricas detalhadas
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Period Selection */}
          <div className="flex justify-center gap-2">
            {['week', 'month', 'year'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod(period)}
                className={selectedPeriod === period 
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' 
                  : 'border-orange-200 text-orange-600 hover:bg-orange-50'
                }
              >
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mês' : 'Ano'}
              </Button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 border shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-blue-600" />
                <Badge className={`${stats.workouts.change > 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {stats.workouts.change > 0 ? '+' : ''}{stats.workouts.change}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.workouts.current}</h3>
              <p className="text-sm text-gray-600">Treinos Realizados</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 border shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-green-600" />
                <Badge className={`${stats.calories.change < 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {stats.calories.change > 0 ? '+' : ''}{stats.calories.change}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.calories.current}</h3>
              <p className="text-sm text-gray-600">Calorias Médias/dia</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 border shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <Badge className={`${stats.weight.change < 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {stats.weight.change > 0 ? '+' : ''}{stats.weight.change}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.weight.current}kg</h3>
              <p className="text-sm text-gray-600">Peso Corporal</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 border shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-orange-600" />
                <Badge className={`${stats.bodyfat.change < 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {stats.bodyfat.change > 0 ? '+' : ''}{stats.bodyfat.change}%
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.bodyfat.current}%</h3>
              <p className="text-sm text-gray-600">Gordura Corporal</p>
            </Card>
          </div>

          {/* Progress Chart Placeholder */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Evolução no Tempo</h3>
            <div className="h-64 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de progresso será exibido aqui</p>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Conquistas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`p-4 transition-all duration-200 ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 border' 
                      : 'bg-gray-50 border-gray-200 border opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' 
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="p-6 h-auto bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Agendar Avaliação</p>
              </div>
            </Button>
            <Button className="p-6 h-auto bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Definir Meta</p>
              </div>
            </Button>
            <Button className="p-6 h-auto bg-gradient-to-br from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white">
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Ver Histórico</p>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressModule;
