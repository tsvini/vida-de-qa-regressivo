// Comandos que todo cenário usa.

// Entra no FlowDesk já no estado do módulo 4 (Sprint 18), com a conta de teste.
// O ?save=m4 monta os dados por código: nada de clicar em Configurações a cada teste.
Cypress.Commands.add('noModulo4', () => {
  cy.visit('index.html?save=m4');
  cy.location('pathname').should('include', 'dashboard');
});

// Abre uma tela do FlowDesk.
// --expose regressao=duplicado traz um bug antigo de volta; --expose lento=1 deixa a rede como a de um CI.
Cypress.Commands.add('abrir', (pagina, extra = '') => {
  const sep = pagina.includes('?') ? '&' : '?';
  cy.visit(`${pagina}${sep}regressao=${Cypress.expose('regressao') || ''}&lento=${Cypress.expose('lento') || ''}${extra}`);
});
