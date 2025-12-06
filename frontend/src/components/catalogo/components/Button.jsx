

function Button({ accion, page, operacion, label, total, disponible }) {

  switch (operacion) {
    case "First":
      page = 1;
      break;
    case "Prev":
      page -= 1;
      break;
    case "Next":
      page += 1;
      break;
    case "Last":
      page = total;
      break;
    default:
      break;
  }

  return (
    <button 
    onClick={() => accion(page)} 
    className={`bg-gray-800 text-white font-bold px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out ${disponible ? 'hover:bg-gray-700 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} disabled={!disponible}>
      {label}
    </button>
    )
}

export default Button