import { lotes, registrosDiarios, costos, Lote, RegistroDiario, Costo } from "./data";

// ============================================
// TIPOS PARA FILTROS
// ============================================

export interface Filtros {
  granja: string; // "all" | "NORTE" | "SUR" | "ESTE"
  galpon: string; // "all" | "1" | "2" | "3"
  lote: string; // "all" | loteId específico
  periodo: string; // "today" | "week" | "month" | "lot"
}

// ============================================
// UTILIDADES DE FECHA
// ============================================

export function getFechaMaxima(): Date {
  const fechas = registrosDiarios.map(r => new Date(r.fecha));
  return new Date(Math.max(...fechas.map(f => f.getTime())));
}

export function filtrarPorPeriodo(registros: RegistroDiario[], periodo: string): RegistroDiario[] {
  const fechaRef = getFechaMaxima();
  
  return registros.filter(r => {
    const fechaRegistro = new Date(r.fecha);
    const diffDias = Math.floor((fechaRef.getTime() - fechaRegistro.getTime()) / (1000 * 60 * 60 * 24));
    
    switch(periodo) {
      case "today":
        return diffDias === 0;
      case "week":
        return diffDias <= 7;
      case "month":
        return diffDias <= 30;
      case "lot":
      default:
        return true;
    }
  });
}

export function filtrarPeriodoAnterior(registros: RegistroDiario[], periodo: string): RegistroDiario[] {
  const fechaRef = getFechaMaxima();
  
  return registros.filter(r => {
    const fechaRegistro = new Date(r.fecha);
    const diffDias = Math.floor((fechaRef.getTime() - fechaRegistro.getTime()) / (1000 * 60 * 60 * 24));
    
    switch(periodo) {
      case "today":
        // Anterior = ayer
        return diffDias === 1;
      case "week":
        // Anterior = semana anterior (días 8-14)
        return diffDias > 7 && diffDias <= 14;
      case "month":
        // Anterior = mes anterior (días 31-60)
        return diffDias > 30 && diffDias <= 60;
      case "lot":
        // Para "lot", usamos la primera mitad del lote como "anterior"
        const maxDiff = Math.max(...registros.map(reg => {
          const fd = new Date(reg.fecha);
          return Math.floor((fechaRef.getTime() - fd.getTime()) / (1000 * 60 * 60 * 24));
        }));
        const mitad = maxDiff / 2;
        return diffDias > mitad;
      default:
        return false;
    }
  });
}

// ============================================
// FUNCIONES DE FILTRADO
// ============================================

export function aplicarFiltros(filtros: Filtros) {
  // Filtrar lotes
  let lotesFiltrados = lotes;
  
  if (filtros.granja !== "all") {
    lotesFiltrados = lotesFiltrados.filter(l => l.granja === filtros.granja);
  }
  
  if (filtros.galpon !== "all") {
    lotesFiltrados = lotesFiltrados.filter(l => l.galpon.toString() === filtros.galpon);
  }
  
  if (filtros.lote !== "all") {
    lotesFiltrados = lotesFiltrados.filter(l => l.loteId === filtros.lote);
  }
  
  // Filtrar registros por lotes seleccionados
  const loteIds = lotesFiltrados.map(l => l.loteId);
  let registrosFiltrados = registrosDiarios.filter(r => loteIds.includes(r.loteId));
  
  // Aplicar filtro de período
  registrosFiltrados = filtrarPorPeriodo(registrosFiltrados, filtros.periodo);
  
  // Filtrar costos
  let costosFiltrados = costos.filter(c => loteIds.includes(c.loteId));
  
  return { lotesFiltrados, registrosFiltrados, costosFiltrados };
}

// ============================================
// CÁLCULOS DE KPIs
// ============================================

