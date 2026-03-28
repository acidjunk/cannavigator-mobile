import axios from 'axios';
import { getApiBaseUrl } from '../config/env';

const apiClient = axios.create({
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  config.baseURL = await getApiBaseUrl();
  return config;
});

export default apiClient;
