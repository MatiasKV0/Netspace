import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import CarruselLogo from '../../components/animaciones/CarruselLogo/CarruselLogo';
import clienteAxios from '../../config/axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({});
  const { autenticarUsuario } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMensaje({});
    }, 4000);
    return () => clearTimeout(timeout);
  }, [mensaje]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensaje({ msg: "Error: Please enter a valid email address", type: "red" });
      return;
    }

    try {
      const response = await clienteAxios.post(
        "/user/sign_in",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setMensaje({ msg: "User logged in successfully", type: "green" });
        autenticarUsuario();
        navigate("/");
        
      } else {
        setMensaje({ msg: data.message || "Login failed", type: "red" });
      }
    } catch (error) {
      setMensaje({ msg: error.response?.data?.msg || "An error occurred", type: "red" });
    }
  };
  

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[85vh]">
      <h2 className="text-3xl font-bold text-center mb-2">Sign in to your account</h2>  
      <h3 className='mb-8'>Or <Link to={"/sign_up"} className='underline'>sign up for a new account</Link></h3>
      <div className="w-full max-w-md p-8 bg-[#333] rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
        {mensaje.msg && <p className={`text-${mensaje.type}-500 text-center font-bold mb-4 text-xl`}>{mensaje.msg}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#101010] rounded-lg hover:bg-[#161616] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
    <CarruselLogo/>
    </>
  );
}

export default Signin;