export function calcularMortalidad(lotesFiltrados: Lote[], registrosFiltrados: RegistroDiario[]) {
  if (lotesFiltrados.length === 0 || registrosFiltrados.length === 0) return 0;
  
  const avesInicialesTotales = lotesFiltrados.reduce((sum, l) => sum + l.avesIniciales, 0);
  
  // Obtener el último registro de cada lote para saber cuántas aves vivas hay
  const avesVivasTotales = lotesFiltrados.reduce((sum, lote) => {
    const registrosDelLote = registrosFiltrados.filter(r => r.loteId === lote.loteId);
    if (registrosDelLote.length === 0) return sum;
    
    // Obtener el registro más reciente
    const ultimoRegistro = registrosDelLote.reduce((prev, current) => 
      new Date(current.fecha) > new Date(prev.fecha) ? current : prev
    );
    
    return sum + ultimoRegistro.avesVivas;
  }, 0);
  
  const avesMuertas = avesInicialesTotales - avesVivasTotales;
  return (avesMuertas / avesInicialesTotales) * 100;
}

export function calcularFCR(lotesFiltrados: Lote[], registrosFiltrados: RegistroDiario[]) {
  if (lotesFiltrados.length === 0 || registrosFiltrados.length === 0) return 0;
  
  let alimentoTotalKg = 0;
  let pesoGanadoTotalKg = 0;
  
  lotesFiltrados.forEach(lote => {
    const registrosDelLote = registrosFiltrados.filter(r => r.loteId === lote.loteId);
    if (registrosDelLote.length === 0) return;
    
    const ultimoRegistro = registrosDelLote.reduce((prev, current) => 
      new Date(current.fecha) > new Date(prev.fecha) ? current : prev
    );
    
    // Alimento consumido por este lote
    alimentoTotalKg += ultimoRegistro.alimentoConsumidoKg;
    
    // Peso ganado = (peso actual - peso inicial) * aves vivas / 1000 para convertir a kg
    const pesoGanado = ((ultimoRegistro.pesoPromedioMuestra - lote.pesoInicialPromedio) * ultimoRegistro.avesVivas) / 1000;
    pesoGanadoTotalKg += pesoGanado;
  });
  
  if (pesoGanadoTotalKg === 0) return 0;
  return alimentoTotalKg / pesoGanadoTotalKg;
}

export function calcularPesoPromedio(registrosFiltrados: RegistroDiario[]) {
  if (registrosFiltrados.length === 0) return 0;
  
  // Agrupar por lote y obtener el último registro de cada uno
  const loteIds = [...new Set(registrosFiltrados.map(r => r.loteId))];
  const pesosFinales: number[] = [];
  
  loteIds.forEach(loteId => {
    const registrosDelLote = registrosFiltrados.filter(r => r.loteId === loteId);
    const ultimoRegistro = registrosDelLote.reduce((prev, current) => 
      new Date(current.fecha) > new Date(prev.fecha) ? current : prev
    );
    pesosFinales.push(ultimoRegistro.pesoPromedioMuestra);
  });
  
  return pesosFinales.reduce((sum, p) => sum + p, 0) / pesosFinales.length;
}

export function calcularConsumoAcumulado(lotesFiltrados: Lote[], registrosFiltrados: RegistroDiario[]) {
  if (lotesFiltrados.length === 0 || registrosFiltrados.length === 0) return 0;
  
  let alimentoTotal = 0;
  let avesVivastotales = 0;
  
  lotesFiltrados.forEach(lote => {
    const registrosDelLote = registrosFiltrados.filter(r => r.loteId === lote.loteId);
    if (registrosDelLote.length === 0) return;
    
    const ultimoRegistro = registrosDelLote.reduce((prev, current) => 
      new Date(current.fecha) > new Date(prev.fecha) ? current : prev
    );
    
    alimentoTotal += ultimoRegistro.alimentoConsumidoKg;
    avesVivastotales += ultimoRegistro.avesVivas;
  });
  
  if (avesVivastotales === 0) return 0;
  return alimentoTotal / avesVivastotales;
}

