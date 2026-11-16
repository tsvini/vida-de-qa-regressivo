import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('eu busco por {string}', (termo) => {
  cy.abrir('chamados.html');
  cy.get('[data-test=busca-chamado]').type(termo);
  cy.wait(700); // "dá tempo da busca terminar"
});

Then('aparece só o chamado {string}', (titulo) => {
  // .then() olha a tela uma vez só
  cy.get('#linhas tr').then(($linhas) => {
    expect($linhas).to.have.length(1);
    expect($linhas.text()).to.contain(titulo);
  });
});
