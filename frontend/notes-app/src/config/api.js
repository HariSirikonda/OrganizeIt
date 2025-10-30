const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/create-account`,
    GOOGLE_AUTH: `${API_BASE_URL}/auth/google`,
    FORGOT_PASSWORD: `${API_BASE_URL}/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/reset-password`,
  },
  NOTES: {
    GET_ALL: `${API_BASE_URL}/notes`,
    CREATE: `${API_BASE_URL}/create-note`,
    UPDATE: (id) => `${API_BASE_URL}/edit-note/${id}`,
    DELETE: (id) => `${API_BASE_URL}/delete-note/${id}`,
    TOGGLE_PIN: (id) => `${API_BASE_URL}/update-note/${id}`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/update-profile`,
  }
};

export default API_ENDPOINTS;
