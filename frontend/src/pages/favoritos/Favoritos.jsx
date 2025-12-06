import Catalogo from "../../components/catalogo/Catalogo";
import useAuth from "../../hooks/useAuth";

import { useEffect } from "react";

function Favoritos() {
  const { favorite, getFavorite } = useAuth();

  useEffect(() => {
    getFavorite();
  }, []);

  console.log(favorite);

  if (!favorite) return <p>Loading...</p>;

  return (
    <>
      <h2 className=" text-2xl md:text-4xl font-medium md:ml-6 px-6 py-4">My List</h2>
      <Catalogo datadb={favorite} />
    </>
  )
}

export default Favoritos