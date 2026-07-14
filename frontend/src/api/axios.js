import axios from "axios";

const api = axios.create({
  // Por ahora lo dejaremos apuntando directo a tu backend local
  // Si usas el router '/api' general en tu backend, agrégalo al final de la URL
  baseURL: import.meta.env.VITE_API_URL || 'https://proyecto-restaurante-owmo.onrender.com' 
});

export default api;