import { createContext, useContext, useState, useEffect } from "react";

const CatalogoContext = createContext();

export const CatalogoProvider = ({ children }) => {
  const [page, setPage] = useState(1) 

  return (
    <CatalogoContext.Provider value={{ page, setPage }}>
      {children}
    </CatalogoContext.Provider>
  );
};

export const useCatalogo = () => useContext(CatalogoContext);
