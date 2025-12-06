import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CatalogoProvider } from './context/CatalogoContext';
import { BusquedaProvider } from './context/BusquedaContext';
import { AuthProvider } from './context/AuthContext';

import PrincipalLayout from './layouts/PrincipalLayout';

import Home from './pages/Home/Home';
import Series from './pages/series/Series';
import Movies from './pages/movies/Movies';
import Novedades from './pages/novedades/Novedades';
import Detalles from './pages/detalles/Detalles';
import Busqueda from './pages/busqueda/Busqueda';
import Favoritos from './pages/favoritos/Favoritos';

import Signin from './pages/login/Signin';
import Signup from './pages/login/Signup';
import Confirm from './pages/login/Confirm';

import Profile from './pages/user/Profile';

import Error from './components/errores/Error';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CatalogoProvider>
          <BusquedaProvider>
            <Routes>
              <Route element={<PrincipalLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/series" element={<Series />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/detalles/:id" element={<Detalles />} />
                <Route path="/new" element={<Novedades />} />
                <Route path="/busqueda" element={<Busqueda />} />
                <Route path="/mylist" element={<Favoritos/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path='/sign_in' element={<Signin />} />
                <Route path='/sign_up' element={<Signup />} />
                <Route path='/confirm/:token' element={<Confirm/>} />
              </Route>
            </Routes>
          </BusquedaProvider>
        </CatalogoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
