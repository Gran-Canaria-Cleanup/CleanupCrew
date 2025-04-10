import axios from 'axios';

// Determina el protocolo basado en la variable de entorno VITE_HTTPS
const protocol = import.meta.env.VITE_HTTPS === 'true' ? 'https' : 'http';

// Asigna el host y puerto usando las variables de entorno
const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT;

// Construye la URL base. Si el puerto está definido, se concatena
const baseURL = `${protocol}://${host}${port ? ':' + port : ''}`;

const api = axios.create({
  baseURL,
  // Aquí podrías agregar otras configuraciones predeterminadas si lo necesitas
});

// Función para loguear a un usuario usando Basic Auth
export const loginUser = async (email, password) => {
  try {
    // Codifica en Base64 las credenciales
    const credentials = `${email}:${password}`;
    const base64Credentials = btoa(credentials);
    const authHeader = `Basic ${base64Credentials}`;

    // Envía la petición con el header Authorization
    const response = await api.post('/api/users/login', null, {
      headers: {
        Authorization: authHeader,
      },
    });

    return response.data; // { message: "Login successful", token: "..." }
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: 'Network error or server not responding' };
    }
  }
};

// Función para establecer el token en los headers de peticiones autenticadas
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
