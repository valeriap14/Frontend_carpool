
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

import HistorialViaje from "./pages/AdmiHistorial";
import AdmiPasajero from "./pages/admiPasajero";
import AdmiConductor from "./pages/admiConductor";
import AdmiViajeDetalle from "./pages/admiHistorialDetalles";
import AdmiVerPasajero from "./pages/admiVerPasajero";
import AdmiVerConductor from "./pages/admiVerConductor";
import AdmiHistorialReserva from "./pages/AdmiHistorialReserva";
import AdmiUsuarioInactivos from "./pages/admiUsuarioInactivos";

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
          
          <Route path="/Admi/HistorialViajes" element={<HistorialViaje />} />
          <Route path="/Admi/Pasajero" element={<AdmiPasajero />} />
          <Route path="/Admi/Conductor" element={<AdmiConductor />} />
          <Route path="/Admi/ViajeDetalles/:id" element={<AdmiViajeDetalle />} />
          <Route path="/Admi/InfoPasajero/:id" element={<AdmiVerPasajero />} />
          <Route path="/Admi/InfoConductor/:id" element={<AdmiVerConductor />} />
          <Route path="/Admi/HistorialReserva" element={<AdmiHistorialReserva />} />
          <Route path="/Admi/UsuariosInactivos" element={<AdmiUsuarioInactivos />} />
      </Routes>

       
        
    </Router>
  );
}

export default App;

