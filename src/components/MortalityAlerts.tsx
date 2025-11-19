import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import { AlertTriangle, TrendingUp, DollarSign, Activity } from "lucide-react";
import { Badge } from "./ui/badge";
import { useFilters } from "../lib/FilterContext";
import { aplicarFiltros, calcularMortalidad } from "../lib/calculations";

export function MortalityAlerts() {
  const { filtros } = useFilters();
  const { lotesFiltrados, registrosFiltrados } = aplicarFiltros(filtros);
  
  // Agrupar registros por día del lote para mostrar mortalidad diaria
  const mortalityDataMap = new Map<number, { avesVivas: number[], dia: number }>();
  
  registrosFiltrados.forEach(registro => {
    const lote = lotesFiltrados.find(l => l.loteId === registro.loteId);
    if (!lote) return;
    
    const fechaInicio = new Date(lote.fechaInicio);
    const fechaRegistro = new Date(registro.fecha);
    const diaLote = Math.floor((fechaRegistro.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
    
    if (!mortalityDataMap.has(diaLote)) {
      mortalityDataMap.set(diaLote, { avesVivas: [], dia: diaLote });
    }
    mortalityDataMap.get(diaLote)!.avesVivas.push(registro.avesVivas);
  });
  
  // Calcular mortalidad por día
  const mortalityDailyData = Array.from(mortalityDataMap.values())
    .map(({ dia, avesVivas }) => {
      const loteBase = lotesFiltrados[0]; // Usar primer lote como referencia
      if (!loteBase) return null;
      
      const avesVivasPromedio = avesVivas.reduce((sum, val) => sum + val, 0) / avesVivas.length;
      const avesMuertas = loteBase.avesIniciales - avesVivasPromedio;
      const mortalidadPorcentaje = (avesMuertas / loteBase.avesIniciales) * 100;
      
      // Límite crítico según edad
      let limite = 2.0;
      if (dia > 21) limite = 1.0;
      else if (dia > 14) limite = 1.2;
      else if (dia > 7) limite = 1.5;
      
      return {
        day: dia,
        mortalidad: Number(mortalidadPorcentaje.toFixed(2)),
        limite,
        alerta: mortalidadPorcentaje > limite * 1.5
      };
    })
    .filter(item => item !== null)
    .sort((a, b) => (a?.day || 0) - (b?.day || 0))
    .slice(0, 10); // Mostrar solo los primeros 10 puntos
  
  // Calcular métricas
  const mortalidadTotal = calcularMortalidad(lotesFiltrados, registrosFiltrados);
  const avesIniciales = lotesFiltrados.reduce((sum, l) => sum + l.avesIniciales, 0);
  const avesVivas = registrosFiltrados.length > 0
    ? registrosFiltrados.reduce((acc, r) => {
        const existing = acc.find(a => a.loteId === r.loteId);
        if (!existing || new Date(r.fecha) > new Date(existing.fecha)) {
          return [...acc.filter(a => a.loteId !== r.loteId), r];
        }
        return acc;
      }, [] as typeof registrosFiltrados).reduce((sum, r) => sum + r.avesVivas, 0)
    : 0;
  const avesPerdidas = avesIniciales - avesVivas;
  const impactoEconomico = avesPerdidas * 5;
  
  // Detectar alertas
  const alertas = mortalityDailyData.filter(d => d?.alerta).length;
  
  // Última mortalidad diaria
  const ultimaMortalidad = mortalityDailyData.length > 0 
    ? mortalityDailyData[mortalityDailyData.length - 1]?.mortalidad || 0
    : 0;
  
  // Generar alertas recientes (mock basado en datos reales)
  const recentAlerts = [];
  
  if (ultimaMortalidad > 1.5) {
    recentAlerts.push({
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: "Mortalidad elevada",
      value: `${ultimaMortalidad.toFixed(1)}%`,
      description: `Supera límite esperado`,
      severity: "high" as const,
      action: "Revisión sanitaria programada",
    });
  }
  
  const tempPromedio = registrosFiltrados.length > 0
    ? registrosFiltrados.reduce((sum, r) => sum + r.temperatura, 0) / registrosFiltrados.length
    : 0;
  
  if (tempPromedio > 30) {
    recentAlerts.push({
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: "Temperatura fuera de rango",
      value: `${tempPromedio.toFixed(1)}°C`,
      description: "Por encima del rango óptimo",
      severity: "medium" as const,
      action: "Ventilación ajustada",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortalidad y Alertas Operativas</CardTitle>
        <p className="text-slate-500">
          Detección de aumentos anormales y monitoreo crítico
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gráfico de Mortalidad */}
          <div>
            <h3 className="text-slate-700 mb-3">Mortalidad Diaria vs Límite Máximo</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mortalityDailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#64748b"
                  label={{ value: 'Día del lote', position: 'insideBottom', offset: -5 }}
                />
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
                <ReferenceLine y={1.0} stroke="#ef4444" strokeDasharray="3 3" label="Límite crítico" />
                <Bar dataKey="mortalidad" name="Mortalidad Diaria (%)" radius={[4, 4, 0, 0]}>
                  {mortalityDailyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.alerta ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Métricas de Mortalidad */}
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Mortalidad Actual</span>
              </div>
              <div className="text-slate-900">{ultimaMortalidad.toFixed(1)}%</div>
              <div className={ultimaMortalidad < 1.0 ? "text-green-600" : "text-amber-600"}>
                {ultimaMortalidad < 1.0 ? "Bajo límite" : "Normal"}
              </div>
            </div>

            <div className="border border-amber-200 bg-amber-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-slate-600">Acumulada</span>
              </div>
              <div className="text-slate-900">{mortalidadTotal.toFixed(1)}%</div>
              <div className="text-amber-600">{avesPerdidas.toLocaleString()} aves perdidas</div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-slate-600">Alertas Detectadas</span>
              </div>
              <div className="text-slate-900">{alertas} evento{alertas !== 1 ? 's' : ''}</div>
              <div className="text-slate-500">Período actual</div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-red-500" />
                <span className="text-slate-600">Impacto Económico</span>
              </div>
              <div className="text-slate-900">${impactoEconomico.toLocaleString()}</div>
              <div className="text-red-600">{avesPerdidas} aves × $5/ave</div>
            </div>
          </div>

          {/* Panel de Alertas Recientes */}
          {recentAlerts.length > 0 && (
            <div>
              <h3 className="text-slate-700 mb-3">Alertas Operativas Recientes</h3>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`border-l-4 ${
                      alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                      alert.severity === 'medium' ? 'border-amber-500 bg-amber-50' :
                      'border-blue-500 bg-blue-50'
                    } rounded-lg p-4`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`w-4 h-4 ${
                            alert.severity === 'high' ? 'text-red-600' :
                            alert.severity === 'medium' ? 'text-amber-600' :
                            'text-blue-600'
                          }`} />
                          <span className="text-slate-900">{alert.type}</span>
                          <Badge 
                            variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                          >
                            {alert.value}
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-2">{alert.description}</p>
                        <p className="text-slate-500">
                          <strong>Acción tomada:</strong> {alert.action}
                        </p>
                      </div>
                      <div className="text-slate-500 ml-4">{alert.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
