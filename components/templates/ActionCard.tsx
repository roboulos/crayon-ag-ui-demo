import { Card, CardHeader, Button } from "@crayonai/react-ui";
import { Zap, ArrowRight, Shield, AlertTriangle, CheckCircle, Play, Settings, Download } from "lucide-react";
import type { ActionCardProps } from "@/types/templates";

export default function ActionCard(props: ActionCardProps) {
  const getButtonStyles = (type: "primary" | "secondary" | "danger") => {
    switch (type) {
      case "primary":
        return {
          base: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl",
          icon: <ArrowRight className="w-4 h-4 ml-2" />,
          glow: "hover:shadow-blue-500/25"
        };
      case "secondary":
        return {
          base: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
          icon: <Settings className="w-4 h-4 ml-2" />,
          glow: ""
        };
      case "danger":
        return {
          base: "bg-gradient-to-r from-rose-500 to-rose-600 text-white border-0 shadow-lg hover:shadow-xl",
          icon: <AlertTriangle className="w-4 h-4 ml-2" />,
          glow: "hover:shadow-rose-500/25"
        };
      default:
        return {
          base: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
          icon: null,
          glow: ""
        };
    }
  };

  const getActionIcon = (action: string) => {
    // Map common action names to icons
    if (action.toLowerCase().includes('download')) return <Download className="w-4 h-4" />;
    if (action.toLowerCase().includes('play') || action.toLowerCase().includes('start')) return <Play className="w-4 h-4" />;
    if (action.toLowerCase().includes('secure') || action.toLowerCase().includes('protect')) return <Shield className="w-4 h-4" />;
    if (action.toLowerCase().includes('complete') || action.toLowerCase().includes('done')) return <CheckCircle className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    // Add visual feedback
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }
  };

  return (
    <Card 
      variant="card" 
      width="standard" 
      className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      
      <CardHeader 
        title={
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg animate-pulse">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              {props.title}
            </h3>
          </div>
        }
      />
      
      <div className="p-6 space-y-6 relative z-10">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {props.description}
        </p>
        
        <div className="flex flex-wrap gap-3">
          {props.actions.map((action, index) => {
            const styles = getButtonStyles(action.type);
            return (
              <button
                key={index}
                onClick={() => handleAction(action.action)}
                className={`
                  group/btn relative inline-flex items-center justify-center px-6 py-3 
                  font-medium rounded-lg transition-all duration-300 transform 
                  hover:-translate-y-0.5 active:scale-95
                  ${styles.base} ${styles.glow}
                `}
                style={{
                  animation: `fadeIn 0.4s ease-out ${index * 0.1}s backwards`
                }}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                </div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  {getActionIcon(action.action)}
                  {action.label}
                  {styles.icon}
                </span>
                
                {/* Ripple effect container */}
                <span className="absolute inset-0 rounded-lg overflow-hidden">
                  <span className="absolute inset-0 rounded-lg ring-2 ring-inset ring-white/0 group-hover/btn:ring-white/20 transition-all duration-300" />
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Action hint */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Actions ready to execute</span>
        </div>
      </div>
    </Card>
  );
}