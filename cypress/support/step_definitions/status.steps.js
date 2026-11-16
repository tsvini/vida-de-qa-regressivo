import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// achar pelo texto da massa, não pela posição na tabela: a ordem muda, o título não
When('eu abro o chamado {string}', (nome) => {
  cy.fixture('chamados').then((m) => {
    cy.abrir('chamados.html');
    cy.contains('[data-test=linha-chamado]', m[nome].titulo).find('[data-test=link-chamado]').click();
    cy.get('[data-test=chamado-titulo]').should('contain', m[nome].titulo);
  });
});

When('eu mudo o status para {string}', (status) => {
  cy.get('[data-test=mudar-status]').select(status);
  cy.get('[data-test=salvar-status]').click();
});

Then('o status do chamado é {string}', (status) => {
  cy.get('[data-test=chamado-status]').should('contain', status);
});
