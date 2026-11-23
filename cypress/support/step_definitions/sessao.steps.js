import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

const api = (caminho) => `${Cypress.expose('api')}${caminho}`;

When('eu entro pelo servidor como {string} marcando lembrar de mim', (quem) => {
  cy.request('POST', api('/entrar'), { email: `${quem}@flowdesk.test`, senha: 'teste123', lembrar: true }).as('entrada');
});

// não espera nada: confere a hora em que o token vence
Then('o token vale pelo menos {int} {word}', (quanto, unidade) => {
  const minimo = quanto * { minutos: 60, dias: 24 * 60 * 60 }[unidade];
  cy.get('@entrada').then((r) => {
    const segundos = Math.round((Date.parse(r.body.expiraEm) - Date.now()) / 1000);
    // escreve o tempo do jeito que a gente fala: 30 segundos, 30 minutos, 30 dias
    const falado = segundos >= 86400 ? `${Math.round(segundos / 86400)} dias` : segundos >= 60 ? `${Math.round(segundos / 60)} minutos` : `${segundos} segundos`;
    expect(segundos, `o token vence em ${falado}, esperado pelo menos ${quanto} ${unidade}`).to.be.at.least(minimo);
  });
});
