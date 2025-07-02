import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import Login from "./pages/Login";
import InicioLoop from "./pages/inicioloop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarusuario" element={<RegistrarUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicioloop" element={<InicioLoop />} />
      </Routes>
    </Router>
  );
}

export default App;
