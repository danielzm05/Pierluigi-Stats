import { createContext, useState } from "react";

//1. Crear Contexto
export const FiltersContext = createContext();

//2. Crear Provider, para proveer el contexto
export function FiltersProvider({ children }) {
  const currentDate = new Date().toJSON().slice(0, 10).replaceAll("-", "");

  const [filters, setFilters] = useState({
    league: "eng.1",
    date: currentDate,
  });

  const updateLeague = (newLeague) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      league: newLeague,
    }));
  };

  const updateDate = (newDate) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      date: newDate,
    }));
  };

  return (
    <FiltersContext.Provider
      value={{ filters, setFilters, updateLeague, updateDate }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
