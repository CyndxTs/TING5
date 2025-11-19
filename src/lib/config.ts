// ============================================
// CONFIGURACIÓN GENERAL DE LA EMPRESA
// ============================================

export const config = {
  // Precio de venta por kg (USD)
  precioVentaKg: 0.78,
  
  // Punto de equilibrio (costo por kg producido)
  puntoEquilibrio: 2.50,
  
  // Costo estimado por ave muerta (USD)
  costoAveMuerta: 5.0,
  
  // Objetivos de rendimiento
  objetivos: {
    mortalidadMaxima: 3.5, // %
    fcrMaximo: 1.75, // kg/kg
    pesoMinimoDia42: 2150, // gramos
    temperaturaOptima: { min: 26, max: 30 }, // °C
    humedadOptima: { min: 55, max: 70 }, // %
    indiceProductividadMinimo: 350, // puntos
  },
  
  // Costos por etapa de alimento (USD/kg)
  costosAlimento: {
    preIniciador: 1.85,
    iniciador: 1.65,
    engorde: 1.45,
  },
  
  // Distribución de costos de alimento por etapa (%)
  distribucionAlimento: {
    preIniciador: 5, // %
    iniciador: 25, // %
    engorde: 70, // %
  },
};


