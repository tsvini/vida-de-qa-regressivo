import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('eu busco por {string}', (termo) => {
  cy.abrir('chamados.html');
  cy.get('[data-test=busca-chamado]').type(termo);
  // sem cy.wait fixo: quem espera é a verificação de baixo
});

Then('aparece só o chamado {string}', (titulo) => {
  // .should() tenta de novo até a tela ficar certa (ou até o tempo limite do Cypress)
  cy.get('[data-test=linha-chamado]').should('have.length', 1).and('contain', titulo);
});
