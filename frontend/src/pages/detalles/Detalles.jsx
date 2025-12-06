import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import clienteAxios from "../../config/axios";

import TypeCatalogo from "../../components/catalogo/TypeCatalogo";
import Error from "../../components/errores/Error";
import Spinner from "../../components/loading/Spinner";
import CarruselLogo from "../../components/animaciones/CarruselLogo/CarruselLogo";

import { FaHeart } from 'react-icons/fa';

function Detalles() {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [add, setAdd] = useState(null);
  const [loading, setLoading] = useState(false);
  const {updateFavorite, auth, autenticarUsuario} = useAuth();

  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get(`/detalles/${id}`);
        setData(response.data);
      } catch (error) {
        setResponse(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (auth && auth.list?.map(obj => obj.toString()).includes(id)) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }, [auth, id]);

  const handleFavorite = async () => {
    if(loading) return;
    setLoading(true);
    const newAdd = !add;
    setAdd(newAdd);
    await updateFavorite(id, newAdd);
    await autenticarUsuario();
    setLoading(false);
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      {response && <Error mensaje={response} />}
      <section className="max-w-6xl mx-auto p-4 shadow-lg rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6">
        {data.poster && (
          <img
            src={data.poster}
            alt={data.title || "No title available"}
            className="w-full md:h-[550px] md:w-1/3 object-cover rounded-xl"
          />
        )}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-end">
            <div>
            {data.title && <span className="text-4xl font-bold">{data.title}</span>}
            {data.year && <span className="text-lg text-gray-500 mt-1 mx-3">({data.year})</span>}
            </div>
            {token ? <button><FaHeart color={add ? "red" : "#555"} onClick={()=>handleFavorite()} size={30} className="cursor-pointer mx-3"/></button> : null}
          </div>
          {data.plot && <p className="text-sm text-gray-600 mt-2">{data.plot}</p>}
          {data.fullplot && <p className="text-sm text-gray-600 mt-2">{data.fullplot}</p>}

          {data.genres && data.genres.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-3">
              {data.genres.map((genre, index) => (
                <li key={index} className="bg-blue-500 text-white px-2 py-1 rounded">{genre}</li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {data.imdb?.rating && <span className="text-lg font-semibold">{data.imdb.rating} / 10</span>}
            {data.imdb?.votes && <span className="text-gray-500">({data.imdb.votes} votes)</span>}
            {data.runtime && <p className="text-gray-700">• {data.runtime} min</p>}
            {data.countries && <p className="text-gray-700">• {data.countries.join(", ")}</p>}
          </div>

          {data.cast && data.cast.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold">Cast:</h3>
              <p className="text-gray-600">{data.cast.join(", ")}</p>
            </div>
          )}

          {data.directors && data.directors.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold">Directors:</h3>
              <p className="text-gray-600">{data.directors.join(", ")}</p>
            </div>
          )}

          {data.writers && data.writers.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold">Writers:</h3>
              <p className="text-gray-600">{data.writers.join(", ")}</p>
            </div>
          )}

          {data.awards?.text && (
            <div className="mt-3 text-sm text-gray-500">
              <p>{data.awards.text}</p>
            </div>
          )}

          {data.tomatoes?.critic && (
            <div className="mt-3">
              <h3 className="font-semibold">Critic Reviews:</h3>
              <p className="text-gray-600">{data.tomatoes.critic.meter}% ({data.tomatoes.critic.numReviews} reviews)</p>
            </div>
          )}

          {data.tomatoes?.viewer?.meter && (
            <div className="mt-3">
              <h3 className="font-semibold">Viewer Reviews:</h3>
              <p className="text-gray-600">{data.tomatoes.viewer.meter}% ({data.tomatoes.viewer.numReviews} reviews)</p>
            </div>
          )}

          {data.boxOffice && (
            <div className="mt-3">
              <h3 className="font-semibold">Box Office:</h3>
              <p className="text-gray-600">{data.boxOffice}</p>
            </div>
          )}
        </div>
      </section>
      <CarruselLogo />
      <div className="flex flex-col gap-5">
        {data.genres?.[0] && <TypeCatalogo genre={data.genres[0]} />}
        {data.genres?.[1] && <TypeCatalogo genre={data.genres[1]} />}
        {data.genres?.[2] && <TypeCatalogo genre={data.genres[2]} />}
      </div>
    </>
  );
}

export default Detalles;