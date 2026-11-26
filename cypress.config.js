const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  // valores públicos que os testes leem com Cypress.expose()
  expose: {
    // liga um bug antigo do FlowDesk: npx cypress run --expose regressao=duplicado
    regressao: '',
    // simula rede lenta e variável na busca (EP27): npx cypress run --expose lento=1
    lento: '',
    // telas usadas no EP26 (largura, altura)
    telas: { desktop: [1280, 800], tablet: [768, 1024], celular: [390, 844] },
  },
  e2e: {
    // o FlowDesk do curso, publicado no GitHub Pages
    baseUrl: 'https://tsvini.github.io/flowdesk/',
    specPattern: 'cypress/e2e/**/*.feature',
    screenshotOnRunFailure: true,
    video: false,
    retries: 0, // retry esconde teste instável (EP27): aqui ele falha e a gente vê
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },
});
