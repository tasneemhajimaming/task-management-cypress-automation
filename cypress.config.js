// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   allowCypressEnv: false,

//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {

    baseUrl: "https://app-testing-sea-02.azurewebsites.net",

    setupNodeEvents(on, config) {

    },

  },

});