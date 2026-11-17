import { Then } from '@badeball/cypress-cucumber-preprocessor';

// o robô confere dezenas de regras; aqui só os problemas graves e críticos bloqueiam
Then('o robô não acha problema grave de acessibilidade', () => {
  cy.injectAxe();
  cy.checkA11y(['critical', 'serious']);
});
