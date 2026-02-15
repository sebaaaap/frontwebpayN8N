import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'cuddly-hairs-obey.loca.lt' // Aquí es donde va la URL del túnel
    ]
  }
})