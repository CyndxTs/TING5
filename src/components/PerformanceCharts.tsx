import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";

const weightData = [
  { day: 0, pesoReal: 0.045, pesoObjetivo: 0.045 },
  { day: 7, pesoReal: 0.185, pesoObjetivo: 0.180 },
  { day: 14, pesoReal: 0.475, pesoObjetivo: 0.460 },
  { day: 21, pesoReal: 0.920, pesoObjetivo: 0.900 },
  { day: 28, pesoReal: 1.520, pesoObjetivo: 1.480 },
  { day: 35, pesoReal: 2.180, pesoObjetivo: 2.150 },
  { day: 42, pesoReal: 2.850, pesoObjetivo: 2.800 },
];

const feedData = [
  { week: "Sem 1", consumo: 850, eficiencia: 0.95 },
  { week: "Sem 2", consumo: 1200, eficiencia: 1.15 },
  { week: "Sem 3", consumo: 1850, eficiencia: 1.42 },
  { week: "Sem 4", consumo: 2400, eficiencia: 1.58 },
  { week: "Sem 5", consumo: 2850, eficiencia: 1.68 },
  { week: "Sem 6", consumo: 3100, eficiencia: 1.72 },
];

const mortalityData = [
  { day: "Día 1-7", mortalidad: 1.2, objetivo: 1.5 },
  { day: "Día 8-14", mortalidad: 0.8, objetivo: 1.0 },
  { day: "Día 15-21", mortalidad: 0.5, objetivo: 0.8 },
  { day: "Día 22-28", mortalidad: 0.6, objetivo: 0.7 },
  { day: "Día 29-35", mortalidad: 0.7, objetivo: 0.8 },
  { day: "Día 36-42", mortalidad: 0.9, objetivo: 1.0 },
];

export function PerformanceCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores de Rendimiento</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weight">Curva de Peso</TabsTrigger>
            <TabsTrigger value="feed">Consumo de Alimento</TabsTrigger>
            <TabsTrigger value="mortality">Mortalidad</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#64748b"
                  label={{ value: 'Días de edad', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke="#64748b"
                  label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft' }}
                />
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
                  dataKey="pesoReal" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Peso Real (kg)"
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pesoObjetivo" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Peso Objetivo (kg)"
                  dot={{ fill: '#94a3b8', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="feed" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={feedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis 
                  yAxisId="left"
                  stroke="#64748b"
                  label={{ value: 'Consumo (kg)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#64748b"
                  label={{ value: 'Conv. Alimenticia', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="consumo" 
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="Consumo Acum. (kg)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Conversión Alimenticia"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="mortality" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mortalityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis 
                  stroke="#64748b"
                  label={{ value: 'Mortalidad (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="mortalidad" fill="#ef4444" name="Mortalidad Real (%)" />
                <Bar dataKey="objetivo" fill="#94a3b8" name="Objetivo (%)" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
