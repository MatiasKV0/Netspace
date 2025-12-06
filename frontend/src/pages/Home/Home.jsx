import TypeCatalogo from '../../components/catalogo/TypeCatalogo';
import CarruselLogo from '../../components/animaciones/CarruselLogo/CarruselLogo';

import { Link } from 'react-router-dom';

function Home() {

  const genres = [
    "Horror", "Animation", "Romance", "Action", "Mystery",
    "Sci-Fi", "History", "Comedy", "Drama", "Fantasy",
    "Family", "Crime", "Music", "Biography"
  ];

  return (
    <>
      <div className="container-content overflow-hidden h-[60vh] relative">
        <img
          src="https://assets.mubicdn.net/images/film/3440/image-w1280.jpg?1625742970"
          alt="Terminator 2: Judgment Day"
          className="w-full object-cover -translate-y-20"
        />
        <Link
          to="/detalles/573a1399f29313caabcecc44"
          className="absolute inset-0 flex items-end justify-start z-1 text-white text-5xl font-bold bg-black/50 p-10"
        >
          Terminator 2: Judgment Day
        </Link>
      </div>

      <section className="container mx-auto justify-center">
        {
          genres.map((genre, index) => (
              <TypeCatalogo key={index} genre={genre} />
          ))}
      </section>

      <CarruselLogo />

    </>
  );
}

export default Home;
