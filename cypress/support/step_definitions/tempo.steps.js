import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Só o Date fica congelado. setTimeout e setInterval continuam normais,
// senão as mensagens e o service worker do FlowDesk param junto.
Given('que hoje é {string}', (quando) => {
  const [dia, hora] = quando.split(' ');
  cy.clock(new Date(`${dia}T${hora}:00`).getTime(), ['Date']);
});

// cuidado: cada página nova volta pro horário do cy.clock.
// Por isso o relógio anda depois de abrir a lista.
When('o relógio anda {int} minutos', (min) => {
  cy.tick(min * 60 * 1000);
});

When('eu abro a lista de chamados', () => {
  cy.abrir('chamados.html');
});

// escolher o filtro desenha a lista de novo, já com o relógio atual
When('eu escolho os últimos 7 dias no filtro', () => {
  cy.get('[data-test=filtro-periodo]').select('7');
});

// a coluna "quando" mostra "agora", "há X min" ou "há X h" pro que é de hoje
Then('os chamados criados hoje aparecem na lista', () => {
  cy.get('[data-test=linha-chamado] .quando')
    .filter((i, el) => /agora|min|h$/.test(el.textContent.trim()))
    .should('have.length.greaterThan', 0);
});

Then('o chamado {string} aparece criado {string}', (nome, quando) => {
  cy.fixture('chamados').then((m) => {
    cy.contains('[data-test=linha-chamado]', m[nome].titulo)
      .find('.quando')
      .should('have.text', quando);
  });
});
