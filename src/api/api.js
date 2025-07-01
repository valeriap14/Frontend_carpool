import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Cambiado al puerto 3000
  // No establecer Content-Type globalmente aquí
});

// Interceptor para manejar FormData correctamente
api.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

// Función para verificar campos únicos usando 'correo' en vez de 'email'
api.checkUniqueField = async (field, value) => {
  try {
    // Ahora solo usaremos 'correo' para el email
    const paramName = field === 'correo' ? 'correo' : field;
    const response = await api.get(`/usuarios/check-${field}`, {
      params: { [paramName]: value }
    });
    return response.data.available;
  } catch (error) {
    console.error(`Error verificando ${field}:`, error);
    throw error;
  }
};

export default api;
