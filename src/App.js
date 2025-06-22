import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <nav style={{ margin: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Inicio</Link>
        <Link to="/login">Iniciar Sesion</Link>
        <Link to="/registrarusuario" style={{ marginRight: 10 }}>Registro</Link>
        <Link to="/login">Iniciar Sesion</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarusuario" element={<RegistrarUsuario />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
