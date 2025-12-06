import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FaSearch } from 'react-icons/fa';

import { useCatalogo } from "../../context/CatalogoContext";
import { useBusqueda } from "../../context/BusquedaContext";

import AuthContext from '../../context/AuthContext';

function Header() {
	const location = useLocation();
	const { setPage } = useCatalogo();
	const { valor, setValor } = useBusqueda();
	const [inputValue, setInputValue] = useState("");
	const [show, setShow] = useState(false);

	const { auth, cerrarSesion } = useContext(AuthContext);

	const token = localStorage.getItem("token");

	const navigate = useNavigate();

	useEffect(() => {
    const timer = setTimeout(() => {
      setValor(inputValue); 
    }, 1000); 

    return () => clearTimeout(timer);
  }, [inputValue]); 

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (valor) {
			navigate(`/busqueda?search=${valor}`);
    }
  }, [valor]); 

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	function reset(){
		setInputValue("");
		setPage(1);
	}

	function handleClick() {
		cerrarSesion();
		setShow(false);
	}

	return (
		<>
			<header className="flex items-center justify-between p-4 bg-[#101010] fixed w-full z-10 border-b-[1px] border-[#333]">
				<Link to="/" className="text-red-500 font-extrabold text-xl">NETSPACE</Link>
				<nav className="flex-1 ml-8">
					<ul className="flex space-x-4 text-white">
						<li className={`hover:text-gray-400 cursor-pointer ${location.pathname === '/' ? 'font-bold' : ''}`}>
							<Link to="/" onClick={() => reset()}>Home</Link>
						</li>
						<li className={`hover:text-gray-400 cursor-pointer ${location.pathname === '/series' ? 'font-bold' : ''}`}>
							<Link to="/series" onClick={() => reset()}>Series</Link>
						</li>
						<li className={`hover:text-gray-400 cursor-pointer ${location.pathname === '/movies' ? 'font-bold' : ''}`}>
							<Link to="/movies" onClick={() => reset()}>Movies</Link>
						</li>
						<li className={`hover:text-gray-400 cursor-pointer ${location.pathname === '/new' ? 'font-bold' : ''}`}>
							<Link to="/new" onClick={() => reset()}>Popular New</Link>
						</li>
						{token && auth && <li className={`hover:text-gray-400 cursor-pointer ${location.pathname === '/list' ? 'font-bold' : ''}`}>
							<Link to="/mylist" onClick={() => reset()}>My List</Link>
						</li>}
					</ul>
				</nav>
				<div className="flex items-center">
					<FaSearch 
						className="text-white text-xl mr-4 cursor-pointer" 
						onClick={() => document.querySelector('input[type="text"]').focus()} 
					/>
					<input 
						type="text" 
						placeholder="Type here..." 
						className="bg-[#333] text-white p-1 rounded-md w-2/3 mr-7"
						value={inputValue}
						onChange={handleChange}
					/>
					<button to={`/profile`} onClick={() => setShow(!show)}>
						<img
							src={auth?.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
							alt="User Avatar"
							className="h-8 rounded-full cursor-pointer"
						/>
					</button>
					{show && (
						<div className="absolute right-0 top-3 mt-10 border-white z-10 border-1 bg-[#333] text-white w-[150px] p-3 m-2 rounded-md">
							<ul>
								{!token && !auth && <li className="hover:text-gray-400 cursor-pointer">
									<Link to="/sign_in" onClick={()=>setShow(false)}>Sign in</Link>
								</li>}
								{token && auth && <li className="hover:text-gray-400 cursor-pointer">
									<Link to="/profile" onClick={()=>setShow(false)}>Profile</Link>
								</li>}
								{token && auth && <li className="hover:text-gray-400 cursor-pointer">
									<Link to="/" onClick={()=>handleClick()}>Sign out</Link>
								</li>}
							</ul>
						</div>
					)}
				</div>
			</header>
			<div className="h-[64px]"></div>
		</>
	);
}

export default Header;
