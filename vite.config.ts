import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'vuexComposition',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: 'vuex-composition'
    },
    rollupOptions: {
      external: ['vue', 'vuex'],
      output: {
        globals: {
          vue: 'Vue',
          vuex: 'Vuex'
        }
      }
    }
  }
})
