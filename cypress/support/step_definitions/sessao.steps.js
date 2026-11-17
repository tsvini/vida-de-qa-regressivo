import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = (caminho) => `${Cypress.expose('api')}${caminho}`;

// não espera nada: confere a hora em que o token vence
Then('o token vale pelo menos {int} {word}', (quanto, unidade) => {
  const minimo = quanto * { minutos: 60, dias: 24 * 60 * 60 }[unidade];
  cy.get('@entrada').then((r) => {
    const segundos = Math.round((Date.parse(r.body.expiraEm) - Date.now()) / 1000);
    expect(segundos, `o token vence em ${segundos} segundos`).to.be.at.least(minimo);
  });
});
