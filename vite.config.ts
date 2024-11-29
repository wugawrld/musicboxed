import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
