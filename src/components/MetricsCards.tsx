import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from "lucide-react";

const metrics = [
  {
    title: "Ingresos Totales",
    value: "$45,231",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Usuarios Activos",
    value: "2,345",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Ventas",
    value: "1,234",
    change: "-3.2%",
    trend: "down",
    icon: ShoppingCart,
  },
  {
    title: "Tasa de Conversión",
    value: "3.24%",
    change: "+5.4%",
    trend: "up",
    icon: Activity,
  },
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-slate-600">{metric.title}</CardTitle>
              <Icon className="w-5 h-5 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-slate-900">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
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
                <span className="text-slate-500">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
