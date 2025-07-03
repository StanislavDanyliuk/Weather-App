import path from 'path'
import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src directory
    },
  },
  server: {
    port: 3000,
    open: true, // Automatically open the browser
  },
})