export function calcularTemperaturaPromedio(registrosFiltrados: RegistroDiario[]) {
  if (registrosFiltrados.length === 0) return 0;
  
  const temperaturas = registrosFiltrados.map(r => r.temperatura);
  return temperaturas.reduce((sum, t) => sum + t, 0) / temperaturas.length;
}

export function calcularEdadLote(lotesFiltrados: Lote[]) {
  if (lotesFiltrados.length === 0) return 0;
  
  const fechaRef = getFechaMaxima();
  
  // Si hay un solo lote, calcular su edad
  if (lotesFiltrados.length === 1) {
    const fechaInicio = new Date(lotesFiltrados[0].fechaInicio);
    return Math.floor((fechaRef.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  // Si hay múltiples lotes, promediar sus edades
  const edades = lotesFiltrados.map(lote => {
    const fechaInicio = new Date(lote.fechaInicio);
    return Math.floor((fechaRef.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  });
  
  return Math.round(edades.reduce((sum, e) => sum + e, 0) / edades.length);
}

export function calcularIndiceProductividad(
  pesoPromedio: number, 
  mortalidad: number, 
  fcr: number, 
  edadDias: number
) {
  // Fórmula estándar IP = ((viabilidad% × peso kg) / (edad días × FCR)) × 100
  const viabilidad = 100 - mortalidad;
  const pesoKg = pesoPromedio / 1000;
  
  if (edadDias === 0 || fcr === 0) return 0;
  
  return ((viabilidad * pesoKg) / (edadDias * fcr)) * 100;
}

export function calcularProyeccionPeso(lotesFiltrados: Lote[], registrosFiltrados: RegistroDiario[]) {
  if (lotesFiltrados.length === 0 || registrosFiltrados.length === 0) return 0;
  
  // Calcular peso promedio actual y meta
  const pesoActual = calcularPesoPromedio(registrosFiltrados);
  const edadActual = calcularEdadLote(lotesFiltrados);
  const metaPeso = lotesFiltrados[0]?.metaPesoFinal || 2800;
  
  if (edadActual === 0) return 0;
  
  // Proyección lineal simple al día 42
  const pesoProyectado = (pesoActual / edadActual) * 42;
  
  return (pesoProyectado / metaPeso) * 100;
}

export function calcularCostosDesglosados(costosFiltrados: Costo[]) {
  const desglose = {
    ALIMENTO: 0,
    POLLITO_BB: 0,
    GAS_ENERGIA: 0,
    VACUNAS: 0,
    MANO_OBRA: 0,
    OTROS: 0
  };
  
  costosFiltrados.forEach(c => {
    desglose[c.categoria] += c.monto;
  });
  
  const total = Object.values(desglose).reduce((sum, val) => sum + val, 0);
  
  return {
    costos: [
      { category: "Alimento", cost: desglose.ALIMENTO, percentage: total > 0 ? Math.round((desglose.ALIMENTO / total) * 100) : 0 },
      { category: "Pollito BB", cost: desglose.POLLITO_BB, percentage: total > 0 ? Math.round((desglose.POLLITO_BB / total) * 100) : 0 },
      { category: "Gas/Energía", cost: desglose.GAS_ENERGIA, percentage: total > 0 ? Math.round((desglose.GAS_ENERGIA / total) * 100) : 0 },
      { category: "Vacunas/Med.", cost: desglose.VACUNAS, percentage: total > 0 ? Math.round((desglose.VACUNAS / total) * 100) : 0 },
      { category: "Mano de Obra", cost: desglose.MANO_OBRA, percentage: total > 0 ? Math.round((desglose.MANO_OBRA / total) * 100) : 0 },
      { category: "Otros", cost: desglose.OTROS, percentage: total > 0 ? Math.round((desglose.OTROS / total) * 100) : 0 },
    ],
    total
  };
}