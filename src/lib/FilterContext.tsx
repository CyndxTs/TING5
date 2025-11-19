import { createContext, useContext, useState, ReactNode } from "react";
import { Filtros } from "./calculations";

interface FilterContextType {
  filtros: Filtros;
  setFiltros: (filtros: Filtros) => void;
  updateFiltro: (key: keyof Filtros, value: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filtros, setFiltros] = useState<Filtros>({
    granja: "all",
    galpon: "all",
    lote: "L-2025-003",
    periodo: "week"
  });

  const updateFiltro = (key: keyof Filtros, value: string) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext.Provider value={{ filtros, setFiltros, updateFiltro }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
