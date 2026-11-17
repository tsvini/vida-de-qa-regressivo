// Comandos que todo cenário usa.

// Entra no FlowDesk já no estado do módulo 4 (Sprint 18), com a conta de teste.
// O ?save=m4 monta os dados por código: nada de clicar em Configurações a cada teste.
Cypress.Commands.add('noModulo4', () => {
  cy.visit('index.html?save=m4');
  cy.location('pathname').should('include', 'dashboard');
});

// Abre uma tela do FlowDesk.
// --expose regressao=duplicado traz um bug antigo de volta.
// --expose lento=1 deixa a rede como a de um CI.
Cypress.Commands.add('abrir', (pagina, extra = '') => {
  const sep = pagina.includes('?') ? '&' : '?';
  const regressao = Cypress.expose('regressao') || '';
  const lento = Cypress.expose('lento') || '';
  cy.visit(`${pagina}${sep}regressao=${regressao}&lento=${lento}${extra}`);
});

// Entra pelo servidor (sem tela) e guarda o token em @token.
// Contas de teste: voce e lucas, as duas com a senha teste123.
Cypress.Commands.add('entrarPeloServidor', (quem) => {
  cy.request('POST', `${Cypress.expose('api')}/entrar`, { email: `${quem}@flowdesk.test`, senha: 'teste123' })
    .its('body.token')
    .as('token');
});
