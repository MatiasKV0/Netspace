
import Button from "./Button"

function Paginador({ page, setPage, totalPages }) {

	return (
		<div className="flex gap-3 justify-center px-4 py-2 items-center">
			<Button accion={setPage} page={page} operacion='First' label='<<' disponible={page>2 ? true : false} />
			<Button accion={setPage} page={page} operacion='Prev' label='<' disponible={page > 1 ? true : false} />
			<h2 className="font-bold">{page}</h2>
			<Button accion={setPage} page={page} operacion='Next' label='>' disponible={page < totalPages ? true : false} />
			<Button accion={setPage} page={page} operacion='Last' label='>>' total={totalPages} disponible={page < totalPages-1 ? true : false}/>
		</div>
	)
}

export default Paginador