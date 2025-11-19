// ============================================
// TIPOS DE DATOS
// ============================================

export type Granja = "NORTE" | "SUR" | "ESTE";
export type EstadoLote = "ACTIVO" | "CERRADO";
export type CategoriaGasto = "ALIMENTO" | "POLLITO_BB" | "GAS_ENERGIA" | "VACUNAS" | "MANO_OBRA" | "OTROS";

export interface Lote {
  loteId: string;
  granja: Granja;
  galpon: number;
  fechaInicio: string; // ISO string para LocalDateTime
  avesIniciales: number;
  lineaGenetica: string;
  pesoInicialPromedio: number; // gramos
  metaPesoFinal: number; // gramos al día 42
  precioVentaKg?: number; // USD por kg (opcional, usa config si no está)
  estado: EstadoLote;
}

export interface RegistroDiario {
  fecha: string; // ISO string
  loteId: string;
  avesVivas: number;
  pesoPromedioMuestra: number; // gramos
  alimentoConsumidoKg: number; // kg consumidos ACUMULADO
  consumoAguaLitros: number;
  temperatura: number; // °C
  humedad: number; // %
}

export interface Costo {
  loteId: string;
  categoria: CategoriaGasto;
  monto: number;
  fecha: string;
  descripcion: string;
}

// ============================================
// DATOS HARDCODEADOS
// ============================================

