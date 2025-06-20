
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface EvaluationCardProps {
  title: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  icon: React.ReactNode;
  color: 'blue' | 'indigo' | 'purple';
}

const EvaluationCard = ({ title, description, value, onChange, icon, color }: EvaluationCardProps) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      slider: 'data-[state=active]:bg-blue-600'
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      slider: 'data-[state=active]:bg-indigo-600'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      slider: 'data-[state=active]:bg-purple-600'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <Card className={`p-4 ${currentColor.bg} ${currentColor.border} border transition-all duration-200 hover:shadow-md`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${currentColor.text} bg-white/50`}>
            {icon}
          </div>
          <div className="flex-1">
            <Label className="text-sm font-semibold text-gray-800">
              {title}
            </Label>
            <p className="text-xs text-gray-600 mt-1">
              {description}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full bg-white/70 ${currentColor.text} font-bold text-lg min-w-12 text-center`}>
            {value}
          </div>
        </div>
        
        <div className="space-y-2">
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={10}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EvaluationCard;
