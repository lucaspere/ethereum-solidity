import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src/frontend',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['@nomicfoundation/hardhat-chai-matchers', '@nomicfoundation/hardhat-toolbox-viem', 'hardhat', 'ethers']
  },
});
