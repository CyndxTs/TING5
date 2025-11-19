import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { useFilters } from "../lib/FilterContext";
import { 
  aplicarFiltros,
  filtrarPeriodoAnterior,
  calcularMortalidad, 
  calcularFCR, 
  calcularPesoPromedio,
  calcularConsumoAcumulado,
  calcularTemperaturaPromedio,
  calcularEdadLote,
  calcularIndiceProductividad,
  calcularProyeccionPeso
} from "../lib/calculations";
import { lotes, registrosDiarios } from "../lib/data";

export function KPISection() {
  const { filtros } = useFilters();
  const { lotesFiltrados, registrosFiltrados } = aplicarFiltros(filtros);
  
  // Calcular KPIs del período actual
  const mortalidad = calcularMortalidad(lotesFiltrados, registrosFiltrados);
  const fcr = calcularFCR(lotesFiltrados, registrosFiltrados);
  const pesoPromedio = calcularPesoPromedio(registrosFiltrados);
  const consumoAcumulado = calcularConsumoAcumulado(lotesFiltrados, registrosFiltrados);
  const temperaturaPromedio = calcularTemperaturaPromedio(registrosFiltrados);
  const edadLote = calcularEdadLote(lotesFiltrados);
  const indiceProductividad = calcularIndiceProductividad(pesoPromedio, mortalidad, fcr, edadLote);
  const proyeccionPeso = calcularProyeccionPeso(lotesFiltrados, registrosFiltrados);
  
  // Calcular KPIs del período anterior para comparación
  const loteIds = lotesFiltrados.map(l => l.loteId);
  const registrosParaAnterior = registrosDiarios.filter(r => loteIds.includes(r.loteId));
  const registrosAnteriores = filtrarPeriodoAnterior(registrosParaAnterior, filtros.periodo);
  
  const mortalidadAnterior = calcularMortalidad(lotesFiltrados, registrosAnteriores);
  const fcrAnterior = calcularFCR(lotesFiltrados, registrosAnteriores);
  const pesoPromedioAnterior = calcularPesoPromedio(registrosAnteriores);
  const consumoAnterior = calcularConsumoAcumulado(lotesFiltrados, registrosAnteriores);
  const tempAnterior = calcularTemperaturaPromedio(registrosAnteriores);
  const ipAnterior = calcularIndiceProductividad(pesoPromedioAnterior, mortalidadAnterior, fcrAnterior, edadLote);
  const proyeccionAnterior = calcularProyeccionPeso(lotesFiltrados, registrosAnteriores);
  
  // Calcular diferencias
  const diffMortalidad = mortalidad - mortalidadAnterior;
  const diffFCR = fcr - fcrAnterior;
  const diffPeso = pesoPromedio - pesoPromedioAnterior;
  const diffConsumo = consumoAcumulado - consumoAnterior;
  const diffTemp = temperaturaPromedio - tempAnterior;
  const diffIP = indiceProductividad - ipAnterior;
  const diffProyeccion = proyeccionPeso - proyeccionAnterior;
  
  // Información del lote seleccionado
  const totalAves = lotesFiltrados.reduce((sum, l) => sum + l.avesIniciales, 0);
  
  // Generar texto descriptivo de filtros
  const textoGranja = filtros.granja === "all" ? "TODAS LAS GRANJAS" : `Granja ${filtros.granja}`;
  const textoGalpon = filtros.galpon === "all" ? "TODOS LOS GALPONES" : `Galpón ${filtros.galpon}`;
  const textoPeriodo = filtros.periodo === "today" ? "Hoy" :
                       filtros.periodo === "week" ? "Última Semana" :
                       filtros.periodo === "month" ? "Último Mes" :
                       "Todo el Lote";
  
  const textoLote = filtros.lote === "all" 
    ? `${lotesFiltrados.length} lotes`
    : `Lote ${filtros.lote}`;

  const kpis = [
    {
      title: "Mortalidad Acumulada",
      value: mortalidad.toFixed(1),
      target: "< 3.5%",
      change: `${diffMortalidad >= 0 ? '+' : ''}${diffMortalidad.toFixed(1)}%`,
      trend: diffMortalidad <= 0 ? "down" : "up",
      status: mortalidad < 3.5 ? "good" : "warning",
      unit: "%",
    },
    {
      title: "Conversión Alimenticia (FCR)",
      value: fcr.toFixed(2),
      target: "< 1.75",
      change: `${diffFCR >= 0 ? '+' : ''}${diffFCR.toFixed(2)}`,
      trend: diffFCR <= 0 ? "up" : "down",
      status: fcr < 1.75 ? "good" : "warning",
      unit: "kg/kg",
    },
    {
      title: "Peso Promedio Actual",
      value: Math.round(pesoPromedio).toLocaleString(),
      target: "2,150 g",
      change: `${diffPeso >= 0 ? '+' : ''}${Math.round(diffPeso)}g`,
      trend: diffPeso >= 0 ? "up" : "down",
      status: pesoPromedio >= 2150 ? "good" : "warning",
      unit: "g",
    },
    {
      title: "Índice de Productividad (IP)",
      value: Math.round(indiceProductividad).toString(),
      target: "> 350",
      change: `${diffIP >= 0 ? '+' : ''}${Math.round(diffIP)}`,
      trend: diffIP >= 0 ? "up" : "down",
      status: indiceProductividad > 350 ? "good" : "warning",
      unit: "pts",
    },
    {
      title: "Consumo Acum. Alimento",
      value: consumoAcumulado.toFixed(2),
      target: "3.70 kg",
      change: `${diffConsumo >= 0 ? '+' : ''}${diffConsumo.toFixed(2)}`,
      trend: "neutral",
      status: "good",
      unit: "kg/ave",
    },
    {
      title: "Temperatura Promedio",
      value: temperaturaPromedio.toFixed(1),
      target: "26-30°C",
      change: `${diffTemp >= 0 ? '+' : ''}${diffTemp.toFixed(1)}°C`,
      trend: "neutral",
      status: temperaturaPromedio >= 26 && temperaturaPromedio <= 30 ? "good" : "warning",
      unit: "°C",
    },
    {
      title: "Edad del Lote",
      value: edadLote.toString(),
      target: "42 días meta",
      change: `${42 - edadLote} días rest.`,
      trend: "neutral",
      status: "info",
      unit: "días",
    },
    {
      title: "Proyección Peso vs Meta",
      value: proyeccionPeso.toFixed(1),
      target: "> 98%",
      change: `${diffProyeccion >= 0 ? '+' : ''}${diffProyeccion.toFixed(1)}%`,
      trend: diffProyeccion >= 0 ? "up" : "down",
      status: proyeccionPeso >= 100 ? "excellent" : proyeccionPeso >= 98 ? "good" : "warning",
      unit: "%",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Indicadores Clave de Rendimiento (KPIs)</CardTitle>
            <p className="text-slate-500 mt-1">
              {textoLote} | {textoGranja} - {textoGalpon} | {totalAves.toLocaleString()} aves | {textoPeriodo}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700">
              {indiceProductividad > 380 ? "Rendimiento General: Óptimo" : 
               indiceProductividad > 350 ? "Rendimiento General: Bueno" : 
               "Rendimiento General: Mejorable"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : null;
            
            return (
              <div 
                key={kpi.title} 
                className={`border-2 rounded-lg p-4 ${
                  kpi.status === "excellent" ? "border-green-300 bg-green-50" :
                  kpi.status === "good" ? "border-blue-200 bg-blue-50" :
                  kpi.status === "warning" ? "border-amber-300 bg-amber-50" :
                  "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-slate-600">{kpi.title}</h3>
                  {kpi.status === "excellent" && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {kpi.status === "warning" && (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                
                <div className="text-slate-900 mb-1">
                  {kpi.value}
                  <span className="text-slate-500 ml-1">{kpi.unit}</span>
                </div>
                
                <div className="text-slate-500 mb-2">
                  Meta: {kpi.target}
                </div>
                
                {TrendIcon && (
                  <div className="flex items-center gap-1">
                    <TrendIcon 
                      className={`w-4 h-4 ${
                        kpi.trend === "up" ? "text-green-600" : 
                        kpi.trend === "down" ? "text-red-600" : 
                        "text-slate-400"
                      }`} 
                    />
                    <span 
                      className={`${
                        kpi.trend === "up" ? "text-green-600" : 
                        kpi.trend === "down" ? "text-red-600" : 
                        "text-slate-500"
                      }`}
                    >
                      {kpi.change}
                    </span>
                    <span className="text-slate-400">vs anterior</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}