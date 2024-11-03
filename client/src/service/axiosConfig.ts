import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { store } from '../store';

const CORE_BACKEND_URL = import.meta.env.VITE_CORE_BACKEND_URL;

export const getToken = () => {
  const state = store.getState();
  return state.user.token;
};

const instance: AxiosInstance = axios.create({
  baseURL: CORE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = getToken() ?? localStorage.getItem('token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // If the data is FormData, remove the Content-Type header
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response, // Just return response if successful
  (error: { response: { status: number } }) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
      localStorage.clear();
    }
    // Return Promise rejection with the error
    return Promise.reject(error);
  }
);

export default instance;
