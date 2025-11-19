import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Sprout, TrendingUp, Shield, Utensils, Truck, Target } from "lucide-react";

const stages = [
  {
    name: "Recría/Levante",
    icon: Sprout,
    progress: 85,
    status: "En proceso",
    lots: 3,
    birds: 12500,
    avgAge: "14 días",
    details: "Desarrollo óptimo",
  },
  {
    name: "Engorde Productivo",
    icon: TrendingUp,
    progress: 65,
    status: "En proceso",
    lots: 5,
    birds: 22800,
    avgAge: "28 días",
    details: "Peso objetivo: 2.8kg",
  },
  {
    name: "Sanidad y Ambiente",
    icon: Shield,
    progress: 92,
    status: "Óptimo",
    lots: 8,
    birds: 45280,
    avgAge: "N/A",
    details: "Vacunación completa",
  },
  {
    name: "Consumo de Alimento",
    icon: Utensils,
    progress: 78,
    status: "Eficiente",
    lots: 8,
    birds: 45280,
    avgAge: "N/A",
    details: "Conv. 1.68",
  },
  {
    name: "Movilización",
    icon: Truck,
    progress: 45,
    status: "Programado",
    lots: 2,
    birds: 9980,
    avgAge: "42 días",
    details: "Próxima: 20 Nov",
  },
  {
    name: "Resultados del Lote",
    icon: Target,
    progress: 88,
    status: "Cumpliendo",
    lots: 1,
    birds: 5000,
    avgAge: "45 días",
    details: "Rendimiento 94%",
  },
];

export function ProductionStages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Etapas del Ciclo Productivo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.name} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">{stage.name}</h3>
                      <p className="text-slate-500">{stage.details}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-600">Avance</span>
                      <span className="text-slate-900">{stage.progress}%</span>
                    </div>
                    <Progress value={stage.progress} />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-slate-500">Lotes</p>
                      <p className="text-slate-900">{stage.lots}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Aves</p>
                      <p className="text-slate-900">{stage.birds.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Edad</p>
                      <p className="text-slate-900">{stage.avgAge}</p>
                    </div>
                  </div>

                  <Badge 
                    variant={
                      stage.status === "Óptimo" ? "default" :
                      stage.status === "En proceso" ? "secondary" :
                      "outline"
                    }
                  >
                    {stage.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
