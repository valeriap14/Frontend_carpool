import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const center = { lat: 14.0723, lng: -87.1921 };

function MapaRuta({ origen, destino }) {
  const [directions, setDirections] = useState(null);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCkLP89OtEdjEj5f9Ez3bAPrfHUFgUK_cM"
  });

  useEffect(() => {
    if (!isLoaded || !origen || !destino) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origen,
        destination: destino,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error('Error al calcular la ruta', status);
        }
      }
    );
  }, [isLoaded, origen, destino]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default MapaRuta;