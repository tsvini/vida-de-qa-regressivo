import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou no FlowDesk na Sprint 18', () => {
  cy.noModulo4();
});

Then('vejo a versão {string} no topo', (versao) => {
  cy.get('[data-test=versao-sistema]').should('contain', versao);
});
