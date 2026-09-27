import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works on GitHub Pages (project sub-path) and locally
  base: './',
  plugins: [react()],
})
