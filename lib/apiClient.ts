import axios from 'axios';
import { API_BASE_URL } from '@/lib/config';

// 1. Create a new axios instance with a pre-configured base URL.
// This means you can just call `apiClient.get('/products')`
// instead of `axios.get('http://localhost:3000/api/products')`.
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add an Interceptor (This is the "production-level" part)
// Interceptors let you "intercept" requests or responses before they are
// handled by your components. This is perfect for adding an auth token.
//
// When you add Clerk, you can update this to:
//
// apiClient.interceptors.request.use(async (config) => {
//   // Get the token from Clerk's `auth()` helper
//   const token = await auth().getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;