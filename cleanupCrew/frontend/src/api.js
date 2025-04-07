import axios from 'axios';

// Create an Axios instance with the base URL of the backend
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL de votre backend
  // Remove default Content-Type header
});

// Function to log in a user using Basic Auth
export const loginUser = async (email, password) => {
  try {
    // Encode email:password in Base64 for Basic Auth
    const credentials = `${email}:${password}`;
    const base64Credentials = btoa(credentials); // btoa() encodes to Base64
    const authHeader = `Basic ${base64Credentials}`;

    // Send the request with the Authorization header
    const response = await api.post('/api/users/login', null, {
      headers: {
        Authorization: authHeader,
      },
    });

    return response.data; // { message: "Login successful", token: "..." }
  } catch (error) {
    // Handle cases where error.response is undefined (e.g., network error)
    if (error.response && error.response.data) {
      throw error.response.data; // { message: "Missing Authorization header" }
    } else {
      throw { message: 'Network error or server not responding' };
    }
  }
};

// Function to set the token in the headers for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;