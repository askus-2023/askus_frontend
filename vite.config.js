import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://13.124.76.165:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  envPrefix: 'VITE',
})
