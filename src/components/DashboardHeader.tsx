import { Bird, Calendar, Filter, Download, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { useFilters } from "../lib/FilterContext";
import { lotes } from "../lib/data";

export function DashboardHeader() {
  const { filtros, updateFiltro } = useFilters();
  
  // Obtener lotes únicos para el selector
  const lotesUnicos = [...new Set(lotes.map(l => l.loteId))];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
              <Bird className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-slate-900">Empresa Avícola TING5</h1>
              <p className="text-slate-500">Plan to Produce</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Importar Datos
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar Reporte
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">Filtros:</span>
          </div>
          
          <Select value={filtros.lote} onValueChange={(value) => updateFiltro("lote", value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar Lote" />
            </SelectTrigger>
            <SelectContent>
              {lotesUnicos.map(loteId => {
                const lote = lotes.find(l => l.loteId === loteId);
                const edadAprox = lote ? Math.floor((new Date().getTime() - new Date(lote.fechaInicio).getTime()) / (1000 * 60 * 60 * 24)) : 0;
                return (
                  <SelectItem key={loteId} value={loteId}>
                    Lote {loteId} ({edadAprox} días)
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select value={filtros.granja} onValueChange={(value) => updateFiltro("granja", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Granja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Granjas</SelectItem>
              <SelectItem value="NORTE">Granja Norte</SelectItem>
              <SelectItem value="SUR">Granja Sur</SelectItem>
              <SelectItem value="ESTE">Granja Este</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filtros.galpon} onValueChange={(value) => updateFiltro("galpon", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Galpón" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Galpones</SelectItem>
              <SelectItem value="1">Galpón 1</SelectItem>
              <SelectItem value="2">Galpón 2</SelectItem>
              <SelectItem value="3">Galpón 3</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filtros.periodo} onValueChange={(value) => updateFiltro("periodo", value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mes</SelectItem>
              <SelectItem value="lot">Todo el Lote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}