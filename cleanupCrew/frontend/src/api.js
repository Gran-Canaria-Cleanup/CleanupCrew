import axios from 'axios';

// Create an Axios instance with the base URL of the backend
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL de votre backend
});

// Function to log in a user using Basic Auth
export const loginUser = async (email, password) => {
  try {
    // Encode email:password in Base64 for Basic Auth
    const credentials = `${email}:${password}`;
    const base64Credentials = btoa(credentials);
    const authHeader = `Basic ${base64Credentials}`;

    // Send the request with the Authorization header
    const response = await api.post('/api/users/login', null, {
      headers: {
        Authorization: authHeader,
      },
    });

    // Store token and user in localStorage
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data; // { message: "Login successful", token: "...", user: { id, name, email, score } }
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: 'Network error or server not responding' };
    }
  }
};

// Function to get the current user's information
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/users/me');
    return response.data; // { id, name, email, score }
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: 'Network error or server not responding' };
    }
  }
};

// Function to get the user's daily goals
export const getDailyGoals = async () => {
  try {
    const response = await api.get('/api/goals');
    return response.data; // { glass: 20, paper: 20, plastic: 20 }
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: 'Network error or server not responding' };
    }
  }
};

// Function to get the user's daily progress
export const getDailyProgress = async () => {
  try {
    const response = await api.get('/api/waste');
    return response.data; // { glass: 16, paper: 9, plastic: 15 }
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { message: 'Network error or server not responding' };
    }
  }
};

// Function to add a piece of trash
export const addTrash = async (type, quantity = 1) => {
  try {
    const response = await api.post('/api/waste/collect', { type, quantity }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // { message: "Trash added successfully", progress: { glass: 17, paper: 9, plastic: 15 } }
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
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