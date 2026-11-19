const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },
  // v2 (hallazgo 3): la URL del servicio vive en la configuración.
  // Para otro ambiente: npx cypress run --env apiUrl=https://otro-ambiente
  env: {
    apiUrl: "https://api.demoblaze.com",
  },
});
