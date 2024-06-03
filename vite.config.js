import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Config for test server only
export default defineConfig({
  plugins: [react()],
  root: './src/tests',
  server: {
    open: true // Automatically open the app in the browser
  }
});