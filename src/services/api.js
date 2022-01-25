import axios from 'axios';

const api = axios.create({
  baseURL: 'https://593cdf8fb56f410011e7e7a9.mockapi.io/',
});

export default api;
