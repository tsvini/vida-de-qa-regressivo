import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// o FlowDesk do curso monta a massa direto pelo endereço: &massa=2000
Given('o Mercado Bom Preço tem {int} chamados', (n) => {
  cy.wrap(`&massa=${n}`, { log: false }).as('massa');
});

// marca a hora antes de abrir e de novo quando o primeiro chamado aparece
When('eu abro a lista e espero o primeiro chamado', () => {
  cy.get('@massa').then((massa) => {
    cy.wrap(Date.now(), { log: false }).as('inicio');
    cy.abrir('chamados.html', massa);
    cy.get('[data-test=linha-chamado]', { timeout: 20000 }).should('be.visible');
    cy.get('@inicio').then((t0) => cy.wrap(Date.now() - t0, { log: false }).as('tempo'));
  });
});

Then('a lista aparece em menos de {int} milissegundos', (limite) => {
  cy.get('@tempo').then((ms) => expect(ms, `a lista apareceu em ${ms} ms`).to.be.lessThan(limite));
});

// EP59: o limite vem do arquivo de orçamento, não do cenário. Melhorou a tela? Muda um número num lugar só.
const telas = {
  painel: ['dashboard.html', '[data-test=missao-atual]'],
  'lista de chamados': ['chamados.html', '[data-test=linha-chamado]', '&massa=2000'],
  'novo chamado': ['novo-chamado.html', '[data-test=titulo]'],
};
When('eu abro a tela {string} medindo o tempo', (tela) => {
  const [pagina, pronto, extra = ''] = telas[tela];
  cy.wrap(tela, { log: false }).as('tela');
  cy.wrap(Date.now(), { log: false }).as('inicio');
  cy.abrir(pagina, extra);
  cy.get(pronto, { timeout: 20000 }).should('be.visible');
  cy.get('@inicio').then((t0) => cy.wrap(Date.now() - t0, { log: false }).as('tempo'));
});

Then('ela aparece dentro do orçamento', () => {
  cy.fixture('orcamento').then((limites) => {
    cy.get('@tela').then((tela) => {
      cy.get('@tempo').then((ms) => expect(ms, `${tela}: ${ms} ms (limite ${limites[tela]} ms)`).to.be.lessThan(limites[tela]));
    });
  });
});
