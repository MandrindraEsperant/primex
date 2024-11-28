import axios from 'axios';
// import { AccountService } from './_services/Account.service';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

// Intercepteur pour ajouter le token dans les en-têtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Intercepteur pour gérer l'expiration du token
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       AccountService.logout();
//       window.location.href = '/auth/login';
//     return Promise.reject(error);
//   }}
// );

export default api;
