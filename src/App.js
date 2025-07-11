
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import Login from "./pages/Login";
import InicioConductor from "./pages/InicioConductor";
import InicioPasajero from './pages/InicioPasajero';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarusuario" element={<RegistrarUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicioconductor" element={<InicioConductor />} />
        <Route path="/iniciopasajero" element={<InicioPasajero />} />

      </Routes>

       
        
    </Router>
  );
}

export default App;
