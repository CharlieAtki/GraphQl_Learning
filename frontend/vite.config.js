import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tailwindcss from "@tailwindcss/vite"
import path from 'path' // Add this import

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
      globals: {
        crypto: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Add this alias configuration
    }
  }
})