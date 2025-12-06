import Catalogo from "../../components/catalogo/Catalogo"
import Filtro from "../../components/filtro/Filtro"


function Movies() {
  return (
    <>
      <Filtro title="Movies" url="movies"/>
      <Catalogo typeUrl="movies" limit={112}/>
    </>
  )
}

export default Movies