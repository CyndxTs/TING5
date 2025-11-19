import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { TrendingUp, Target, AlertCircle } from "lucide-react";

const weightData = [
  { day: 0, pesoReal: 45, curvaGenetica: 45, desviacion: 0 },
  { day: 7, pesoReal: 185, curvaGenetica: 180, desviacion: 5 },
  { day: 14, pesoReal: 480, curvaGenetica: 460, desviacion: 20 },
  { day: 21, pesoReal: 925, curvaGenetica: 900, desviacion: 25 },
  { day: 28, pesoReal: 1535, curvaGenetica: 1480, desviacion: 55 },
  { day: 35, pesoReal: 2180, curvaGenetica: 2150, desviacion: 30 },
  { day: 42, pesoReal: null, curvaGenetica: 2800, desviacion: null },
];

const projectionData = [
  { day: 35, pesoReal: 2180, proyeccion: null },
  { day: 36, pesoReal: null, proyeccion: 2280 },
  { day: 37, pesoReal: null, proyeccion: 2380 },
  { day: 38, pesoReal: null, proyeccion: 2485 },
  { day: 39, pesoReal: null, proyeccion: 2590 },
  { day: 40, pesoReal: null, proyeccion: 2695 },
  { day: 41, pesoReal: null, proyeccion: 2795 },
  { day: 42, pesoReal: null, proyeccion: 2885 },
];

const combinedData = [...weightData.slice(0, -1), ...projectionData];

export function LotPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento del Lote: Curva de Peso Real vs Genética Estándar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="day" 
                stroke="#64748b"
                label={{ value: 'Edad (días)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="#64748b"
                label={{ value: 'Peso (gramos)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <ReferenceLine x={35} stroke="#f59e0b" strokeDasharray="3 3" label="Hoy" />
              <Line 
                type="monotone" 
                dataKey="curvaGenetica" 
                stroke="#94a3b8" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Curva Genética Estándar"
                dot={{ fill: '#94a3b8', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="pesoReal" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Peso Real del Lote"
                dot={{ fill: '#3b82f6', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="proyeccion" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="3 3"
                name="Proyección Cierre"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Indicadores Adicionales */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="border border-slate-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-slate-600">Peso Promedio Actual</span>
            </div>
            <div className="text-slate-900">2,180 g</div>
            <div className="text-green-600">+30g vs estándar</div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-slate-600">Proyección Día 42</span>
            </div>
            <div className="text-slate-900">2,885 g</div>
            <div className="text-green-600">+85g vs meta (103%)</div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-slate-600">Desviación Acumulada</span>
            </div>
            <div className="text-slate-900">+30 g</div>
            <div className="text-green-600">+1.4% superior</div>
          </div>

          <div className="border border-green-200 bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-slate-600">Cumplimiento Meta</span>
            </div>
            <div className="text-slate-900">101.4%</div>
            <div className="text-green-600">Por encima</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}