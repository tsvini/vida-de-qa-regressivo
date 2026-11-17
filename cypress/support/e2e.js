import '@testing-library/cypress/add-commands';
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
  // EP43: quando o cenário preparou os dados pelo servidor, a tela lê do servidor também
  const servidor = globalThis.dadosNoServidor ? `&servidor=${Cypress.expose('api').replace(/\/api$/, '')}` : '';
  cy.visit(`${pagina}${sep}regressao=${regressao}&lento=${lento}${servidor}${extra}`);
});

// Entra pelo servidor (sem tela) e guarda o token em @token.
// Contas de teste: voce e lucas, as duas com a senha teste123.
Cypress.Commands.add('entrarPeloServidor', (quem) => {
  cy.request('POST', `${Cypress.expose('api')}/entrar`, { email: `${quem}@flowdesk.test`, senha: 'teste123' })
    .as('entrada') // a resposta inteira (com a hora em que o token vence) fica em @entrada
    .its('body.token')
    .as('token');
});

// cada cenário começa lendo os dados do próprio FlowDesk
beforeEach(() => {
  globalThis.dadosNoServidor = false;
});

// Módulo 8: o FlowDesk depois do e-mail da Paula (tela nova do novo chamado, contraste novo).
Cypress.Commands.add('noModulo8', () => {
  cy.visit('index.html?save=m8ep54');
  cy.location('pathname').should('include', 'dashboard');
});

// EP56: o robô da acessibilidade (axe-core). Dois comandos: um carrega o robô na página, o outro manda ele conferir.
// (o plugin cypress-axe ainda não aceita o Cypress 16, então os dois comandos ficam aqui, com o axe-core direto)
import axe from 'axe-core';
Cypress.Commands.add('injectAxe', () => {
  cy.window({ log: false }).then((win) => { if (!win.axe) win.eval(axe.source); });
});
Cypress.Commands.add('checkA11y', (gravidades = ['critical', 'serious']) => {
  cy.window({ log: false })
    .then((win) => win.axe.run(win.document, { resultTypes: ['violations'] }))
    .then(({ violations }) => {
      const graves = violations.filter((v) => gravidades.includes(v.impact));
      graves.forEach((v) => cy.task('log', `  ${v.impact} · ${v.id} · ${v.help} · ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`, { log: false }));
      cy.wrap(graves, { log: false }).then((g) => expect(g.map((v) => `${v.id} (${v.nodes.length})`), 'problemas graves de acessibilidade').to.be.empty);
    });
});
