const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // v2 (hallazgo 3): la URL de la aplicación vive en la configuración,
    // no dentro del objeto de página. Para otro ambiente:
    //   npx cypress run --config baseUrl=https://otro-ambiente
    baseUrl: "https://www.demoblaze.com",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {},
  },
});
