import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Bird, Activity, Scale, AlertTriangle } from "lucide-react";

const metrics = [
  {
    title: "Aves Activas",
    value: "45,280",
    subtitle: "Total en producción",
    change: "+2.3%",
    trend: "up",
    icon: Bird,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Peso Promedio",
    value: "2.45 kg",
    subtitle: "Edad 35 días",
    change: "+5.2%",
    trend: "up",
    icon: Scale,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Conversión Alimenticia",
    value: "1.68",
    subtitle: "kg alimento/kg ave",
    change: "-3.1%",
    trend: "up",
    icon: Activity,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Mortalidad",
    value: "2.8%",
    subtitle: "Últimos 7 días",
    change: "+0.5%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

export function KPIMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-slate-600">{metric.title}</CardTitle>
              <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-slate-900">{metric.value}</div>
              <p className="text-slate-500 mt-1">{metric.subtitle}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon 
                  className={`w-4 h-4 ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`} 
                />
                <span 
                  className={`${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-slate-500">vs semana anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
