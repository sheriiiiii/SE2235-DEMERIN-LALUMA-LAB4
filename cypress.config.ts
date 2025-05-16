import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // default port for Next.js
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
