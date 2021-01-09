import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
//   baseURL: 'https://us-central1-hotel-management-se.cloudfunctions.net/api',
  baseURL: 'http://localhost:5001/e-commerce-123456/us-central1/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  //Process token here
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    throw error.response.data;
  }
);

export default axiosClient;
