import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // caminhos relativos: funciona no GitHub Pages (/Meuportifolio/) e em qualquer outra pasta
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(root, 'assets'),
      '@': path.resolve(root, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
