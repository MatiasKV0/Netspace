import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Skeleton from "../loading/Skeleton";

function TypeCatalogo({ genre }) {
  const [limit, setLimit] = useState(28);
  const [movies, setMovies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get(`/?genre=${genre}&limit=${limit}`);
				setStartIndex(0);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [genre, limit]);

	useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(7);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(4); 
      } else {
        setItemsPerPage(2);  
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - itemsPerPage));
  };

  const nextSlide = () => {
    setStartIndex((prevIndex) => {
      const nextIndex = prevIndex + itemsPerPage;
      return nextIndex >= movies.length ? prevIndex : nextIndex;
    });
  };

	const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + itemsPerPage >= movies.length;

  return (
		<section className="container mx-auto">
		<h2 className="text-2xl font-bold my-4 ml-5">{genre}</h2>
		<div className="flex items-center">
			{/* Botón izquierdo */}
			<button
				onClick={prevSlide}
				className={`bg-[#1d1d1de7] p-2 h-60 ${isPrevDisabled ? "w-[46px] bg-[#101010] cursor-default" : "cursor-pointer hover:bg-[#2e2d2d]"}`}
				disabled={isPrevDisabled} 
			>
				{!isPrevDisabled && <ChevronLeft size={24} />}
			</button>

			{/* Contenedor de películas con desplazamiento */}
						<div className="w-full overflow-hidden">
							{movies.length===0 && <Skeleton cant={itemsPerPage} />}
							<div
								className="flex transition-transform duration-500"
								style={{ transform: `translateX(-${(startIndex * 100) / itemsPerPage}%)` }}
							>
								{movies.map((movie) => (
									<Link
										to={`/detalles/${movie._id}`}
										key={movie._id}
										onClick={() => window.scrollTo(0, 0)}
										className="relative group hover:scale-105  transition-transform transform" 
										style={{
											minWidth: `${100 / itemsPerPage}%`, // Ajusta el ancho de las películas visibles
										}}
									>
										<img
											src={movie.poster}
											alt={movie.title}
											className="h-60 w-full object-cover rounded-lg shadow-lg px-1"
											loading="lazy"
										/>
										<div className="absolute bottom-0 left-0 w-[95.5%] bg-black text-white text-center text-sm font-semibold py-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-sm mx-1">
											{movie.title}
										</div>
									</Link>
								))}
							</div>
						</div>

			<button
				onClick={nextSlide}
				className={`bg-[#1d1d1de7] p-2 h-60 ${isNextDisabled ? "w-[46px] bg-[#101010] cursor-default" : "cursor-pointer hover:bg-[#2e2d2d]"}`}
				disabled={isNextDisabled}
			>
				{!isNextDisabled && <ChevronRight size={30} />}
			</button>
		</div>
	</section>
  );
};

export default TypeCatalogo;
