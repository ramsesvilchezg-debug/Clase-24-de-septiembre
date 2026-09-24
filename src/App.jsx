import { BrowserRouter as Router, Route, Routes, Navigate,Link } from 'react-router-dom';

import Inicio from "./Componentes/inicio"
import Usuario from "./Componentes/usuario"
import Pokemon from "./Componentes/pokemon"
import Coleccion from "./Componentes/coleccion"
import Favoritos from "./Componentes/favoritos"
import Info from "./Componentes/info"

import './App.css'

function App() {

  return (
    <>
    <Router>

      <nav className="c-menu">
        <Link to="/">Inicio</Link>
        <Link to="/coleccion">Coleccion</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/usuario">Usuarios</Link>
        <Link to="/pokemon">Pokemon</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Inicio /> } />
        <Route path='/coleccion' element={<Coleccion /> } />
        <Route path='/favoritos' element={<Favoritos /> } />
        <Route path='/pokemon/:name' element={<Pokemon />} />
        <Route path='/usuario' element={<Usuario /> } />

      </Routes>
    </Router>
    </>
  )
}

export default App
