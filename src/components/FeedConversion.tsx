import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, TrendingDown } from "lucide-react";

const feedData = [
  { day: 7, consumoDiario: 22, consumoObjetivo: 21, fcrAcumulado: 0.95, fcrEsperado: 1.0 },
  { day: 14, consumoDiario: 48, consumoObjetivo: 46, fcrAcumulado: 1.15, fcrEsperado: 1.18 },
  { day: 21, consumoDiario: 82, consumoObjetivo: 80, fcrAcumulado: 1.42, fcrEsperado: 1.45 },
  { day: 28, consumoDiario: 118, consumoObjetivo: 120, fcrAcumulado: 1.58, fcrEsperado: 1.62 },
  { day: 35, consumoDiario: 148, consumoObjetivo: 145, fcrAcumulado: 1.68, fcrEsperado: 1.72 },
];

const feedCostData = [
  { etapa: "Pre-iniciador", kg: 125, costoKg: 1.85, total: 231 },
  { etapa: "Iniciador", kg: 680, costoKg: 1.65, total: 1122 },
  { etapa: "Engorde", kg: 2855, costoKg: 1.45, total: 4140 },
];

export function FeedConversion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alimentación y Conversión Alimenticia (FCR)</CardTitle>
        <p className="text-slate-500">
          Monitoreo del principal centro de costo (60-70% del total)
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gráfico de Consumo Diario */}
          <div>
            <h3 className="text-slate-700 mb-3">Consumo Diario vs. Objetivo</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={feedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" label={{ value: 'Días', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#64748b" label={{ value: 'g/ave/día', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="consumoDiario" 
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="Consumo Real (g)"
                />
                <Line 
                  type="monotone" 
                  dataKey="consumoObjetivo" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Consumo Objetivo (g)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de FCR */}
          <div>
            <h3 className="text-slate-700 mb-3">Conversión Alimenticia Acumulada</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={feedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" label={{ value: 'Días', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#64748b" label={{ value: 'FCR', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="fcrAcumulado" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  name="FCR Real"
                  dot={{ fill: '#f59e0b', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fcrEsperado" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="FCR Esperado"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Métricas y Costos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-lg p-3">
                <span className="text-slate-600">Consumo Acumulado</span>
                <div className="text-slate-900">3.66 kg/ave</div>
                <div className="text-green-600">Eficiente (-40g vs objetivo)</div>
              </div>
              
              <div className="border border-slate-200 rounded-lg p-3">
                <span className="text-slate-600">Consumo Actual (Día 35)</span>
                <div className="text-slate-900">148 g/ave/día</div>
                <div className="text-green-600">+3g vs objetivo</div>
              </div>

              <div className="border border-green-200 bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-slate-600">FCR Actual</span>
                </div>
                <div className="text-slate-900">1.68</div>
                <div className="text-green-600">-0.04 vs esperado (mejor)</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h3 className="text-slate-700">Costo por Etapa</h3>
              </div>
              <div className="space-y-2">
                {feedCostData.map((item) => (
                  <div key={item.etapa} className="flex items-center justify-between pb-2 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="text-slate-700">{item.etapa}</div>
                      <div className="text-slate-500">{item.kg} kg × ${item.costoKg}/kg</div>
                    </div>
                    <div className="text-slate-900">${item.total.toLocaleString()}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t-2 border-slate-300">
                  <span className="text-slate-700">Total Alimento</span>
                  <span className="text-slate-900">$5,493</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Costo por kg producido</span>
                  <span className="text-blue-700">$2.52/kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
