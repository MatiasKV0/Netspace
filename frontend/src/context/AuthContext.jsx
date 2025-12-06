import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [favorite, setFavorite] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        autenticarUsuario();
    },[])

    const autenticarUsuario = async()=>{
      const token = localStorage.getItem('token');
      if(!token) {
          setCargando(false);
          return;
      }

      const config = {
        headers: { "x-auth-token": token },
      }

      try {
          const {data} = await clienteAxios('/user/profile',config);
          setAuth(data);
      } catch (error) {
          console.log(error.response.data.msg);
          localStorage.removeItem('token');
          setAuth(null);
      }

      setCargando(false);
  }

    const actualizarUsuario = async (userData) => {
      setCargando(true);
      const { name, profilePicture, genres } = userData;

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Unauthorized");
        setCargando(false);
        return;
      }

      const formData = new FormData();
      if (name) formData.append("name", name);
      if (profilePicture) formData.append("profilePicture", profilePicture);
      if (genres) formData.append("genres", genres);
      try {
        const { data } = await clienteAxios.put("/user/profile", formData, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        });
        setAuth((prevAuth) => ({
          ...prevAuth,
          name: data.updates.name || prevAuth.name,
          genres: data.updates.genres || prevAuth.genres,
          profilePicture: data.updates.profilePicture
            ? "data:image/jpeg;base64," + data.updates.profilePicture
            : prevAuth.profilePicture,
        }));
        
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };

    const updateFavorite = async (id,add) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Unauthorized");
        setCargando(false);
        return;
      }
      try {
        const { data } = await clienteAxios.post("/user/mylist", { id, add }, {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    const getFavorite = async () => {
      setCargando(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Unauthorized");
        setCargando(false);
        return;
      }
      try {
        const { data } = await clienteAxios.get("/user/mylist", {
          headers: {
            "x-auth-token": token,
          },
        });
        setFavorite(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
  
    const cerrarSesion = () =>{
        localStorage.removeItem('token');
        setAuth(null);
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                favorite,
                updateFavorite,
                getFavorite,
                autenticarUsuario,
                actualizarUsuario,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext