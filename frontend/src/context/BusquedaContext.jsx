import { createContext, useContext, useState } from "react";

const BusquedaContext = createContext();

export const BusquedaProvider = ({ children }) => {
  const [valor, setValor] = useState(""); 

  return (
    <BusquedaContext.Provider value={{ valor, setValor }}>
      {children}
    </BusquedaContext.Provider>
  );
};

export const useBusqueda = () => useContext(BusquedaContext);
