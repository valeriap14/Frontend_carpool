import { useState, useEffect, useContext,useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import '../styles/RegistrarUsuario.css';
import loopLogo from '../assets/loop.png';
import camara from '../assets/editar.png';
import '../styles/editarUsuario.css';
import ImagenPerfil from '../pages/fotoPerfil';
import ImagenCarnet from '../pages/fotoCarnet';

function EditarUsuario() {
  const { usuario } = useContext(AuthContext);
  
  const navigate = useNavigate();
   const inputPerfilRef = useRef(null);
  const [ setImagenPerfil] = useState(null);
     const inputCarnetRef = useRef(null);
  const [ setCarnet] = useState(null);
   const {
       register,
       handleSubmit,
     
       setValue,
       formState: { errors }
     } = useForm({ mode: 'onChange' });


 

  useEffect(() => {
    if (usuario) {
      
    setValue("nombre", usuario.nombre || "");
    setValue("apellido", usuario.apellido || "");
    setValue("telefono", usuario.telefono || "");
    setValue("password", "");
     }
}, [usuario, setValue]);


 

  const handleClickImagenPerfil = () => {
    if (inputPerfilRef.current) {
      inputPerfilRef.current.click();
    }
  };

  const handleImagenPerfilChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("fotoPerfil", file); 

    try {
      const response = await api.put(`usuarios/actualizarFotoPerfil/${usuario.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        setImagenPerfil(URL.createObjectURL(file));
      }

      setTimeout(() => {
      window.location.reload();
    }, 1500);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir la imagen.");
    }
  };

  const preCarnet = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("fotoCarnet", file); 

    try {
      const response = await api.put(`usuarios/actualizarFotoCarnet/${usuario.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        setCarnet(URL.createObjectURL(file));
      }

      setTimeout(() => {
      window.location.reload();
    }, 1500);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir la imagen.");
    }
  };
  const clickCarnet = () => {
    if (inputCarnetRef.current) {
      inputCarnetRef.current.click();
    }
  };
    
//${usuario.correo}
  const guardarCambios = async (datos) => {
    try {
      const response = await api.put(`usuarios/actualizacion/${usuario.correo}`, {
        telefono: datos.telefono
      });

       if (datos.password) {
      await api.put(`usuarios/actualizacionContra/${usuario.correo}`, {
        contrasena: datos.password
      });
      alert("Contraseña actualizada.");
    }


      if (response) {
        if (usuario.rolNombre === 'Conductor') {
          navigate('/inicioconductor', {
            state: { mensaje: `Datos actualizados` }
          });
        } else if (usuario.rolNombre === 'Pasajero') {
          navigate('/iniciopasajero', {
            state: { mensaje: `Datos actualizados` }
          });
        } else {
          alert('Rol de usuario no reconocido.');
        }
      }


      alert('Se guardaron cambios');
    } catch (error) {
      console.error('error al actualizar:', error);
    }
  };

  const handleCancel = () => {
    if (usuario.rolNombre === 'Conductor') {
      navigate('/inicioconductor', {
        state: { mensaje: `Operación cancelada` }
      });
    } else if (usuario.rolNombre === 'Pasajero') {
      navigate('/iniciopasajero', {
        state: { mensaje: `Operación cancelada` }
      });
    } else {
      alert('Rol de usuario no reconocido.');
    }
    
  };

  

   if (!usuario) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <main className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit(guardarCambios)}>

         <div className="registro-logo-container">
          <img src={loopLogo} alt="Loop Logo" className="registro-loop-logo-img" />
        </div>
          <h1 className="edit-profile-title">Editar Perfil</h1>

    <div  className='avatar-wrapper'>
      
              <ImagenPerfil id={usuario.id} tamaño={120} />

                <input
                type="file"
                accept="image/*"
                ref={inputPerfilRef}
                onChange={handleImagenPerfilChange}
                style={{ display: "none" }}
              />
               <button
              size="sm"
              variant="outline"
              className="camera-button"
            > 
              <img src={camara} className="camera-icon" alt={'fotoPerfil'} onClick={handleClickImagenPerfil}/>

            </button>
        </div>


      <div className='document'>
        
            <ImagenCarnet id={usuario.id}/>
            <input
                type="file"
                accept="image/*"
                ref={inputCarnetRef}
                onChange={preCarnet}
                style={{ display: "none" }}
              />

            <button
                    size="sm"
                    variant="outline"
                    className="camera-button"
                  > 
                    <img src={camara} className="camera-icon"  alt={'fotoCarnet'} onClick={clickCarnet}/>

                  </button>
        </div>
 

        <div className="campo">
          <label htmlFor="telefono">Telefono:</label>
         <input
              type="text"
              {...register("telefono", {
                required: "Teléfono es requerido",
                pattern: {
                  value: /^\d{4}-\d{4}$/,
                  message: "Formato inválido (Ej: 9876-1234)"
                }
              })}
            />
              {errors.telefono && <p>{errors.telefono.message}</p>}
        </div>
       

    
          <div className="campo">
            <label htmlFor="password">Ingrese contraseña nueva:</label>
            <input
                type="password"
                {...register("password", {
                  validate: (value) =>
                    !value || value.length >= 8 || "La contraseña debe tener al menos 8 caracteres"
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
          </div>
        

        <div className="registro-botones">
           <button
            type="submit"
          >
          Guardar
          </button>
          <button type="button" className="cancelar" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditarUsuario;
