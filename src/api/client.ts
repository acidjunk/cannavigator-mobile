import axios from 'axios';
import { getApiBaseUrl } from '../config/env';

const apiClient = axios.create({
  // 60s — generous to cover backend cold-starts and slower pharmacology
  // lookups that join across papers, ligands, and targets.
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  config.baseURL = await getApiBaseUrl();
  return config;
});

export default apiClient;
