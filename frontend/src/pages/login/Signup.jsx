import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import CarruselLogo from '../../components/animaciones/CarruselLogo/CarruselLogo';
import clienteAxios from '../../config/axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMensaje({});
    }, 5000);
    return () => clearTimeout(timeout);
  }, [mensaje]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMensaje({ msg: "Error: Passwords do not match", type: "red" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensaje({ msg: "Error: Please enter a valid email address", type: "red" });
      return;
    }
  
    if (password.length < 8) {
      setMensaje({ msg: "Error: Password must be at least 8 characters long", type: "red" });
      return;
    }
  
    try {
      const response = await clienteAxios.post(
        "/user/sign_up",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      console.log(data);
      if (response.status === 201) {
        setMensaje({ msg: data, type: "green" });
        setTimeout(() => {
          navigate('/sign_in');
        }, 5000);
      } else {
        setMensaje({ msg: data.message || "Registration failed", type: "red" });
      }
    } catch (error) {
      setMensaje({ msg: error.response.data.msg, type: "red" });
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[112vh]">
      <h2 className="text-3xl font-bold text-center mb-2">Sign up for free</h2>
      <h3 className='mb-8'>Or <Link to={"/sign_in"} className='underline'>sign in to your existing account</Link></h3>
      <div className="w-full max-w-md p-8 bg-[#333] rounded-lg shadow-md">
      {mensaje.msg && <p className={`text-${mensaje.type}-500 text-center font-bold mb-4 text-xl`}>{mensaje.msg}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#101010] rounded-lg hover:bg-[#161616] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    <CarruselLogo/>
    </>
  );
}

export default Signup;