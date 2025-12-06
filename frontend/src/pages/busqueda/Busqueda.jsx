import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import TypeCatalogo from "../../components/catalogo/TypeCatalogo";
import Catalogo from "../../components/catalogo/Catalogo";

function Busqueda() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const obtenerGeneros = () => {
      const resultados = document.querySelector(".resultados")?.firstElementChild?.firstElementChild?.firstElementChild?.className;
      if (resultados) {
        setGenres(resultados.split(","));
      } else {
        setGenres(["Action","Adventure","Animation"]); 
      }
    };

    const timeout = setTimeout(obtenerGeneros, 500);
    return () => clearTimeout(timeout);
  }, [genres]);

  return (
    <>
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold my-4">Results found for "{search}":</h1>
      <Catalogo typeUrl={"busqueda"} search={search} limit={35} />

      <h2 className="text-2xl font-bold mt-10">Maybe you'd like to watch</h2>
      {genres.map((element, index) => (
        <TypeCatalogo key={index} genre={element} />
      ))}
    </div>
    </>
  );
}

export default Busqueda;
