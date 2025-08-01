import { useEffect, useState } from "react";
import api from '../api/api';
import '../styles/img.css';
import defaultCarnet from '../assets/carnet.png';

function ImagenVehiculo({id, alt='Foto de carnet'}){

    const [imagenUrl, setImagenUrl] = useState('');
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const obtenerImagen = async () =>{

            try{

                const response = await api.get(`vehiculo/fotoVehiculo/${id}`);

                setImagenUrl(response.data.url);
                console.log(response.data.url);

            }catch(error){
                    console.error('Eror al obtener la imagen del carnet', error);
                    setImagenUrl('');

             }finally {
                setLoading(false);
             }
            

        }

          if(id){
                obtenerImagen();
        }
    }, [id]);

    return(
        
        <div>
            {
                loading ? (
                    
                    <p>...</p>
                ): (
                    
                    <img src={imagenUrl || defaultCarnet} alt={alt} className="carnet-photo"></img>
                    

                )
            }



        </div>

    );
  

}

export default ImagenVehiculo;