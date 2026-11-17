import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = (caminho) => `${Cypress.expose('api')}${caminho}`;

// EP43: os chamados nascem pelo servidor, em meio segundo, já com a data certa
Given('que existem estes chamados:', (tabela) => {
  cy.request('POST', api('/teste/reiniciar'));
  tabela.hashes().forEach((linha) => {
    const [dia, hora] = linha['criado'].split(' ');
    cy.request('POST', api('/chamados'), {
      titulo: linha['título'],
      cliente: 'Panificadora Sol',
      prioridade: 'média',
      criadoEm: new Date(`${dia}T${hora}:00`).toISOString(),
    });
  });
  globalThis.dadosNoServidor = true;
});

Then('aparecem {string}, {string} e {string}', (a, b, c) => {
  [a, b, c].forEach((t) => cy.contains('[data-test=linha-chamado]', t).should('be.visible'));
});

Then('não aparecem {string} e {string}', (a, b) => {
  [a, b].forEach((t) => cy.contains('[data-test=linha-chamado]', t).should('not.exist'));
});
