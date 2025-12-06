import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCatalogo } from "../../context/CatalogoContext";

const opciones = [
  "Genres", "Horror", "Animation", "Romance", "Action", "Mystery",
  "Sci-Fi", "History", "Comedy", "Drama", "Fantasy",
  "Family", "Crime", "Music", "Biography"
];

const ordenar = [
  "Newest", "Oldest", "A-Z", "Z-A"
];

function Filtro({ title,url }) {
  const { page, setPage } = useCatalogo();
  const [genre, setGenre] = useState("Genres");
  const [order, setOrder] = useState("Newest");

  const navigate = useNavigate();

  function handleChange(e){
    if(e.target.id === "genre"){
      setGenre(e.target.value);
    }
    else{
      setOrder(e.target.value);
    }
    setPage(1);
  }

  useEffect(() => {
    navigate(`/${url}?genre=${genre}&order=${order}`)
  }, [genre, order]);

  return (
    <>
  <div className="fixed z-1 bg-[#101010] w-full flex justify-between items-start p-4 md:px-6 md:py-4">
    <div className="flex flex-wrap justify-evenly items-start md:gap-8 w-full md:w-auto">
      <h2 className=" text-2xl md:text-4xl font-medium md:ml-6">{title}</h2>
      <form className="border border-white" onChange={handleChange}>
        <select name="genre" id="genre" className="bg-[#101010] text-white cursor-pointer p-1">
          {opciones.map((option) => (
            <option key={option} value={option} className="bg-[#101010]">{option}</option>
          ))}
        </select>
      </form>
    </div>
    <div>
      <form className="border border-white md:mr-7" onChange={handleChange}>
        <select name="order" id="order" className="bg-[#101010] text-white cursor-pointer p-1">
          {ordenar.map((option) => (
            <option key={option} value={option} className="bg-[#101010]">{option}</option>
          ))}
        </select>
      </form>
    </div>
  </div>
  <div className="h-[72px]"></div>
</>
  )
}

export default Filtro