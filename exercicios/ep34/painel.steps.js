import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

// o relógio do teste, com data e hora completas (o Z no fim quer dizer UTC)
Given('que o relógio marca {string}', (iso) => {
  cy.clock(Date.parse(iso), ['Date']);
});

Then('o painel mostra {string}', (texto) => {
  cy.get('[data-test=data-hoje]').should('have.text', texto);
});
