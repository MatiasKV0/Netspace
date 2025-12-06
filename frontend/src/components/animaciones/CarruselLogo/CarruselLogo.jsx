import './CarruselLogo.css';

const CarruselLogo = () => {
  const logos = Array(10).fill("Netspace");

  return (
    <div className="overflow-hidden bg-[#151515] py-4 my-5 carrusel-container">
      <div className="flex w-max animate-scroll space-x-16 carrusel-content">
        {logos.concat(logos).map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-2xl font-bold"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};


export default CarruselLogo;
