import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// um passo que faz três coisas: cria, abre e confere
When('eu crio um chamado e confiro que ele abriu como Aberto', () => {
  cy.visit('novo-chamado.html');
  cy.get('#titulo').type('Teste do Rafael');
  cy.get('#descricao').type('teste');
  cy.get('.btn').eq(1).click();
  cy.wait(2000);
  cy.visit('chamados.html');
  cy.get('tbody tr').last().click();
  cy.contains('Aberto');
});

// depende do cenário de cima ter rodado antes, no mesmo navegador
When('eu resolvo o último chamado da lista', () => {
  cy.visit('chamados.html');
  cy.get('tbody tr').last().click();
  cy.get('select').first().select('Resolvido');
  cy.get('.btn').contains('Salvar').click();
});

Then('ele fica Resolvido', () => {
  cy.contains('Resolvido');
});
