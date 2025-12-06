import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import clienteAxios from "../../config/axios";
import Error from "../errores/Error";

function BusquedaCatalogo({search}) {

    const [limit, setLimit] = useState(35);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await clienteAxios.get(`/busqueda?search=${search}&limit=${limit}`);
                setData(response.data.results);
                console.log(response.data);
                window.scrollTo(0, 0);
            } catch (error) {
                setResponse("An Error has occurred: "+error.message);
            }
        };

        fetchData();

        setTimeout(() => {
            setLoading(true);
        }, 2000);
    }, [search]);

    return (
        <>
            <section className="container mx-auto justify-center">
               {response && <Error mensaje={response}/>}
               {data.length === 0 && loading && <Error mensaje="No results found"/>}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4">
                    {data.map((result) => (
                        <Link
                            to={`/detalles/${result._id}`}
                            key={result._id}
                            className="relative group cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <img
                                src={result.poster}
                                alt={result.title}
                                className="h-60 w-full object-cover rounded-lg shadow-lg"
                                loading="lazy" 
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-center text-sm font-semibold py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {result.title}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

export default BusquedaCatalogo