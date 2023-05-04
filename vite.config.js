import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // eslint-disable-next-line no-undef
  const env = loadEnv('mock', process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/v1': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    },
    envPrefix: 'VITE',
  }
})
