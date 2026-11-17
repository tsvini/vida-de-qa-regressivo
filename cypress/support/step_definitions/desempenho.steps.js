import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// marca a hora antes de abrir e de novo quando o primeiro chamado aparece
When('eu abro a lista com {int} chamados', (n) => {
  cy.wrap(Date.now(), { log: false }).as('inicio');
  cy.abrir('chamados.html', `&massa=${n}`);
  cy.get('[data-test=linha-chamado]', { timeout: 20000 }).should('be.visible');
  cy.get('@inicio').then((t0) => cy.wrap(Date.now() - t0, { log: false }).as('tempo'));
});

Then('a lista aparece em menos de {int} milissegundos', (limite) => {
  cy.get('@tempo').then((ms) => expect(ms, `a lista apareceu em ${ms} ms`).to.be.lessThan(limite));
});
