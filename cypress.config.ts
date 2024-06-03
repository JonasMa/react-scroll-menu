import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 300,
  viewportHeight: 200,
  screenshotsFolder: ".cypress/screenshots",
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false
  },
});