export const lotes: Lote[] = [
  // Granja SUR
  {
    loteId: "L-2025-003",
    granja: "SUR",
    galpon: 1,
    fechaInicio: "2024-10-14T08:00:00",
    avesIniciales: 5200,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-006",
    granja: "SUR",
    galpon: 2,
    fechaInicio: "2024-10-10T08:00:00",
    avesIniciales: 4900,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-007",
    granja: "SUR",
    galpon: 3,
    fechaInicio: "2024-10-12T08:00:00",
    avesIniciales: 5100,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  
  // Granja NORTE
  {
    loteId: "L-2025-001",
    granja: "NORTE",
    galpon: 1,
    fechaInicio: "2024-10-01T08:00:00",
    avesIniciales: 4800,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "CERRADO"
  },
  {
    loteId: "L-2025-002",
    granja: "NORTE",
    galpon: 2,
    fechaInicio: "2024-10-07T08:00:00",
    avesIniciales: 5000,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-005",
    granja: "NORTE",
    galpon: 3,
    fechaInicio: "2024-10-18T08:00:00",
    avesIniciales: 5100,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-008",
    granja: "NORTE",
    galpon: 4,
    fechaInicio: "2024-10-15T08:00:00",
    avesIniciales: 4950,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-009",
    granja: "NORTE",
    galpon: 5,
    fechaInicio: "2024-10-22T08:00:00",
    avesIniciales: 5050,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  
  // Granja ESTE
  {
    loteId: "L-2025-004",
    granja: "ESTE",
    galpon: 1,
    fechaInicio: "2024-10-20T08:00:00",
    avesIniciales: 4500,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-010",
    granja: "ESTE",
    galpon: 2,
    fechaInicio: "2024-10-16T08:00:00",
    avesIniciales: 4700,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-011",
    granja: "ESTE",
    galpon: 3,
    fechaInicio: "2024-10-19T08:00:00",
    avesIniciales: 4850,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-012",
    granja: "ESTE",
    galpon: 4,
    fechaInicio: "2024-10-13T08:00:00",
    avesIniciales: 4600,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  },
  {
    loteId: "L-2025-013",
    granja: "ESTE",
    galpon: 5,
    fechaInicio: "2024-10-17T08:00:00",
    avesIniciales: 4750,
    lineaGenetica: "Cobb 500",
    pesoInicialPromedio: 42,
    metaPesoFinal: 2800,
    precioVentaKg: 0.78,
    estado: "ACTIVO"
  }
];

export const registrosDiarios: RegistroDiario[] = [
  // ============================================
  // Lote L-2025-003 (Granja SUR, Galpón 1) - 35 días
  // ============================================
  { fecha: "2024-10-14T08:00:00", loteId: "L-2025-003", avesVivas: 5200, pesoPromedioMuestra: 42, alimentoConsumidoKg: 52, consumoAguaLitros: 156, temperatura: 32.0, humedad: 60 },
  { fecha: "2024-10-17T08:00:00", loteId: "L-2025-003", avesVivas: 5195, pesoPromedioMuestra: 95, alimentoConsumidoKg: 210, consumoAguaLitros: 520, temperatura: 31.5, humedad: 61 },
  { fecha: "2024-10-21T08:00:00", loteId: "L-2025-003", avesVivas: 5180, pesoPromedioMuestra: 165, alimentoConsumidoKg: 520, consumoAguaLitros: 1040, temperatura: 30.0, humedad: 62 },
  { fecha: "2024-10-24T08:00:00", loteId: "L-2025-003", avesVivas: 5175, pesoPromedioMuestra: 280, alimentoConsumidoKg: 850, consumoAguaLitros: 1650, temperatura: 29.5, humedad: 64 },
  { fecha: "2024-10-28T08:00:00", loteId: "L-2025-003", avesVivas: 5165, pesoPromedioMuestra: 465, alimentoConsumidoKg: 1240, consumoAguaLitros: 2480, temperatura: 28.5, humedad: 65 },
  { fecha: "2024-11-01T08:00:00", loteId: "L-2025-003", avesVivas: 5160, pesoPromedioMuestra: 705, alimentoConsumidoKg: 1780, consumoAguaLitros: 3560, temperatura: 27.8, humedad: 63 },
  { fecha: "2024-11-04T08:00:00", loteId: "L-2025-003", avesVivas: 5150, pesoPromedioMuestra: 920, alimentoConsumidoKg: 2350, consumoAguaLitros: 4700, temperatura: 27.0, humedad: 63 },
  { fecha: "2024-11-08T08:00:00", loteId: "L-2025-003", avesVivas: 5140, pesoPromedioMuestra: 1180, alimentoConsumidoKg: 3020, consumoAguaLitros: 6040, temperatura: 26.8, humedad: 64 },
  { fecha: "2024-11-11T08:00:00", loteId: "L-2025-003", avesVivas: 5100, pesoPromedioMuestra: 1485, alimentoConsumidoKg: 3780, consumoAguaLitros: 7560, temperatura: 26.5, humedad: 64 },
  { fecha: "2024-11-15T08:00:00", loteId: "L-2025-003", avesVivas: 5070, pesoPromedioMuestra: 1850, alimentoConsumidoKg: 4650, consumoAguaLitros: 9300, temperatura: 28.0, humedad: 65 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-003", avesVivas: 5054, pesoPromedioMuestra: 2180, alimentoConsumidoKg: 5493, consumoAguaLitros: 10986, temperatura: 28.5, humedad: 66 },
  
  // ============================================
  // Lote L-2025-006 (Granja SUR, Galpón 2) - 39 días
  // ============================================
  { fecha: "2024-10-10T08:00:00", loteId: "L-2025-006", avesVivas: 4900, pesoPromedioMuestra: 42, alimentoConsumidoKg: 49, consumoAguaLitros: 147, temperatura: 32.5, humedad: 59 },
  { fecha: "2024-10-14T08:00:00", loteId: "L-2025-006", avesVivas: 4895, pesoPromedioMuestra: 105, alimentoConsumidoKg: 220, consumoAguaLitros: 540, temperatura: 31.0, humedad: 60 },
  { fecha: "2024-10-17T08:00:00", loteId: "L-2025-006", avesVivas: 4885, pesoPromedioMuestra: 175, alimentoConsumidoKg: 490, consumoAguaLitros: 980, temperatura: 30.5, humedad: 62 },
  { fecha: "2024-10-21T08:00:00", loteId: "L-2025-006", avesVivas: 4870, pesoPromedioMuestra: 320, alimentoConsumidoKg: 870, consumoAguaLitros: 1740, temperatura: 29.0, humedad: 63 },
  { fecha: "2024-10-25T08:00:00", loteId: "L-2025-006", avesVivas: 4860, pesoPromedioMuestra: 510, alimentoConsumidoKg: 1350, consumoAguaLitros: 2700, temperatura: 28.0, humedad: 64 },
  { fecha: "2024-10-28T08:00:00", loteId: "L-2025-006", avesVivas: 4850, pesoPromedioMuestra: 685, alimentoConsumidoKg: 1780, consumoAguaLitros: 3560, temperatura: 27.5, humedad: 65 },
  { fecha: "2024-11-01T08:00:00", loteId: "L-2025-006", avesVivas: 4835, pesoPromedioMuestra: 950, alimentoConsumidoKg: 2420, consumoAguaLitros: 4840, temperatura: 27.0, humedad: 63 },
  { fecha: "2024-11-05T08:00:00", loteId: "L-2025-006", avesVivas: 4820, pesoPromedioMuestra: 1240, alimentoConsumidoKg: 3150, consumoAguaLitros: 6300, temperatura: 26.5, humedad: 64 },
  { fecha: "2024-11-08T08:00:00", loteId: "L-2025-006", avesVivas: 4800, pesoPromedioMuestra: 1520, alimentoConsumidoKg: 3920, consumoAguaLitros: 7840, temperatura: 27.2, humedad: 65 },
  { fecha: "2024-11-12T08:00:00", loteId: "L-2025-006", avesVivas: 4775, pesoPromedioMuestra: 1950, alimentoConsumidoKg: 4900, consumoAguaLitros: 9800, temperatura: 28.0, humedad: 66 },
  { fecha: "2024-11-15T08:00:00", loteId: "L-2025-006", avesVivas: 4755, pesoPromedioMuestra: 2350, alimentoConsumidoKg: 5850, consumoAguaLitros: 11700, temperatura: 27.5, humedad: 65 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-006", avesVivas: 4740, pesoPromedioMuestra: 2620, alimentoConsumidoKg: 6580, consumoAguaLitros: 13160, temperatura: 27.8, humedad: 64 },
  
  // ============================================
  // Lote L-2025-001 (Granja NORTE, Galpón 1) - CERRADO - 42 días
  // ============================================
  { fecha: "2024-10-01T08:00:00", loteId: "L-2025-001", avesVivas: 4800, pesoPromedioMuestra: 42, alimentoConsumidoKg: 48, consumoAguaLitros: 144, temperatura: 32.0, humedad: 60 },
  { fecha: "2024-10-08T08:00:00", loteId: "L-2025-001", avesVivas: 4790, pesoPromedioMuestra: 170, alimentoConsumidoKg: 480, consumoAguaLitros: 960, temperatura: 30.5, humedad: 62 },
  { fecha: "2024-10-15T08:00:00", loteId: "L-2025-001", avesVivas: 4775, pesoPromedioMuestra: 480, alimentoConsumidoKg: 1200, consumoAguaLitros: 2400, temperatura: 28.5, humedad: 64 },
  { fecha: "2024-10-22T08:00:00", loteId: "L-2025-001", avesVivas: 4760, pesoPromedioMuestra: 940, alimentoConsumidoKg: 2300, consumoAguaLitros: 4600, temperatura: 27.0, humedad: 63 },
  { fecha: "2024-10-29T08:00:00", loteId: "L-2025-001", avesVivas: 4735, pesoPromedioMuestra: 1520, alimentoConsumidoKg: 3650, consumoAguaLitros: 7300, temperatura: 26.5, humedad: 64 },
  { fecha: "2024-11-05T08:00:00", loteId: "L-2025-001", avesVivas: 4715, pesoPromedioMuestra: 2180, alimentoConsumidoKg: 5150, consumoAguaLitros: 10300, temperatura: 27.5, humedad: 65 },
  { fecha: "2024-11-12T08:00:00", loteId: "L-2025-001", avesVivas: 4699, pesoPromedioMuestra: 2850, alimentoConsumidoKg: 7020, consumoAguaLitros: 14040, temperatura: 27.5, humedad: 64 },
  
  // ============================================
  // Lote L-2025-002 (Granja NORTE, Galpón 2) - 42 días
  // ============================================
  { fecha: "2024-10-07T08:00:00", loteId: "L-2025-002", avesVivas: 5000, pesoPromedioMuestra: 42, alimentoConsumidoKg: 50, consumoAguaLitros: 150, temperatura: 32.5, humedad: 59 },
  { fecha: "2024-10-11T08:00:00", loteId: "L-2025-002", avesVivas: 4995, pesoPromedioMuestra: 88, alimentoConsumidoKg: 200, consumoAguaLitros: 500, temperatura: 31.5, humedad: 60 },
  { fecha: "2024-10-14T08:00:00", loteId: "L-2025-002", avesVivas: 4985, pesoPromedioMuestra: 160, alimentoConsumidoKg: 500, consumoAguaLitros: 1000, temperatura: 30.0, humedad: 62 },
  { fecha: "2024-10-18T08:00:00", loteId: "L-2025-002", avesVivas: 4975, pesoPromedioMuestra: 290, alimentoConsumidoKg: 880, consumoAguaLitros: 1760, temperatura: 29.5, humedad: 63 },
  { fecha: "2024-10-21T08:00:00", loteId: "L-2025-002", avesVivas: 4965, pesoPromedioMuestra: 475, alimentoConsumidoKg: 1250, consumoAguaLitros: 2500, temperatura: 28.5, humedad: 64 },
  { fecha: "2024-10-25T08:00:00", loteId: "L-2025-002", avesVivas: 4955, pesoPromedioMuestra: 720, alimentoConsumidoKg: 1850, consumoAguaLitros: 3700, temperatura: 27.5, humedad: 63 },
  { fecha: "2024-10-28T08:00:00", loteId: "L-2025-002", avesVivas: 4945, pesoPromedioMuestra: 950, alimentoConsumidoKg: 2450, consumoAguaLitros: 4900, temperatura: 27.0, humedad: 64 },
  { fecha: "2024-11-01T08:00:00", loteId: "L-2025-002", avesVivas: 4930, pesoPromedioMuestra: 1250, alimentoConsumidoKg: 3200, consumoAguaLitros: 6400, temperatura: 26.8, humedad: 65 },
  { fecha: "2024-11-04T08:00:00", loteId: "L-2025-002", avesVivas: 4920, pesoPromedioMuestra: 1530, alimentoConsumidoKg: 3950, consumoAguaLitros: 7900, temperatura: 27.2, humedad: 64 },
  { fecha: "2024-11-08T08:00:00", loteId: "L-2025-002", avesVivas: 4905, pesoPromedioMuestra: 1920, alimentoConsumidoKg: 4850, consumoAguaLitros: 9700, temperatura: 27.8, humedad: 65 },
  { fecha: "2024-11-11T08:00:00", loteId: "L-2025-002", avesVivas: 4895, pesoPromedioMuestra: 2320, alimentoConsumidoKg: 5850, consumoAguaLitros: 11700, temperatura: 28.0, humedad: 66 },
  { fecha: "2024-11-14T08:00:00", loteId: "L-2025-002", avesVivas: 4880, pesoPromedioMuestra: 2700, alimentoConsumidoKg: 6850, consumoAguaLitros: 13700, temperatura: 27.0, humedad: 63 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-002", avesVivas: 4865, pesoPromedioMuestra: 2880, alimentoConsumidoKg: 7250, consumoAguaLitros: 14500, temperatura: 27.5, humedad: 64 },
  
  // ============================================
  // Lote L-2025-005 (Granja NORTE, Galpón 3) - 31 días
  // ============================================
  { fecha: "2024-10-18T08:00:00", loteId: "L-2025-005", avesVivas: 5100, pesoPromedioMuestra: 42, alimentoConsumidoKg: 51, consumoAguaLitros: 153, temperatura: 32.0, humedad: 60 },
  { fecha: "2024-10-21T08:00:00", loteId: "L-2025-005", avesVivas: 5095, pesoPromedioMuestra: 92, alimentoConsumidoKg: 200, consumoAguaLitros: 510, temperatura: 31.0, humedad: 61 },
  { fecha: "2024-10-25T08:00:00", loteId: "L-2025-005", avesVivas: 5085, pesoPromedioMuestra: 180, alimentoConsumidoKg: 550, consumoAguaLitros: 1100, temperatura: 30.0, humedad: 62 },
  { fecha: "2024-10-28T08:00:00", loteId: "L-2025-005", avesVivas: 5075, pesoPromedioMuestra: 310, alimentoConsumidoKg: 920, consumoAguaLitros: 1840, temperatura: 29.0, humedad: 63 },
  { fecha: "2024-11-01T08:00:00", loteId: "L-2025-005", avesVivas: 5065, pesoPromedioMuestra: 490, alimentoConsumidoKg: 1350, consumoAguaLitros: 2700, temperatura: 28.5, humedad: 64 },
  { fecha: "2024-11-04T08:00:00", loteId: "L-2025-005", avesVivas: 5050, pesoPromedioMuestra: 740, alimentoConsumidoKg: 1920, consumoAguaLitros: 3840, temperatura: 27.5, humedad: 63 },
  { fecha: "2024-11-08T08:00:00", loteId: "L-2025-005", avesVivas: 5035, pesoPromedioMuestra: 1020, alimentoConsumidoKg: 2580, consumoAguaLitros: 5160, temperatura: 27.0, humedad: 64 },
  { fecha: "2024-11-11T08:00:00", loteId: "L-2025-005", avesVivas: 5020, pesoPromedioMuestra: 1320, alimentoConsumidoKg: 3300, consumoAguaLitros: 6600, temperatura: 26.8, humedad: 65 },
  { fecha: "2024-11-15T08:00:00", loteId: "L-2025-005", avesVivas: 5000, pesoPromedioMuestra: 1720, alimentoConsumidoKg: 4200, consumoAguaLitros: 8400, temperatura: 27.5, humedad: 64 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-005", avesVivas: 4985, pesoPromedioMuestra: 1980, alimentoConsumidoKg: 4850, consumoAguaLitros: 9700, temperatura: 28.0, humedad: 65 },
  
  // ============================================
  // Lote L-2025-004 (Granja ESTE, Galpón 1) - 29 días
  // ============================================
  { fecha: "2024-10-20T08:00:00", loteId: "L-2025-004", avesVivas: 4500, pesoPromedioMuestra: 42, alimentoConsumidoKg: 45, consumoAguaLitros: 135, temperatura: 32.5, humedad: 61 },
  { fecha: "2024-10-24T08:00:00", loteId: "L-2025-004", avesVivas: 4495, pesoPromedioMuestra: 100, alimentoConsumidoKg: 195, consumoAguaLitros: 495, temperatura: 31.5, humedad: 62 },
  { fecha: "2024-10-27T08:00:00", loteId: "L-2025-004", avesVivas: 4485, pesoPromedioMuestra: 185, alimentoConsumidoKg: 490, consumoAguaLitros: 980, temperatura: 30.5, humedad: 63 },
  { fecha: "2024-10-31T08:00:00", loteId: "L-2025-004", avesVivas: 4475, pesoPromedioMuestra: 330, alimentoConsumidoKg: 850, consumoAguaLitros: 1700, temperatura: 29.5, humedad: 65 },
  { fecha: "2024-11-03T08:00:00", loteId: "L-2025-004", avesVivas: 4465, pesoPromedioMuestra: 520, alimentoConsumidoKg: 1280, consumoAguaLitros: 2560, temperatura: 28.5, humedad: 64 },
  { fecha: "2024-11-07T08:00:00", loteId: "L-2025-004", avesVivas: 4450, pesoPromedioMuestra: 760, alimentoConsumidoKg: 1800, consumoAguaLitros: 3600, temperatura: 28.0, humedad: 66 },
  { fecha: "2024-11-10T08:00:00", loteId: "L-2025-004", avesVivas: 4435, pesoPromedioMuestra: 1010, alimentoConsumidoKg: 2380, consumoAguaLitros: 4760, temperatura: 27.5, humedad: 65 },
  { fecha: "2024-11-14T08:00:00", loteId: "L-2025-004", avesVivas: 4415, pesoPromedioMuestra: 1340, alimentoConsumidoKg: 3050, consumoAguaLitros: 6100, temperatura: 28.5, humedad: 67 },
  { fecha: "2024-11-17T08:00:00", loteId: "L-2025-004", avesVivas: 4400, pesoPromedioMuestra: 1550, alimentoConsumidoKg: 3520, consumoAguaLitros: 7040, temperatura: 29.0, humedad: 68 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-004", avesVivas: 4395, pesoPromedioMuestra: 1620, alimentoConsumidoKg: 3680, consumoAguaLitros: 7360, temperatura: 29.0, humedad: 67 },
  
  // ============================================
  // Lote L-2025-007 (Granja SUR, Galpón 3) - 37 días
  // ============================================
  { fecha: "2024-10-12T08:00:00", loteId: "L-2025-007", avesVivas: 5100, pesoPromedioMuestra: 42, alimentoConsumidoKg: 51, consumoAguaLitros: 153, temperatura: 32.2, humedad: 60 },
  { fecha: "2024-10-16T08:00:00", loteId: "L-2025-007", avesVivas: 5095, pesoPromedioMuestra: 110, alimentoConsumidoKg: 240, consumoAguaLitros: 580, temperatura: 31.2, humedad: 61 },
  { fecha: "2024-10-20T08:00:00", loteId: "L-2025-007", avesVivas: 5085, pesoPromedioMuestra: 190, alimentoConsumidoKg: 560, consumoAguaLitros: 1120, temperatura: 30.2, humedad: 62 },
  { fecha: "2024-10-24T08:00:00", loteId: "L-2025-007", avesVivas: 5075, pesoPromedioMuestra: 300, alimentoConsumidoKg: 920, consumoAguaLitros: 1840, temperatura: 29.2, humedad: 63 },
  { fecha: "2024-10-28T08:00:00", loteId: "L-2025-007", avesVivas: 5065, pesoPromedioMuestra: 490, alimentoConsumidoKg: 1380, consumoAguaLitros: 2760, temperatura: 28.2, humedad: 64 },
  { fecha: "2024-11-02T08:00:00", loteId: "L-2025-007", avesVivas: 5055, pesoPromedioMuestra: 750, alimentoConsumidoKg: 1950, consumoAguaLitros: 3900, temperatura: 27.5, humedad: 63 },
  { fecha: "2024-11-06T08:00:00", loteId: "L-2025-007", avesVivas: 5045, pesoPromedioMuestra: 1050, alimentoConsumidoKg: 2650, consumoAguaLitros: 5300, temperatura: 27.0, humedad: 64 },
  { fecha: "2024-11-10T08:00:00", loteId: "L-2025-007", avesVivas: 5030, pesoPromedioMuestra: 1380, alimentoConsumidoKg: 3450, consumoAguaLitros: 6900, temperatura: 26.8, humedad: 65 },
  { fecha: "2024-11-14T08:00:00", loteId: "L-2025-007", avesVivas: 5015, pesoPromedioMuestra: 1720, alimentoConsumidoKg: 4320, consumoAguaLitros: 8640, temperatura: 27.2, humedad: 64 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-007", avesVivas: 5000, pesoPromedioMuestra: 2050, alimentoConsumidoKg: 5150, consumoAguaLitros: 10300, temperatura: 27.8, humedad: 65 },
  
  // ============================================
  // Lote L-2025-008 (Granja NORTE, Galpón 4) - 38 días
  // ============================================
  { fecha: "2024-10-15T08:00:00", loteId: "L-2025-008", avesVivas: 4950, pesoPromedioMuestra: 42, alimentoConsumidoKg: 50, consumoAguaLitros: 150, temperatura: 32.1, humedad: 60 },
  { fecha: "2024-10-19T08:00:00", loteId: "L-2025-008", avesVivas: 4945, pesoPromedioMuestra: 115, alimentoConsumidoKg: 250, consumoAguaLitros: 600, temperatura: 31.1, humedad: 61 },
  { fecha: "2024-10-23T08:00:00", loteId: "L-2025-008", avesVivas: 4935, pesoPromedioMuestra: 200, alimentoConsumidoKg: 600, consumoAguaLitros: 1200, temperatura: 30.1, humedad: 62 },
  { fecha: "2024-10-27T08:00:00", loteId: "L-2025-008", avesVivas: 4925, pesoPromedioMuestra: 320, alimentoConsumidoKg: 1000, consumoAguaLitros: 2000, temperatura: 29.1, humedad: 63 },
  { fecha: "2024-11-01T08:00:00", loteId: "L-2025-008", avesVivas: 4915, pesoPromedioMuestra: 520, alimentoConsumidoKg: 1500, consumoAguaLitros: 3000, temperatura: 28.1, humedad: 64 },
  { fecha: "2024-11-05T08:00:00", loteId: "L-2025-008", avesVivas: 4905, pesoPromedioMuestra: 780, alimentoConsumidoKg: 2100, consumoAguaLitros: 4200, temperatura: 27.4, humedad: 63 },
  { fecha: "2024-11-09T08:00:00", loteId: "L-2025-008", avesVivas: 4895, pesoPromedioMuestra: 1100, alimentoConsumidoKg: 2800, consumoAguaLitros: 5600, temperatura: 26.9, humedad: 64 },
  { fecha: "2024-11-13T08:00:00", loteId: "L-2025-008", avesVivas: 4880, pesoPromedioMuestra: 1450, alimentoConsumidoKg: 3600, consumoAguaLitros: 7200, temperatura: 27.1, humedad: 65 },
  { fecha: "2024-11-17T08:00:00", loteId: "L-2025-008", avesVivas: 4865, pesoPromedioMuestra: 1800, alimentoConsumidoKg: 4500, consumoAguaLitros: 9000, temperatura: 27.6, humedad: 64 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-008", avesVivas: 4855, pesoPromedioMuestra: 1920, alimentoConsumidoKg: 4800, consumoAguaLitros: 9600, temperatura: 27.7, humedad: 65 },
  
  // ============================================
  // Lote L-2025-009 (Granja NORTE, Galpón 5) - 27 días
  // ============================================
  { fecha: "2024-10-22T08:00:00", loteId: "L-2025-009", avesVivas: 5050, pesoPromedioMuestra: 42, alimentoConsumidoKg: 51, consumoAguaLitros: 153, temperatura: 32.3, humedad: 59 },
  { fecha: "2024-10-26T08:00:00", loteId: "L-2025-009", avesVivas: 5045, pesoPromedioMuestra: 120, alimentoConsumidoKg: 260, consumoAguaLitros: 620, temperatura: 31.3, humedad: 60 },
  { fecha: "2024-10-30T08:00:00", loteId: "L-2025-009", avesVivas: 5035, pesoPromedioMuestra: 210, alimentoConsumidoKg: 640, consumoAguaLitros: 1280, temperatura: 30.3, humedad: 61 },
  { fecha: "2024-11-04T08:00:00", loteId: "L-2025-009", avesVivas: 5025, pesoPromedioMuestra: 340, alimentoConsumidoKg: 1080, consumoAguaLitros: 2160, temperatura: 29.3, humedad: 62 },
  { fecha: "2024-11-08T08:00:00", loteId: "L-2025-009", avesVivas: 5015, pesoPromedioMuestra: 550, alimentoConsumidoKg: 1620, consumoAguaLitros: 3240, temperatura: 28.3, humedad: 63 },
  { fecha: "2024-11-12T08:00:00", loteId: "L-2025-009", avesVivas: 5005, pesoPromedioMuestra: 830, alimentoConsumidoKg: 2300, consumoAguaLitros: 4600, temperatura: 27.3, humedad: 64 },
  { fecha: "2024-11-16T08:00:00", loteId: "L-2025-009", avesVivas: 4995, pesoPromedioMuestra: 1180, alimentoConsumidoKg: 3100, consumoAguaLitros: 6200, temperatura: 26.9, humedad: 63 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-009", avesVivas: 4985, pesoPromedioMuestra: 1350, alimentoConsumidoKg: 3550, consumoAguaLitros: 7100, temperatura: 27.2, humedad: 64 },
  
  // ============================================
  // Lote L-2025-010 (Granja ESTE, Galpón 2) - 33 días
  // ============================================
  { fecha: "2024-10-16T08:00:00", loteId: "L-2025-010", avesVivas: 4700, pesoPromedioMuestra: 42, alimentoConsumidoKg: 47, consumoAguaLitros: 141, temperatura: 32.4, humedad: 61 },
  { fecha: "2024-10-20T08:00:00", loteId: "L-2025-010", avesVivas: 4695, pesoPromedioMuestra: 105, alimentoConsumidoKg: 220, consumoAguaLitros: 530, temperatura: 31.4, humedad: 62 },
  { fecha: "2024-10-24T08:00:00", loteId: "L-2025-010", avesVivas: 4685, pesoPromedioMuestra: 195, alimentoConsumidoKg: 520, consumoAguaLitros: 1040, temperatura: 30.4, humedad: 63 },
  { fecha: "2024-10-28T08:00:00", loteId: "L-2025-010", avesVivas: 4675, pesoPromedioMuestra: 310, alimentoConsumidoKg: 900, consumoAguaLitros: 1800, temperatura: 29.4, humedad: 64 },
  { fecha: "2024-11-02T08:00:00", loteId: "L-2025-010", avesVivas: 4665, pesoPromedioMuestra: 500, alimentoConsumidoKg: 1400, consumoAguaLitros: 2800, temperatura: 28.4, humedad: 63 },
  { fecha: "2024-11-06T08:00:00", loteId: "L-2025-010", avesVivas: 4655, pesoPromedioMuestra: 720, alimentoConsumidoKg: 2000, consumoAguaLitros: 4000, temperatura: 27.4, humedad: 64 },
  { fecha: "2024-11-10T08:00:00", loteId: "L-2025-010", avesVivas: 4645, pesoPromedioMuestra: 980, alimentoConsumidoKg: 2700, consumoAguaLitros: 5400, temperatura: 26.9, humedad: 65 },
  { fecha: "2024-11-14T08:00:00", loteId: "L-2025-010", avesVivas: 4630, pesoPromedioMuestra: 1280, alimentoConsumidoKg: 3500, consumoAguaLitros: 7000, temperatura: 27.1, humedad: 64 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-010", avesVivas: 4615, pesoPromedioMuestra: 1580, alimentoConsumidoKg: 4300, consumoAguaLitros: 8600, temperatura: 27.5, humedad: 65 },
  
  // ============================================
  // Lote L-2025-011 (Granja ESTE, Galpón 3) - 30 días
  // ============================================
  { fecha: "2024-10-19T08:00:00", loteId: "L-2025-011", avesVivas: 4850, pesoPromedioMuestra: 42, alimentoConsumidoKg: 49, consumoAguaLitros: 147, temperatura: 32.5, humedad: 60 },
  { fecha: "2024-10-23T08:00:00", loteId: "L-2025-011", avesVivas: 4845, pesoPromedioMuestra: 110, alimentoConsumidoKg: 240, consumoAguaLitros: 580, temperatura: 31.5, humedad: 61 },
  { fecha: "2024-10-27T08:00:00", loteId: "L-2025-011", avesVivas: 4835, pesoPromedioMuestra: 200, alimentoConsumidoKg: 600, consumoAguaLitros: 1200, temperatura: 30.5, humedad: 62 },
  { fecha: "2024-11-01T08:00:00", loteId: "L-2025-011", avesVivas: 4825, pesoPromedioMuestra: 330, alimentoConsumidoKg: 1000, consumoAguaLitros: 2000, temperatura: 29.5, humedad: 63 },
  { fecha: "2024-11-05T08:00:00", loteId: "L-2025-011", avesVivas: 4815, pesoPromedioMuestra: 540, alimentoConsumidoKg: 1500, consumoAguaLitros: 3000, temperatura: 28.5, humedad: 64 },
  { fecha: "2024-11-09T08:00:00", loteId: "L-2025-011", avesVivas: 4805, pesoPromedioMuestra: 790, alimentoConsumidoKg: 2100, consumoAguaLitros: 4200, temperatura: 27.5, humedad: 63 },
  { fecha: "2024-11-13T08:00:00", loteId: "L-2025-011", avesVivas: 4795, pesoPromedioMuestra: 1080, alimentoConsumidoKg: 2800, consumoAguaLitros: 5600, temperatura: 27.0, humedad: 64 },
  { fecha: "2024-11-17T08:00:00", loteId: "L-2025-011", avesVivas: 4785, pesoPromedioMuestra: 1420, alimentoConsumidoKg: 3600, consumoAguaLitros: 7200, temperatura: 27.3, humedad: 65 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-011", avesVivas: 4775, pesoPromedioMuestra: 1520, alimentoConsumidoKg: 3850, consumoAguaLitros: 7700, temperatura: 27.6, humedad: 64 },
  
  // ============================================
  // Lote L-2025-012 (Granja ESTE, Galpón 4) - 36 días
  // ============================================
  { fecha: "2024-10-13T08:00:00", loteId: "L-2025-012", avesVivas: 4600, pesoPromedioMuestra: 42, alimentoConsumidoKg: 46, consumoAguaLitros: 138, temperatura: 32.6, humedad: 60 },
  { fecha: "2024-10-17T08:00:00", loteId: "L-2025-012", avesVivas: 4595, pesoPromedioMuestra: 100, alimentoConsumidoKg: 210, consumoAguaLitros: 510, temperatura: 31.6, humedad: 61 },
  { fecha: "2024-10-21T08:00:00", loteId: "L-2025-012", avesVivas: 4585, pesoPromedioMuestra: 180, alimentoConsumidoKg: 500, consumoAguaLitros: 1000, temperatura: 30.6, humedad: 62 },
  { fecha: "2024-10-25T08:00:00", loteId: "L-2025-012", avesVivas: 4575, pesoPromedioMuestra: 290, alimentoConsumidoKg: 880, consumoAguaLitros: 1760, temperatura: 29.6, humedad: 63 },
  { fecha: "2024-10-29T08:00:00", loteId: "L-2025-012", avesVivas: 4565, pesoPromedioMuestra: 470, alimentoConsumidoKg: 1320, consumoAguaLitros: 2640, temperatura: 28.6, humedad: 64 },
  { fecha: "2024-11-03T08:00:00", loteId: "L-2025-012", avesVivas: 4555, pesoPromedioMuestra: 710, alimentoConsumidoKg: 1900, consumoAguaLitros: 3800, temperatura: 27.6, humedad: 63 },
  { fecha: "2024-11-07T08:00:00", loteId: "L-2025-012", avesVivas: 4545, pesoPromedioMuestra: 1010, alimentoConsumidoKg: 2600, consumoAguaLitros: 5200, temperatura: 27.1, humedad: 64 },
  { fecha: "2024-11-11T08:00:00", loteId: "L-2025-012", avesVivas: 4535, pesoPromedioMuestra: 1340, alimentoConsumidoKg: 3400, consumoAguaLitros: 6800, temperatura: 26.7, humedad: 65 },
  { fecha: "2024-11-15T08:00:00", loteId: "L-2025-012", avesVivas: 4520, pesoPromedioMuestra: 1680, alimentoConsumidoKg: 4250, consumoAguaLitros: 8500, temperatura: 27.2, humedad: 64 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-012", avesVivas: 4505, pesoPromedioMuestra: 1980, alimentoConsumidoKg: 5050, consumoAguaLitros: 10100, temperatura: 27.7, humedad: 65 },
  
  // ============================================
  // Lote L-2025-013 (Granja ESTE, Galpón 5) - 32 días
  // ============================================
  { fecha: "2024-10-17T08:00:00", loteId: "L-2025-013", avesVivas: 4750, pesoPromedioMuestra: 42, alimentoConsumidoKg: 48, consumoAguaLitros: 144, temperatura: 32.7, humedad: 59 },
  { fecha: "2024-10-21T08:00:00", loteId: "L-2025-013", avesVivas: 4745, pesoPromedioMuestra: 108, alimentoConsumidoKg: 230, consumoAguaLitros: 560, temperatura: 31.7, humedad: 60 },
  { fecha: "2024-10-25T08:00:00", loteId: "L-2025-013", avesVivas: 4735, pesoPromedioMuestra: 195, alimentoConsumidoKg: 580, consumoAguaLitros: 1160, temperatura: 30.7, humedad: 61 },
  { fecha: "2024-10-29T08:00:00", loteId: "L-2025-013", avesVivas: 4725, pesoPromedioMuestra: 315, alimentoConsumidoKg: 960, consumoAguaLitros: 1920, temperatura: 29.7, humedad: 62 },
  { fecha: "2024-11-03T08:00:00", loteId: "L-2025-013", avesVivas: 4715, pesoPromedioMuestra: 510, alimentoConsumidoKg: 1440, consumoAguaLitros: 2880, temperatura: 28.7, humedad: 63 },
  { fecha: "2024-11-07T08:00:00", loteId: "L-2025-013", avesVivas: 4705, pesoPromedioMuestra: 740, alimentoConsumidoKg: 2040, consumoAguaLitros: 4080, temperatura: 27.7, humedad: 64 },
  { fecha: "2024-11-11T08:00:00", loteId: "L-2025-013", avesVivas: 4695, pesoPromedioMuestra: 1020, alimentoConsumidoKg: 2750, consumoAguaLitros: 5500, temperatura: 27.2, humedad: 63 },
  { fecha: "2024-11-15T08:00:00", loteId: "L-2025-013", avesVivas: 4685, pesoPromedioMuestra: 1360, alimentoConsumidoKg: 3550, consumoAguaLitros: 7100, temperatura: 26.8, humedad: 64 },
  { fecha: "2024-11-18T08:00:00", loteId: "L-2025-013", avesVivas: 4675, pesoPromedioMuestra: 1650, alimentoConsumidoKg: 4400, consumoAguaLitros: 8800, temperatura: 27.4, humedad: 65 },
];

export const costos: Costo[] = [
  // Costos para Lote L-2025-003 (SUR, Galp 1)
  { loteId: "L-2025-003", categoria: "POLLITO_BB", monto: 1040, fecha: "2024-10-14T08:00:00", descripcion: "5200 pollitos BB" },
  { loteId: "L-2025-003", categoria: "ALIMENTO", monto: 5493, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-003", categoria: "GAS_ENERGIA", monto: 520, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-003", categoria: "VACUNAS", monto: 312, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-003", categoria: "MANO_OBRA", monto: 468, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-003", categoria: "OTROS", monto: 234, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-006 (SUR, Galp 2)
  { loteId: "L-2025-006", categoria: "POLLITO_BB", monto: 980, fecha: "2024-10-10T08:00:00", descripcion: "4900 pollitos BB" },
  { loteId: "L-2025-006", categoria: "ALIMENTO", monto: 6580, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-006", categoria: "GAS_ENERGIA", monto: 585, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-006", categoria: "VACUNAS", monto: 294, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-006", categoria: "MANO_OBRA", monto: 441, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-006", categoria: "OTROS", monto: 221, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-001 (NORTE, Galp 1)
  { loteId: "L-2025-001", categoria: "POLLITO_BB", monto: 960, fecha: "2024-10-01T08:00:00", descripcion: "4800 pollitos BB" },
  { loteId: "L-2025-001", categoria: "ALIMENTO", monto: 7020, fecha: "2024-11-12T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-001", categoria: "GAS_ENERGIA", monto: 630, fecha: "2024-11-12T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-001", categoria: "VACUNAS", monto: 288, fecha: "2024-11-12T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-001", categoria: "MANO_OBRA", monto: 432, fecha: "2024-11-12T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-001", categoria: "OTROS", monto: 216, fecha: "2024-11-12T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-002 (NORTE, Galp 2)
  { loteId: "L-2025-002", categoria: "POLLITO_BB", monto: 1000, fecha: "2024-10-07T08:00:00", descripcion: "5000 pollitos BB" },
  { loteId: "L-2025-002", categoria: "ALIMENTO", monto: 7250, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-002", categoria: "GAS_ENERGIA", monto: 638, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-002", categoria: "VACUNAS", monto: 300, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-002", categoria: "MANO_OBRA", monto: 450, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-002", categoria: "OTROS", monto: 225, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-005 (NORTE, Galp 3)
  { loteId: "L-2025-005", categoria: "POLLITO_BB", monto: 1020, fecha: "2024-10-18T08:00:00", descripcion: "5100 pollitos BB" },
  { loteId: "L-2025-005", categoria: "ALIMENTO", monto: 4850, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-005", categoria: "GAS_ENERGIA", monto: 465, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-005", categoria: "VACUNAS", monto: 306, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-005", categoria: "MANO_OBRA", monto: 459, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-005", categoria: "OTROS", monto: 230, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-004 (ESTE, Galp 1)
  { loteId: "L-2025-004", categoria: "POLLITO_BB", monto: 900, fecha: "2024-10-20T08:00:00", descripcion: "4500 pollitos BB" },
  { loteId: "L-2025-004", categoria: "ALIMENTO", monto: 3680, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-004", categoria: "GAS_ENERGIA", monto: 420, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-004", categoria: "VACUNAS", monto: 270, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-004", categoria: "MANO_OBRA", monto: 405, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-004", categoria: "OTROS", monto: 203, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-007 (SUR, Galp 3)
  { loteId: "L-2025-007", categoria: "POLLITO_BB", monto: 1020, fecha: "2024-10-12T08:00:00", descripcion: "5100 pollitos BB" },
  { loteId: "L-2025-007", categoria: "ALIMENTO", monto: 5150, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-007", categoria: "GAS_ENERGIA", monto: 485, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-007", categoria: "VACUNAS", monto: 306, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-007", categoria: "MANO_OBRA", monto: 459, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-007", categoria: "OTROS", monto: 230, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-008 (NORTE, Galp 4)
  { loteId: "L-2025-008", categoria: "POLLITO_BB", monto: 990, fecha: "2024-10-15T08:00:00", descripcion: "4950 pollitos BB" },
  { loteId: "L-2025-008", categoria: "ALIMENTO", monto: 4800, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-008", categoria: "GAS_ENERGIA", monto: 450, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-008", categoria: "VACUNAS", monto: 297, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-008", categoria: "MANO_OBRA", monto: 446, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-008", categoria: "OTROS", monto: 223, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-009 (NORTE, Galp 5)
  { loteId: "L-2025-009", categoria: "POLLITO_BB", monto: 1010, fecha: "2024-10-22T08:00:00", descripcion: "5050 pollitos BB" },
  { loteId: "L-2025-009", categoria: "ALIMENTO", monto: 3550, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-009", categoria: "GAS_ENERGIA", monto: 380, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-009", categoria: "VACUNAS", monto: 303, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-009", categoria: "MANO_OBRA", monto: 455, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-009", categoria: "OTROS", monto: 228, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-010 (ESTE, Galp 2)
  { loteId: "L-2025-010", categoria: "POLLITO_BB", monto: 940, fecha: "2024-10-16T08:00:00", descripcion: "4700 pollitos BB" },
  { loteId: "L-2025-010", categoria: "ALIMENTO", monto: 4300, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-010", categoria: "GAS_ENERGIA", monto: 410, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-010", categoria: "VACUNAS", monto: 282, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-010", categoria: "MANO_OBRA", monto: 423, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-010", categoria: "OTROS", monto: 212, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-011 (ESTE, Galp 3)
  { loteId: "L-2025-011", categoria: "POLLITO_BB", monto: 970, fecha: "2024-10-19T08:00:00", descripcion: "4850 pollitos BB" },
  { loteId: "L-2025-011", categoria: "ALIMENTO", monto: 3850, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-011", categoria: "GAS_ENERGIA", monto: 400, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-011", categoria: "VACUNAS", monto: 291, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-011", categoria: "MANO_OBRA", monto: 437, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-011", categoria: "OTROS", monto: 219, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-012 (ESTE, Galp 4)
  { loteId: "L-2025-012", categoria: "POLLITO_BB", monto: 920, fecha: "2024-10-13T08:00:00", descripcion: "4600 pollitos BB" },
  { loteId: "L-2025-012", categoria: "ALIMENTO", monto: 5050, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-012", categoria: "GAS_ENERGIA", monto: 430, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-012", categoria: "VACUNAS", monto: 276, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-012", categoria: "MANO_OBRA", monto: 414, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-012", categoria: "OTROS", monto: 207, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
  
  // Costos para Lote L-2025-013 (ESTE, Galp 5)
  { loteId: "L-2025-013", categoria: "POLLITO_BB", monto: 950, fecha: "2024-10-17T08:00:00", descripcion: "4750 pollitos BB" },
  { loteId: "L-2025-013", categoria: "ALIMENTO", monto: 4400, fecha: "2024-11-18T08:00:00", descripcion: "Alimento balanceado" },
  { loteId: "L-2025-013", categoria: "GAS_ENERGIA", monto: 415, fecha: "2024-11-18T08:00:00", descripcion: "Gas y energía" },
  { loteId: "L-2025-013", categoria: "VACUNAS", monto: 285, fecha: "2024-11-18T08:00:00", descripcion: "Vacunas" },
  { loteId: "L-2025-013", categoria: "MANO_OBRA", monto: 428, fecha: "2024-11-18T08:00:00", descripcion: "Mano de obra" },
  { loteId: "L-2025-013", categoria: "OTROS", monto: 214, fecha: "2024-11-18T08:00:00", descripcion: "Otros" },
];
