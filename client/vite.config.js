import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ทำให้ Vite ฟังที่ทุก IP ในเครือข่าย
    port: 5173, // ตั้งค่าพอร์ต
  }
});