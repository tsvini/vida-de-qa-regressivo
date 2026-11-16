import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Com ?api=rede o FlowDesk manda o novo chamado pela rede, em servidor/chamados.
// O FlowDesk de treino não tem backend: quem responde é o teste, e ele escolhe a demora.
Given('que o servidor demora {int} segundos pra responder', (s) => {
  cy.intercept('POST', '**/servidor/chamados', {
    statusCode: 201,
    body: { id: 5001 },
    delay: s * 1000,
  }).as('criar');
});

When('eu clico duas vezes em Criar chamado com o chamado {string}', (nome) => {
  cy.fixture('chamados').then((m) => {
    cy.abrir('novo-chamado.html', '&api=rede');
    cy.get('[data-test=titulo]').type(m[nome].titulo);
    cy.get('[data-test=descricao]').type(m[nome].descricao);
    // o segundo clique vem logo em seguida, como o dedo de quem acha que não clicou
    cy.get('[data-test=criar-chamado]').click().click({ force: true });
  });
});

Then('só sai um pedido pro servidor', () => {
  cy.wait('@criar');
  cy.get('@criar.all').should('have.length', 1);
});

Then('existe só um chamado {string} na lista', (nome) => {
  cy.fixture('chamados').then((m) => {
    cy.abrir('chamados.html', '&api=');
    cy.get('[data-test=linha-chamado]')
      .filter(`:contains("${m[nome].titulo}")`)
      .should('have.length', 1);
  });
});
