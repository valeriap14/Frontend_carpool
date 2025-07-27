import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapaRutaLeaflet = ({ origen, destino }) => {
  if (!origen || !destino) return <p>Esperando ubicación...</p>;

  const centro = {
    lat: (origen.lat + destino.lat) / 2,
    lng: (origen.lng + destino.lng) / 2
  };

  return (
    <MapContainer center={centro} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={origen} />
      <Marker position={destino} />
      <Polyline positions={[origen, destino]} color="blue" />
    </MapContainer>
  );
};

export default MapaRutaLeaflet;
