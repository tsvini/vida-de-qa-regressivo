import { When } from '@badeball/cypress-cucumber-preprocessor';

// findByRole procura pelo papel (campo, botão) e pelo nome que a pessoa ouve
When('eu preencho o chamado {string} achando cada campo pelo nome', (nome) => {
  cy.fixture('chamados').then((m) => {
    cy.findByRole('textbox', { name: /título/i }).type(m[nome].titulo);
    cy.findByRole('textbox', { name: /descrição/i }).type(m[nome].descricao);
    cy.findByRole('combobox', { name: 'Cliente' }).select(m[nome].cliente);
  });
});

When('eu clico no botão {string}', (nome) => {
  cy.findByRole('button', { name: nome }).click();
});
