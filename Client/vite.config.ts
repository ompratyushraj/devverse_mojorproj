import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  server: {
    host: true, // Or specify '0.0.0.0' to bind to all interfaces
    port: 5173, // Optional: specify the port
  },
  plugins: [react()],
})
