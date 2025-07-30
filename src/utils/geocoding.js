export const geocodeAddress = async (direccion) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=HN&q=${encodeURIComponent(direccion + ', Honduras')}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'es'  
      }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error('No se encontraron coordenadas para la dirección');
    }
  } catch (error) {
    console.error('Error al geocodificar dirección:', error);
    return null;
  }
};
