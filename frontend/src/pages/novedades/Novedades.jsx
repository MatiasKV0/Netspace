import Catalogo from "../../components/catalogo/Catalogo"
import Filtro from "../../components/filtro/Filtro"

function Novedades() {
	return (
		<>
			<Filtro title="Popular New" url="new"/>
			<Catalogo typeUrl="new" limit={112}/>
		</>
	)
}

export default Novedades