import { Card, CardHeader } from "@crayonai/react-ui";
import { BarChart3, LineChart, PieChart, AreaChart, TrendingUp } from "lucide-react";
import type { ChartProps } from "@/types/templates";

export default function Chart(props: ChartProps) {
  const getChartIcon = () => {
    const iconClass = "w-5 h-5 text-white";
    switch (props.type) {
      case "bar":
        return <BarChart3 className={iconClass} />;
      case "line":
        return <LineChart className={iconClass} />;
      case "pie":
        return <PieChart className={iconClass} />;
      case "area":
        return <AreaChart className={iconClass} />;
    }
  };

  const maxValue = Math.max(...props.data.map(d => d.value));
  
  const colors = [
    "from-blue-400 to-blue-600",
    "from-emerald-400 to-emerald-600",
    "from-amber-400 to-amber-600",
    "from-rose-400 to-rose-600",
    "from-purple-400 to-purple-600",
    "from-cyan-400 to-cyan-600",
  ];

  const renderChart = () => {
    switch (props.type) {
      case "bar":
        return (
          <div className="relative p-6">
            <div className="flex items-end gap-3 h-64">
              {props.data.map((item, index) => {
                const height = (item.value / maxValue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full relative h-full flex items-end">
                      <div 
                        className={`w-full bg-gradient-to-t ${colors[index % colors.length]} rounded-t-lg transition-all duration-500 ease-out hover:opacity-90 relative overflow-hidden`}
                        style={{ 
                          height: `${height}%`,
                          animation: `slideUp 0.6s ease-out ${index * 0.1}s backwards`
                        }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        
                        {/* Value tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded font-semibold">
                            {item.value}{props.unit || ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center font-medium">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Y-axis grid lines */}
            <div className="absolute inset-x-6 top-6 bottom-16 pointer-events-none">
              {[0, 25, 50, 75, 100].map((percent) => (
                <div
                  key={percent}
                  className="absolute w-full border-t border-gray-200 dark:border-gray-700 opacity-50"
                  style={{ bottom: `${percent}%` }}
                />
              ))}
            </div>
          </div>
        );
      
      case "pie":
        const total = props.data.reduce((sum, item) => sum + item.value, 0);
        let cumulativePercentage = 0;
        
        return (
          <div className="p-6">
            <div className="relative">
              {/* Pie chart */}
              <div className="w-56 h-56 mx-auto relative">
                <svg className="w-full h-full transform -rotate-90">
                  {props.data.map((item, index) => {
                    const percentage = (item.value / total) * 100;
                    const strokeDasharray = `${percentage} ${100 - percentage}`;
                    const strokeDashoffset = 100 - cumulativePercentage;
                    cumulativePercentage += percentage;
                    
                    return (
                      <circle
                        key={index}
                        cx="50%"
                        cy="50%"
                        r="40%"
                        fill="none"
                        stroke="url(#gradient-${index})"
                        strokeWidth="20%"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 hover:opacity-80"
                        style={{
                          animation: `pieSliceIn 0.8s ease-out ${index * 0.1}s backwards`
                        }}
                      />
                    );
                  })}
                  
                  {/* Gradients */}
                  <defs>
                    {colors.map((color, index) => {
                      const [from, to] = color.split(' to-');
                      return (
                        <linearGradient key={index} id={`gradient-${index}`}>
                          <stop offset="0%" className={from} />
                          <stop offset="100%" className={to} />
                        </linearGradient>
                      );
                    })}
                  </defs>
                </svg>
                
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {total}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {props.data.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors[index % colors.length]} group-hover:scale-110 transition-transform`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.value}{props.unit || ""} ({((item.value / total) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case "line":
      case "area":
        return (
          <div className="p-6">
            <div className="relative h-64">
              <svg className="w-full h-full">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((percent) => (
                  <line
                    key={percent}
                    x1="0"
                    y1={`${100 - percent}%`}
                    x2="100%"
                    y2={`${100 - percent}%`}
                    stroke="currentColor"
                    className="text-gray-200 dark:text-gray-700"
                    strokeDasharray="4"
                  />
                ))}
                
                {/* Chart path */}
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" className="text-blue-500" stopColor="currentColor" stopOpacity="0.8" />
                    <stop offset="100%" className="text-blue-500" stopColor="currentColor" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {props.type === "area" && (
                  <path
                    d={`
                      M 0,${100 - (props.data[0].value / maxValue) * 100}%
                      ${props.data.map((item, index) => {
                        const x = (index / (props.data.length - 1)) * 100;
                        const y = 100 - (item.value / maxValue) * 100;
                        return `L ${x}%,${y}%`;
                      }).join(" ")}
                      L 100%,100%
                      L 0,100%
                      Z
                    `}
                    fill="url(#chartGradient)"
                    className="animate-fadeIn"
                  />
                )}
                
                <path
                  d={`
                    M 0,${100 - (props.data[0].value / maxValue) * 100}%
                    ${props.data.map((item, index) => {
                      const x = (index / (props.data.length - 1)) * 100;
                      const y = 100 - (item.value / maxValue) * 100;
                      return `L ${x}%,${y}%`;
                    }).join(" ")}
                  `}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  className="animate-drawLine"
                />
                
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className="text-blue-400" stopColor="currentColor" />
                    <stop offset="100%" className="text-purple-600" stopColor="currentColor" />
                  </linearGradient>
                </defs>
                
                {/* Data points */}
                {props.data.map((item, index) => {
                  const x = (index / (props.data.length - 1)) * 100;
                  const y = 100 - (item.value / maxValue) * 100;
                  return (
                    <g key={index}>
                      <circle
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="6"
                        className="fill-white stroke-blue-500"
                        strokeWidth="3"
                        style={{
                          animation: `scaleIn 0.3s ease-out ${index * 0.1}s backwards`
                        }}
                      />
                      <text
                        x={`${x}%`}
                        y={`${y - 3}%`}
                        textAnchor="middle"
                        className="text-xs font-semibold fill-gray-700 dark:fill-gray-300"
                      >
                        {item.value}
                      </text>
                    </g>
                  );
                })}
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between mt-2">
                {props.data.map((item, index) => (
                  <span key={index} className="text-xs text-gray-600 dark:text-gray-400">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card 
      variant="card" 
      width="standard" 
      className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader 
        title={
          <div className="flex items-center gap-3 relative z-10">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${colors[0]} shadow-lg`}>
              {getChartIcon()}
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              {props.title}
            </h3>
          </div>
        }
      />
      
      <div className="relative z-10">
        {renderChart()}
      </div>
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes pieSliceIn {
          from {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          to {
            stroke-dashoffset: inherit;
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes drawLine {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </Card>
  );
}