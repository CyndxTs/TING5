import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { Thermometer, Droplets, Wind, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "./ui/badge";

const tempHumidityData = [
  { hour: "00:00", temp: 27.2, humedad: 68 },
  { hour: "04:00", temp: 26.5, humedad: 72 },
  { hour: "08:00", temp: 28.1, humedad: 65 },
  { hour: "12:00", temp: 29.8, humedad: 58 },
  { hour: "16:00", temp: 30.2, humedad: 55 },
  { hour: "20:00", temp: 28.5, humedad: 62 },
];

const mortalityCausesData = [
  { causa: "Ascitis", cantidad: 18, porcentaje: 32 },
  { causa: "Respiratory", cantidad: 12, porcentaje: 21 },
  { causa: "Patas débiles", cantidad: 10, porcentaje: 18 },
  { causa: "Súbita", cantidad: 8, porcentaje: 14 },
  { causa: "Otras", cantidad: 8, porcentaje: 14 },
];

const biosecurityData = [
  { item: "Limpieza de galpón", status: "completed", date: "Hoy 06:00" },
  { item: "Desinfección vehículos", status: "completed", date: "Hoy 08:30" },
  { item: "Control de plagas", status: "completed", date: "Ayer" },
  { item: "Registro de visitas", status: "completed", date: "Hoy 10:15" },
  { item: "Revisión de agua", status: "pending", date: "Pendiente" },
  { item: "Cambio de pediluvios", status: "alert", date: "Atrasado" },
];

export function HealthEnvironment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sanidad y Condiciones Ambientales</CardTitle>
        <p className="text-slate-500">
          Monitoreo fisiológico y ambiental para detección temprana de problemas
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Temperatura y Humedad */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-slate-700 mb-3">Temperatura y Humedad del Galpón (Últimas 24h)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={tempHumidityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis 
                    yAxisId="left"
                    stroke="#64748b"
                    label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }}
                    domain={[20, 35]}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748b"
                    label={{ value: 'Humedad (%)', angle: 90, position: 'insideRight' }}
                    domain={[0, 100]}
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
                    yAxisId="left"
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Temperatura (°C)"
                    dot={{ fill: '#ef4444', r: 4 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="humedad" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Humedad (%)"
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span className="text-slate-600">Temp. Actual</span>
                </div>
                <div className="text-slate-900">28.5°C</div>
                <div className="text-green-600">Óptimo</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-600">Humedad</span>
                </div>
                <div className="text-slate-900">65%</div>
                <div className="text-green-600">Óptimo</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-600">Ventilación</span>
                </div>
                <div className="text-slate-900">4.2 m/s</div>
                <div className="text-green-600">Normal</div>
              </div>

              <div className="border border-amber-200 bg-amber-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-600">Alertas</span>
                </div>
                <div className="text-slate-900">2</div>
                <div className="text-amber-600">Fuera rango</div>
              </div>
            </div>

            <div>
              <h3 className="text-slate-700 mb-3">Causas de Mortalidad (Últimos 30 días)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={mortalityCausesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis dataKey="causa" type="category" stroke="#64748b" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="cantidad" name="Cantidad" radius={[0, 4, 4, 0]}>
                    {mortalityCausesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        index === 0 ? '#ef4444' :
                        index === 1 ? '#f59e0b' :
                        index === 2 ? '#eab308' :
                        '#94a3b8'
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Panel de Bioseguridad */}
          <div>
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="text-slate-700">Panel de Bioseguridad</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                {biosecurityData.map((item) => (
                  <div key={item.item} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      {item.status === "completed" ? (
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      ) : item.status === "alert" ? (
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-slate-300 rounded-full mt-0.5" />
                      )}
                      <div>
                        <div className="text-slate-700">{item.item}</div>
                        <div className={`text-${item.status === 'alert' ? 'red' : 'slate'}-500`}>
                          {item.date}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        item.status === "completed" ? "default" :
                        item.status === "alert" ? "destructive" :
                        "secondary"
                      }
                    >
                      {item.status === "completed" ? "OK" :
                       item.status === "alert" ? "Alerta" : "Pendiente"}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-slate-700 mb-3">Programa de Vacunación</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Newcastle</span>
                    <Badge variant="default">Completo</Badge>
                  </div>
                  <div className="text-slate-500">Día 1 - 5,200 aves</div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-slate-600">Gumboro</span>
                    <Badge variant="default">Completo</Badge>
                  </div>
                  <div className="text-slate-500">Día 14 - 5,180 aves</div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-slate-600">Bronquitis</span>
                    <Badge variant="secondary">Programado</Badge>
                  </div>
                  <div className="text-slate-500">Día 42 - Pendiente</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
