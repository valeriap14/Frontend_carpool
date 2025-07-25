import Menu from "./admi";
import '../styles/tablas.css';
import React from 'react';

import { useState} from 'react';

function Pasajero(){
        const usuarios = [
    { nombre: 'Jose Anthonio', apellido: 'Alvarez Rodriguez', correo: 'jose.alvarez@unah.hn', celular: '31481092' },
    { nombre: 'Maria Jese', apellido: 'Gomez Caceres', correo: 'maria.gomez@unah.hn', celular: '31888888' },
    { nombre: 'Luis Nombre', apellido: 'Perez Nombre', correo: 'luis.perez@unah.hn', celular: '31234567' },
    { nombre: 'Ana Nombre', apellido: 'Lopez Nombre', correo: 'ana.lopez@unah.hn', celular: '31999999' },
    { nombre: 'Carlos Nombre', apellido: 'Martinez Nombre', correo: 'carlos.m@unah.hn', celular: '31123456' },
    { nombre: 'Lucia Nombre', apellido: 'Diaz Nombre', correo: 'lucia.diaz@unah.hn', celular: '31098765' },
    { nombre: 'Lucia Nombre', apellido: 'Diaz Nombre', correo: 'lucia.diaz@unah.hn', celular: '31098765' },
    { nombre: 'Jose Anthonio', apellido: 'Alvarez Rodriguez', correo: 'jose.alvarez@unah.hn', celular: '31481092' },
    { nombre: 'Maria Jese', apellido: 'Gomez Caceres', correo: 'maria.gomez@unah.hn', celular: '31888888' },
    { nombre: 'Luis Nombre', apellido: 'Perez Nombre', correo: 'luis.perez@unah.hn', celular: '31234567' },
    { nombre: 'Ana Nombre', apellido: 'Lopez Nombre', correo: 'ana.lopez@unah.hn', celular: '31999999' },
    { nombre: 'Carlos Nombre', apellido: 'Martinez Nombre', correo: 'carlos.m@unah.hn', celular: '31123456' },
    { nombre: 'Lucia Nombre', apellido: 'Diaz Nombre', correo: 'lucia.diaz@unah.hn', celular: '31098765' },
    { nombre: 'Lucia Nombre', apellido: 'Diaz Nombre', correo: 'lucia.diaz@unah.hn', celular: '31098765' },
   
  ];

  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 4;

  const usuariosFiltrados = usuarios.filter(usuario =>
    Object.values(usuario).some(valor =>
      valor.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(inicio, inicio + registrosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

   

        return(
          
          <Menu>
              <div className="contenedor-blanco">
              <div className="contenedor-usuarios">
    
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="input-buscar"
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPaginaActual(1);
                  }}
              />

              <div className="tabla-responsive">
                <table className="tabla-usuarios">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Correo Electrónico</th>
                      <th>Celular</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosPaginados.length > 0 ? (
                      usuariosPaginados.map((u, i) => (
                        <tr key={i}>
                          <td>{u.nombre}</td>
                          <td>{u.apellido}</td>
                          <td>{u.correo}</td>
                          <td>{u.celular}</td>
                          <td>
                            <button className="boton-revisar">Revisar</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No se encontraron resultados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="paginacion">
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                  Anterior
                </button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                  Siguiente
                </button>
              </div>
            </div>
          </div>
         
             
          </Menu>

        );


}
export default Pasajero;