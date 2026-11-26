const fs = require('fs');
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin, afterSpecHandler } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  // valores públicos que os testes leem com Cypress.expose()
  expose: {
    // o servidor do FlowDesk (npm run api), usado nos testes de API do módulo 6
    api: 'http://localhost:3000/api',
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
    video: true, // grava todo spec, mas só guarda o vídeo de quem falhou (EP33)
    retries: 0, // retry esconde teste instável (EP27): aqui ele falha e a gente vê
    async setupNodeEvents(on, config) {
      // o Cucumber também usa o after:spec: a gente desliga o dele e chama aqui dentro
      await addCucumberPreprocessorPlugin(on, config, { omitAfterSpecHandler: true });
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      // vídeo de teste verde é espaço jogado fora: apaga se nenhum teste do spec falhou
      on('after:spec', async (spec, results) => {
        await afterSpecHandler(config, spec, results);
        const falhou = results && results.tests.some((t) => t.attempts.some((a) => a.state === 'failed'));
        if (results && results.video && !falhou && fs.existsSync(results.video)) fs.unlinkSync(results.video);
      });
      return config;
    },
  },
});
