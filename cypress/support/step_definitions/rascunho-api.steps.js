import { Given, When } from '@badeball/cypress-cucumber-preprocessor';

const api = (caminho) => `${Cypress.expose('api')}${caminho}`;
// o token vai no cabeçalho Authorization, com a palavra Bearer na frente
const comToken = (token) => ({ Authorization: `Bearer ${token}` });

Given('que eu entrei pelo servidor como {string}', (quem) => {
  cy.entrarPeloServidor(quem);
});

Given('eu criei o rascunho {string}', (titulo) => {
  cy.get('@token').then((token) => {
    cy.request({ method: 'POST', url: api('/rascunhos'), headers: comToken(token), body: { titulo } })
      .its('body.id')
      .as('idRascunho');
  });
});

When('alguém sem token pede os rascunhos', () => {
  cy.request({ url: api('/rascunhos'), failOnStatusCode: false }).as('resposta');
});

// usa o token de quem entrou por último
When('eu peço esse rascunho', () => {
  cy.get('@idRascunho').then((id) => {
    cy.get('@token').then((token) => {
      cy.request({ url: api(`/rascunhos/${id}`), headers: comToken(token), failOnStatusCode: false }).as('resposta');
    });
  });
});
