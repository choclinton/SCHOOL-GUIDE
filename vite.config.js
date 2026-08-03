import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Suppress chunk size warnings for lesson data files
    chunkSizeWarningLimit: 2000,
  },
  // Ensure React Router works on refresh (Render handles this via redirects file)
  server: {
    historyApiFallback: true,
  },
})
