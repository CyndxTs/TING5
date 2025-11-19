import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Award, AlertCircle } from "lucide-react";

const farmRankingData = [
  {
    rank: 1,
    name: "Granja Sur - Galpón 1",
    lote: "L-2025-003",
    fcr: 1.68,
    mortality: 2.8,
    finalWeight: 2885,
    geneticCompliance: 101.4,
    costPerKg: 0.73,
    score: 95,
    status: "excellent",
  },
  {
    rank: 2,
    name: "Granja Norte - Galpón 1",
    lote: "L-2025-001",
    fcr: 1.65,
    mortality: 2.1,
    finalWeight: 2850,
    geneticCompliance: 101.8,
    costPerKg: 0.71,
    score: 94,
    status: "excellent",
  },
  {
    rank: 3,
    name: "Granja Norte - Galpón 2",
    lote: "L-2025-002",
    fcr: 1.70,
    mortality: 2.4,
    finalWeight: 2820,
    geneticCompliance: 100.7,
    costPerKg: 0.75,
    score: 91,
    status: "good",
  },
  {
    rank: 4,
    name: "Granja Este - Galpón 1",
    lote: "L-2025-005",
    fcr: 1.75,
    mortality: 2.9,
    finalWeight: 2780,
    geneticCompliance: 99.3,
    costPerKg: 0.78,
    score: 87,
    status: "good",
  },
  {
    rank: 5,
    name: "Granja Sur - Galpón 3",
    lote: "L-2025-004",
    fcr: 1.72,
    mortality: 1.9,
    finalWeight: 2795,
    geneticCompliance: 99.8,
    costPerKg: 0.76,
    score: 88,
    status: "good",
  },
  {
    rank: 6,
    name: "Granja Este - Galpón 2",
    lote: "L-2025-006",
    fcr: 1.82,
    mortality: 3.5,
    finalWeight: 2650,
    geneticCompliance: 94.6,
    costPerKg: 0.84,
    score: 78,
    status: "warning",
  },
  {
    rank: 7,
    name: "Granja Sur - Galpón 2",
    lote: "L-2025-008",
    fcr: 1.88,
    mortality: 4.2,
    finalWeight: 2580,
    geneticCompliance: 92.1,
    costPerKg: 0.89,
    score: 72,
    status: "alert",
  },
];

export function FarmRanking() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Ranking de Desempeño: Granjas y Galpones</CardTitle>
            <p className="text-slate-500 mt-1">
              Comparativo de eficiencia operativa - Últimos lotes cerrados
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">7 Lotes Evaluados</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {farmRankingData.map((farm, index) => (
            <div 
              key={farm.lote}
              className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${
                farm.status === 'excellent' ? 'border-green-300 bg-green-50' :
                farm.status === 'good' ? 'border-blue-200 bg-blue-50' :
                farm.status === 'warning' ? 'border-amber-300 bg-amber-50' :
                'border-red-300 bg-red-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Ranking Badge */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-slate-300 text-slate-700' :
                  index === 2 ? 'bg-amber-600 text-white' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  {index < 3 ? (
                    <Award className="w-6 h-6" />
                  ) : (
                    <span className="text-lg">{farm.rank}</span>
                  )}
                </div>

                {/* Farm Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-slate-900">{farm.name}</h3>
                    <Badge variant="outline">{farm.lote}</Badge>
                    <Badge 
                      variant={
                        farm.status === 'excellent' ? 'default' :
                        farm.status === 'good' ? 'secondary' :
                        farm.status === 'warning' ? 'outline' :
                        'destructive'
                      }
                    >
                      Score: {farm.score}
                    </Badge>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-5 gap-6 mt-3">
                    <div>
                      <span className="text-slate-500">FCR</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-900">{farm.fcr}</span>
                        {farm.fcr < 1.72 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Mortalidad</span>
                      <div className="flex items-center gap-1">
                        <span className={farm.mortality > 3.5 ? 'text-red-600' : 'text-slate-900'}>
                          {farm.mortality}%
                        </span>
                        {farm.mortality > 3.5 && (
                          <AlertCircle className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Peso Final</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-900">{farm.finalWeight}g</span>
                        {farm.finalWeight > 2800 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-amber-600" />
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Cump. Genético</span>
                      <div className="flex items-center gap-1">
                        <span className={farm.geneticCompliance >= 98 ? 'text-green-600' : 'text-red-600'}>
                          {farm.geneticCompliance}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500">Costo/kg</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-900">${farm.costPerKg}</span>
                        {farm.costPerKg < 0.75 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex-shrink-0">
                  {farm.status === 'excellent' ? (
                    <div className="text-green-700 text-center">
                      <TrendingUp className="w-6 h-6 mx-auto" />
                      <span className="text-xs">Excelente</span>
                    </div>
                  ) : farm.status === 'good' ? (
                    <div className="text-blue-700 text-center">
                      <TrendingUp className="w-6 h-6 mx-auto" />
                      <span className="text-xs">Bueno</span>
                    </div>
                  ) : farm.status === 'warning' ? (
                    <div className="text-amber-700 text-center">
                      <AlertCircle className="w-6 h-6 mx-auto" />
                      <span className="text-xs">Mejorar</span>
                    </div>
                  ) : (
                    <div className="text-red-700 text-center">
                      <AlertCircle className="w-6 h-6 mx-auto" />
                      <span className="text-xs">Requiere Atención</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}