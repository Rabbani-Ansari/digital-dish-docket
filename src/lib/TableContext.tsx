import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface TableContextType {
  tableNumber: string | null;
  setTableNumber: (table: string) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [tableNumber, setTableNumberState] = useState<string | null>(() => {
    // Check localStorage first
    const saved = localStorage.getItem("tableNumber");
    if (saved) return saved;
    
    // Then check URL parameter
    const tableParam = searchParams.get("table");
    return tableParam;
  });

  useEffect(() => {
    // Update from URL if present
    const tableParam = searchParams.get("table");
    if (tableParam) {
      setTableNumberState(tableParam);
      localStorage.setItem("tableNumber", tableParam);
    }
  }, [searchParams]);

  const setTableNumber = (table: string) => {
    setTableNumberState(table);
    localStorage.setItem("tableNumber", table);
  };

  return (
    <TableContext.Provider value={{ tableNumber, setTableNumber }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within TableProvider");
  }
  return context;
};
