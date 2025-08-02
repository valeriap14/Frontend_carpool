import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wa-backend-loop-dev-a3b8gpcxbybrhpcn.eastus-01.azurewebsites.net/api/',  

});
api.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

api.checkUniqueField = async (field, value) => {
  try {
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
