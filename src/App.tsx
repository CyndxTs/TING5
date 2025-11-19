import { DashboardHeader } from "./components/DashboardHeader";
import { KPISection } from "./components/KPISection";
import { LotPerformance } from "./components/LotPerformance";
import { HealthEnvironment } from "./components/HealthEnvironment";
import { FeedConversion } from "./components/FeedConversion";
import { MortalityAlerts } from "./components/MortalityAlerts";
import { EconomicPerformance } from "./components/EconomicPerformance";
import { FarmRanking } from "./components/FarmRanking";
import { FilterProvider, useFilters } from "./lib/FilterContext";

function DashboardContent() {
  const { filtros } = useFilters();
  
  // Mostrar ranking solo cuando no hay filtros específicos de granja/galpón
  const mostrarRanking = filtros.granja === "all" && filtros.galpon === "all";

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="p-6 max-w-[1800px] mx-auto space-y-6">
        {/* Sección 1: KPIs Principales */}
        <KPISection />
        
        {/* Sección 2 y 4: Rendimiento del Lote y Alimentación */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LotPerformance />
          <FeedConversion />
        </div>

        {/* Sección 3: Sanidad y Condiciones Ambientales */}
        <HealthEnvironment />

        {/* Sección 5 y 6: Mortalidad/Alertas y Rendimiento Económico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MortalityAlerts />
          <EconomicPerformance />
        </div>

        {/* Sección 7: Ranking de Granjas/Galpones - Solo visible sin filtros */}
        {mostrarRanking && <FarmRanking />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FilterProvider>
      <DashboardContent />
    </FilterProvider>
  );
}