import { Card, CardHeader } from "@crayonai/react-ui";
import { TrendingUp, TrendingDown, Minus, Activity, Clock } from "lucide-react";
import type { DashboardCardProps } from "@/types/templates";

export default function DashboardCard(props: DashboardCardProps) {
  const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-rose-500" />;
      case "neutral":
        return <Minus className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend?: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20";
      case "down":
        return "text-rose-600 bg-rose-50 dark:bg-rose-900/20";
      case "neutral":
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <Card 
      variant="card" 
      width="standard" 
      className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header with icon */}
      <CardHeader 
        title={
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              {props.title}
            </h3>
          </div>
        } 
      />
      
      <div className="grid grid-cols-2 gap-6 p-6 relative z-10">
        {props.metrics.map((metric, index) => (
          <div 
            key={index} 
            className="group/metric relative p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            {/* Metric background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  {metric.value}
                </p>
                {metric.trend && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                    {metric.change && (
                      <span className="text-xs font-semibold">
                        {metric.change}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {props.lastUpdated && (
        <div className="px-6 pb-4 flex items-center justify-end gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          <span>Updated {props.lastUpdated}</span>
        </div>
      )}
    </Card>
  );
}