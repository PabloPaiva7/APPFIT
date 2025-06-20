
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, TrendingUp, Utensils, Lightbulb, Target, Zap } from 'lucide-react';

interface Evaluation {
  vegetables: number;
  proteins: number;
  healthiness: number;
  analysis: string;
  tip: string;
}

interface ResultsDisplayProps {
  evaluation: Evaluation;
}

const ResultsDisplay = ({ evaluation }: ResultsDisplayProps) => {
  const getHealthClassification = (score: number) => {
    if (score >= 7) return { label: 'Saudável', color: 'bg-green-500', bgClass: 'from-green-50 to-emerald-50', borderClass: 'border-green-200' };
    if (score >= 4) return { label: 'Médio', color: 'bg-yellow-500', bgClass: 'from-yellow-50 to-orange-50', borderClass: 'border-yellow-200' };
    return { label: 'Não Saudável', color: 'bg-red-500', bgClass: 'from-red-50 to-pink-50', borderClass: 'border-red-200' };
  };

  const estimateCalories = (vegetables: number, proteins: number, healthiness: number) => {
    const baseCalories = 300;
    const vegetablesFactor = vegetables * 20;
    const proteinsFactor = proteins * 40;
    const healthinessFactor = (10 - healthiness) * 30;
    return Math.round(baseCalories + vegetablesFactor + proteinsFactor + healthinessFactor);
  };

  const averageScore = Math.round((evaluation.vegetables + evaluation.proteins + evaluation.healthiness) / 3);
  const classification = getHealthClassification(averageScore);
  const estimatedCalories = estimateCalories(evaluation.vegetables, evaluation.proteins, evaluation.healthiness);

  return (
    <div className="space-y-6">
      <Card className={`p-6 bg-gradient-to-br ${classification.bgClass} ${classification.borderClass} border shadow-xl`}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Análise Nutricional Completa</h3>
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full ${classification.color} flex items-center justify-center text-white font-bold text-xl mb-2`}>
                {averageScore}
              </div>
              <Badge className={`${classification.color} text-white`}>
                {classification.label}
              </Badge>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm mb-2">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-gray-800">{estimatedCalories} kcal</p>
              <p className="text-sm text-gray-600">Estimativa</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Vegetais</h4>
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mx-auto mt-2">
              {evaluation.vegetables}
            </div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Proteínas</h4>
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mx-auto mt-2">
              {evaluation.proteins}
            </div>
          </div>

          <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <Utensils className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Saudabilidade</h4>
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold mx-auto mt-2">
              {evaluation.healthiness}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-800">Análise do Prato</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">{evaluation.analysis}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 border shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-800">Dica de Melhoria</h4>
          </div>
          <p className="text-gray-700 leading-relaxed font-medium">{evaluation.tip}</p>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
