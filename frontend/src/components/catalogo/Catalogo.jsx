import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useCatalogo } from "../../context/CatalogoContext";

import clienteAxios from "../../config/axios";
import Paginador from "./components/Paginador";
import Error from "../errores/Error";
import Skeleton from "../loading/Skeleton";

function Catalogo({ typeUrl, search, limit, datadb }) {
	const { page, setPage } = useCatalogo();
	const [data, setdata] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);
	const [response, setResponse] = useState(null);

	const [genre, setGenre] = useState('Genres');
	const [order, setOrder] = useState('Newest');

	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		setOrder(queryParams.get("order") || 'Newest');
		setGenre(queryParams.get("genre") || 'Genres');
	}, [location.search]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setdata([]);
				window.scrollTo(0, 0);
				if(datadb){
					setTotalPages(datadb.totalPages);
					setdata(datadb.results);
				}
				else{
					const response = await clienteAxios.get(`/${typeUrl}?page=${page}&limit=${limit}&search=${search}&genre=${genre}&order=${order}`);
					setTotalPages(response.data.totalPages);
					setdata(response.data.results);
				}
				setLoading(false);
			} catch (error) {
				setResponse("An Error has occurred: " + error.message);
				setLoading(false);
			}
		};

		fetchData();

	}, [page, search, order, genre,	datadb]);

	return (
		<>
			<section className="resultados container mx-auto justify-center">
				{loading && <Skeleton cant={28}/>}
				{response && <Error mensaje={response} />}
				{data?.length === 0 && !loading && !response && <Error mensaje="No results found" />}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4 md:gap-y-14">
					{data?.map((element) => (
						<Link
							to={`/detalles/${element._id}`}
							key={element._id}
							className="relative group cursor-pointer transition-transform transform hover:scale-105"
						>
							<div className={element.genres}></div>
							<img
								src={element.poster}
								alt={element.title}
								className="h-60 w-full object-cover rounded-lg shadow-lg"
								loading="lazy"
							/>
							<div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-center text-sm font-semibold py-2 opacity-0 group-hover:opacity-100 transition-opacity">
								{element.title}
							</div>
						</Link>
					))}
				</div>
				{search || response || totalPages===1 || datadb ? null : loading ? <div className="h-[600px]"></div> : <Paginador page={page} setPage={setPage} totalPages={totalPages} />}
			</section>
		</>
	)
}

export default Catalogo