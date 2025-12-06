import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function PrincipalLayout() {
	return (
		<>
		<main className="bg-[#101010] text-white">
			<Header />
			<Outlet />
			<Footer />
		</main>
		</>
	)
}

export default PrincipalLayout