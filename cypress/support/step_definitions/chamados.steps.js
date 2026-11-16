import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// massa de dados fica em cypress/fixtures: o cenário fala do "chamado simples", não de textos soltos
const massa = (nome) => cy.fixture('chamados').then((m) => m[nome]);

const preenche = (c) => {
  cy.get('[data-test=titulo]').type(c.titulo);
  cy.get('[data-test=descricao]').type(c.descricao);
  cy.get('[data-test=cliente]').select(c.cliente);
};

When('eu crio o chamado {string}', (nome) => {
  massa(nome).then((c) => {
    cy.abrir('novo-chamado.html');
    preenche(c);
    cy.get('[data-test=criar-chamado]').click();
    // só termina quando o servidor confirmou: sair da tela antes disso perde o chamado
    cy.get('[data-test=toast-sucesso]').should('contain', 'criado com sucesso');
  });
});

When('eu tento criar um chamado com o título {string}', (titulo) => {
  cy.abrir('novo-chamado.html');
  cy.get('[data-test=titulo]').type(titulo);
  cy.get('[data-test=descricao]').type('Qualquer descrição');
  cy.get('[data-test=criar-chamado]').click();
});

Then('aparece a mensagem de chamado criado', () => {
  cy.get('[data-test=toast-sucesso]').should('contain', 'criado com sucesso');
});

Then('o título mostra o erro {string}', (erro) => {
  cy.contains(erro).should('be.visible');
});

Then('o chamado {string} está na lista de chamados', (nome) => {
  massa(nome).then((c) => {
    cy.abrir('chamados.html');
    cy.contains('[data-test=linha-chamado]', c.titulo).should('be.visible');
  });
});
