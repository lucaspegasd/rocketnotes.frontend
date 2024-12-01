import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0', // Permite acesso de qualquer endereço IP
    port: 5175, // Porta padrão do Vite
    open: true, // Abre o navegador automaticamente
  },
});
