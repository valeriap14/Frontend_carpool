
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import RegistrarUsuario from "./pages/RegistrarUsuario";
import Login from "./pages/Login";
import InicioConductor from "./pages/InicioConductor";
import InicioPasajero from './pages/InicioPasajero';
import EditarUsuario from "./pages/editarUsuario";
import ConfirmarReserva from './pages/ConfirmarReserva';

//administrador
import InicioAdmi from "./pages/inicioAdmi";
import HistoriaPasajeros from "./pages/hisPasajero";
import HistorialViaje from "./pages/AdmiHistorial";
import AdmiPasajero from "./pages/admiPasajero";
import AdmiConductor from "./pages/admiConductor";
import AdmiUsuario from "./pages/admiUsuario";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarusuario" element={<RegistrarUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicioconductor" element={<InicioConductor />} />
        <Route path="/iniciopasajero" element={<InicioPasajero />} />
        <Route path="/editarUsuario" element={<EditarUsuario />} />
        <Route path="/confirmar-reserva" element={<ConfirmarReserva />} />


        <Route path="/inicioAdmi" element={<InicioAdmi />} />
          <Route path="/Admi/HistoriaPasajeros" element={<HistoriaPasajeros />} />
          <Route path="/Admi/HistorialViaje" element={<HistorialViaje />} />
          <Route path="/Admi/Pasajero" element={<AdmiPasajero />} />
          <Route path="/Admi/Conductor" element={<AdmiConductor />} />
          <Route path="/Admi/Usuario" element={<AdmiUsuario />} />

      </Routes>

       
        
    </Router>
  );
}

export default App;

