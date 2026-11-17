import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou no FlowDesk depois do e-mail da Paula', () => {
  cy.noModulo8();
});

Given('eu abro o novo chamado', () => {
  cy.abrir('novo-chamado.html');
});

Given('eu escrevo o título e a descrição', () => {
  cy.get('[data-test=titulo]').type('Impressora não liga');
  cy.get('[data-test=descricao]').type('Desde cedo, nenhuma impressão sai.');
});

// cy.press aperta a tecla de verdade, como a pessoa faria
When('eu clico no título e aperto Tab', () => {
  cy.get('[data-test=titulo]').focus();
  cy.press(Cypress.Keyboard.Keys.TAB);
});

When('eu aperto Tab', () => {
  cy.press(Cypress.Keyboard.Keys.TAB);
});

// o Enter vai pra quem está com o foco: aqui, o botão de enviar
When('eu aperto Enter', () => {
  cy.focused().type('{enter}');
});

const campos = { 'na descrição': 'descricao', 'no cliente': 'cliente', 'no botão de enviar': 'criar-chamado' };
Then(/^o foco está (na descrição|no cliente|no botão de enviar)$/, (onde) => {
  cy.focused().then(($el) => expect($el.attr('data-test') || $el.text().trim(), 'quem está com o foco').to.eq(campos[onde]));
});
