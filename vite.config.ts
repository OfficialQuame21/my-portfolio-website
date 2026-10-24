import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteMetadata } from './vite-plugins/site-metadata'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetadata()],
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
  },
})
