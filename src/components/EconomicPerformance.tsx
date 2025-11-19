import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useFilters } from "../lib/FilterContext";
import { aplicarFiltros, calcularCostosDesglosados, calcularPesoPromedio } from "../lib/calculations";

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export function EconomicPerformance() {
  const { filtros } = useFilters();
  const { lotesFiltrados, registrosFiltrados, costosFiltrados } = aplicarFiltros(filtros);
  
  // Calcular costos
  const { costos: costBreakdownData, total: totalCost } = calcularCostosDesglosados(costosFiltrados);
  
  // Calcular ingresos estimados
  const pesoPromedio = calcularPesoPromedio(registrosFiltrados) / 1000; // convertir a kg
  const avesVivas = registrosFiltrados.length > 0 
    ? registrosFiltrados.reduce((acc, r) => {
        const existing = acc.find(a => a.loteId === r.loteId);
        if (!existing || new Date(r.fecha) > new Date(existing.fecha)) {
          return [...acc.filter(a => a.loteId !== r.loteId), r];
        }
        return acc;
      }, [] as typeof registrosFiltrados).reduce((sum, r) => sum + r.avesVivas, 0)
    : 0;
  
  const precioVenta = lotesFiltrados[0]?.precioVentaKg || 0.78;
  const kgTotales = Math.round(avesVivas * pesoPromedio);
  const estimatedRevenue = Math.round(kgTotales * precioVenta);
  const margin = estimatedRevenue - totalCost;
  const marginPercentage = estimatedRevenue > 0 ? ((margin / estimatedRevenue) * 100).toFixed(1) : "0.0";
  const costoPorKg = kgTotales > 0 ? (totalCost / kgTotales).toFixed(2) : "0.00";
  
  const avesIniciales = lotesFiltrados.reduce((sum, l) => sum + l.avesIniciales, 0);
  const avesMuertas = avesIniciales - avesVivas;
  const perdidasMortalidad = avesMuertas * 5; // estimación $5 por ave

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento Económico del Lote</CardTitle>
        <p className="text-slate-500">
          Evaluación de rentabilidad e impacto financiero
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* KPIs Económicos Principales */}
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-slate-600">Costo Total</span>
              </div>
              <div className="text-slate-900">${totalCost.toLocaleString()}</div>
              <div className="text-slate-500">Lote completo</div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-slate-600">Ingreso Est.</span>
              </div>
              <div className="text-slate-900">${estimatedRevenue.toLocaleString()}</div>
              <div className="text-slate-500">Proyección</div>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-slate-600">Margen Op.</span>
              </div>
              <div className="text-slate-900">${margin.toLocaleString()}</div>
              <div className="text-green-600">+{marginPercentage}%</div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-slate-600" />
                <span className="text-slate-600">Costo/kg Prod.</span>
              </div>
              <div className="text-slate-900">${costoPorKg}/kg</div>
              <div className="text-green-600">Eficiente</div>
            </div>
          </div>

          {/* Gráfico de Desglose de Costos */}
          <div>
            <h3 className="text-slate-700 mb-3">Desglose de Costos del Lote</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={costBreakdownData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="category" type="category" stroke="#64748b" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Costo']}
                />
                <Bar dataKey="cost" name="Costo ($)" radius={[0, 4, 4, 0]}>
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla Detallada de Costos */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 text-slate-700">Categoría</th>
                  <th className="text-right p-3 text-slate-700">Monto</th>
                  <th className="text-right p-3 text-slate-700">%</th>
                  <th className="text-right p-3 text-slate-700">$/ave</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdownData.map((item, index) => (
                  <tr key={item.category} className="border-t border-slate-100">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[index] }}></div>
                        {item.category}
                      </div>
                    </td>
                    <td className="text-right p-3 text-slate-900">${item.cost.toLocaleString()}</td>
                    <td className="text-right p-3 text-slate-600">{item.percentage}%</td>
                    <td className="text-right p-3 text-slate-600">${(item.cost / 5200).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-300 bg-slate-50">
                  <td className="p-3 text-slate-900">Total</td>
                  <td className="text-right p-3 text-slate-900">${totalCost.toLocaleString()}</td>
                  <td className="text-right p-3 text-slate-900">100%</td>
                  <td className="text-right p-3 text-slate-900">${(totalCost / 5200).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="text-slate-700 mb-3">Proyección de Ingresos</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Aves vivas estimadas:</span>
                  <span className="text-slate-900">{avesVivas.toLocaleString()} aves</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Peso promedio proyectado:</span>
                  <span className="text-slate-900">{pesoPromedio.toFixed(3)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Kg totales:</span>
                  <span className="text-slate-900">{kgTotales.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Precio de venta:</span>
                  <span className="text-slate-900">${precioVenta.toFixed(2)}/kg</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-700">Ingreso total:</span>
                  <span className="text-green-700">${estimatedRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="text-slate-700 mb-3">Indicadores de Rentabilidad</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Margen operativo:</span>
                    <span className="text-green-700">{marginPercentage}%</span>
                  </div>
                  <div className="text-slate-900">${margin.toLocaleString()}</div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Punto de equilibrio:</span>
                    <span className="text-blue-700">$0.55/kg</span>
                  </div>
                  <div className="text-green-600">Superado ampliamente</div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600">Pérdidas por mortalidad:</span>
                    <span className="text-red-600">-${perdidasMortalidad.toLocaleString()}</span>
                  </div>
                  <div className="text-slate-500">{avesMuertas.toLocaleString()} aves × $5/ave</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}