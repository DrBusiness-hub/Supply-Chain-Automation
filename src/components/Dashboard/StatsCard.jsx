import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon, 
  color = 'blue',
  description 
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
        colorClasses[color]
      )} />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            
            {change && (
              <div className="flex items-center gap-1">
                {changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                )}>
                  {change}
                </span>
                {description && (
                  <span className="text-sm text-gray-500 ml-1">{description}</span>
                )}
              </div>
            )}
          </div>
          
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
            colorClasses[color]
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

