import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('eu escrevo o rascunho {string}', (texto) => {
  cy.abrir('novo-chamado.html');
  cy.get('[data-test=titulo]').type(texto);
});

When('eu saio da conta', () => {
  cy.get('[data-test=sair]').click();
  cy.location('pathname').should('include', 'index');
});

// conta nova, criada pela tela de cadastro, e levada pra Sprint 18 pelo ?save
When('o Lucas entra com a conta dele', () => {
  cy.get('[data-test=ir-criar-conta]').click();
  cy.get('[data-test=cadastro-nome]').type('Lucas Ribeiro');
  cy.get('[data-test=cadastro-email]').type('lucas@teste.com');
  cy.get('[data-test=cadastro-senha]').type('123456');
  cy.get('[data-test=cadastro-criar]').click();
  cy.location('pathname').should('include', 'dashboard');
  cy.visit('dashboard.html?save=m4');
  cy.get('[data-test=usuario-logado]').should('contain', 'Lucas');
});

Then('o novo chamado do Lucas abre vazio', () => {
  cy.abrir('novo-chamado.html');
  cy.get('[data-test=titulo]').should('have.value', '');
  cy.get('[data-test=descricao]').should('have.value', '');
});
