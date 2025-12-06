import Catalogo from "../../components/catalogo/Catalogo"
import Filtro from "../../components/filtro/Filtro"

function Series() {
  return (
    <>
      <Filtro title="Series" url="series"/>
      <Catalogo typeUrl="series" limit={112} />
    </>
  )
}

export default Series