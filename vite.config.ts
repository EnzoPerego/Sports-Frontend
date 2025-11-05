import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/agenda': {
        target: 'http://18.231.197.236:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/agenda/, '')
      },
      '/api/booking': {
        target: 'http://18.231.197.236:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/booking/, '')
      },
      '/api/payment': {
        target: 'http://18.231.197.236:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/payment/, '')
      }
    }
  }
})
