import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Do jeito que a IA entregou (passava verde com regressao=duplicado):
//   cy.get('.btn.nc-aviao').dblclick();
//   cy.wait(3000);
//   cy.get('.toast').should('exist');

Given('a lista tem {int} chamados', (n) => {
  cy.abrir('chamados.html');
  cy.get('[data-test=linha-chamado]').should('have.length', n);
  cy.wrap(n, { log: false }).as('antes');
});

When('eu clico duas vezes no botão {string} com o chamado preenchido', (nome) => {
  cy.abrir('novo-chamado.html');
  cy.findByRole('textbox', { name: 'Título' }).type('Impressora não liga');
  cy.findByRole('textbox', { name: 'Descrição' }).type('Desde cedo, nenhuma impressão sai.');
  cy.findByRole('button', { name: nome }).dblclick();
  cy.get('[data-test=toast-sucesso]').should('be.visible'); // sem espera fixa: o Cypress espera a mensagem
});

// a mensagem aparece com ou sem o bug: quem prova é a contagem
Then('só um chamado novo aparece na lista', () => {
  cy.abrir('chamados.html');
  cy.get('@antes').then((n) => {
    cy.get('[data-test=linha-chamado]').should(($l) => expect($l.length, `tinha ${n}, tem que ter ${n + 1}`).to.eq(n + 1));
  });
});
