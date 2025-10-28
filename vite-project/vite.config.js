import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optional – React Compiler (you already have the babel plugin)
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
