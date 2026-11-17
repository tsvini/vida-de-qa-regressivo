import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// o endereço do servidor fica no cypress.config.js (expose.api)
const api = (caminho) => `${Cypress.expose('api')}${caminho}`;

// sem visit: o pedido vai direto pro servidor, nenhuma tela abre
When('eu peço a lista de chamados', () => {
  cy.request(api('/chamados')).as('resposta');
});

When('eu peço o chamado {int}', (id) => {
  cy.request(api(`/chamados/${id}`)).as('resposta');
});

Then('o servidor responde {int}', (status) => {
  cy.get('@resposta').then((r) => expect(r.status, 'status').to.eq(status));
});

Then('a resposta tem pelo menos {int} chamado', (n) => {
  cy.get('@resposta').its('body').should('have.length.at.least', n);
});

// o nome do campo vai na mensagem: se falhar, o vermelho já diz qual campo
Then('o título é {string}', (titulo) => {
  cy.get('@resposta').then((r) => expect(r.body.titulo, 'campo titulo').to.eq(titulo));
});

Then('o cliente é {string}', (cliente) => {
  cy.get('@resposta').then((r) => expect(r.body.cliente, 'campo cliente').to.eq(cliente));
});

// pôust: o corpo vai junto com o pedido
When('eu crio pelo servidor um chamado da {string} com prioridade {string}', (cliente, prioridade) => {
  cy.request('POST', api('/chamados'), { titulo: 'Forno parou de esquentar', cliente, prioridade }).as('resposta');
  // guarda o número novo pra buscar de volta
  cy.get('@resposta').its('body.id').as('idNovo');
});

When('eu busco esse chamado de volta', () => {
  cy.get('@idNovo').then((id) => cy.request(api(`/chamados/${id}`)).as('resposta'));
});

Then('a prioridade guardada é {string}', (prioridade) => {
  cy.get('@resposta').then((r) => expect(r.body.prioridade, 'campo prioridade').to.eq(prioridade));
});
