import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

// as medidas ficam no cypress.config.js (expose.telas): o cenário só diz o nome da tela
Given('que estou usando um {word}', (tela) => {
  const medida = Cypress.expose('telas')[tela];
  expect(medida, `tela "${tela}" no cypress.config.js`).to.exist;
  cy.viewport(medida[0], medida[1]);
});

Then('consigo abrir um novo chamado pelo botão da lista', () => {
  cy.get('[data-test=novo-chamado]').should('be.visible').click();
  cy.location('pathname').should('include', 'novo-chamado');
});
