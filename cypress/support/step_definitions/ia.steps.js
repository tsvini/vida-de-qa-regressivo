import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Escrito pela IA, do jeito que chegou no pedido de revisão.
When('eu crio o chamado com clique duplo', () => {
  cy.abrir('novo-chamado.html');
  cy.get('#titulo').type('Impressora não liga');
  cy.get('#descricao').type('Desde cedo, nenhuma impressão sai.');
  cy.get('.btn.nc-aviao').dblclick();
  cy.wait(3000);
});

Then('o chamado é criado', () => {
  cy.get('.toast').should('exist');
});
