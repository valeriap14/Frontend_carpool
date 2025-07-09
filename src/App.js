import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import Login from "./pages/Login";
import InicioLoop from "./pages/inicioloop";
import EditarUsuario from "./pages/editarUsuario";
import Viajes from "./pages/Viajes";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarusuario" element={<RegistrarUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicioloop" element={<InicioLoop />} />
        <Route path="/editarUsuario" element={<EditarUsuario />} />
        <Route path="/Viajes" element={<Viajes />} />
        
      </Routes>

       
        
    </Router>
  );
}

export default App;
