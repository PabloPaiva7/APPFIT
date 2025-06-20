
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Zap, Lightbulb, Target } from 'lucide-react';

interface Evaluation {
  muscleDefinition: number;
  posture: number;
  bodyFat: number;
  analysis: string;
  tip: string;
}

interface ResultsDisplayProps {
  evaluation: Evaluation;
}

const ResultsDisplay = ({ evaluation }: ResultsDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excelente';
    if (score >= 6) return 'Bom';
    if (score >= 4) return 'Regular';
    return 'Precisa Melhorar';
  };

  const averageScore = Math.round((evaluation.muscleDefinition + evaluation.posture + evaluation.bodyFat) / 3);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Resultado da Avaliação</h3>
          <div className="flex items-center justify-center gap-3">
            <div className={`w-16 h-16 rounded-full ${getScoreColor(averageScore)} flex items-center justify-center text-white font-bold text-xl`}>
              {averageScore}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Média Geral</p>
              <Badge variant="secondary" className="mt-1">
                {getScoreLabel(averageScore)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Definição Muscular</h4>
            <div className={`w-12 h-12 rounded-full ${getScoreColor(evaluation.muscleDefinition)} flex items-center justify-center text-white font-bold mx-auto mt-2`}>
              {evaluation.muscleDefinition}
            </div>
          </div>

          <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-200">
            <Star className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Postura</h4>
            <div className={`w-12 h-12 rounded-full ${getScoreColor(evaluation.posture)} flex items-center justify-center text-white font-bold mx-auto mt-2`}>
              {evaluation.posture}
            </div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Gordura Aparente</h4>
            <div className={`w-12 h-12 rounded-full ${getScoreColor(evaluation.bodyFat)} flex items-center justify-center text-white font-bold mx-auto mt-2`}>
              {evaluation.bodyFat}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-800">Análise Detalhada</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">{evaluation.analysis}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 border shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-800">Dica da Semana</h4>
          </div>
          <p className="text-gray-700 leading-relaxed font-medium">{evaluation.tip}</p>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
