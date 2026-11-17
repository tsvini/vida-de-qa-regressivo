import { Then } from '@badeball/cypress-cucumber-preprocessor';

// confere a forma, não o valor: o campo existe, tem o tipo certo e não está vazio
Then('cada chamado segue o contrato do chamado', () => {
  cy.fixture('contrato-chamado').then((contrato) => {
    cy.get('@resposta').its('body').then((chamados) => {
      chamados.forEach((c) => {
        Object.entries(contrato).forEach(([campo, tipo]) => {
          expect(c, `campo ${campo} no chamado ${c.id}`).to.have.property(campo);
          if (Array.isArray(tipo)) expect(tipo, `campo ${campo} no chamado ${c.id}`).to.include(c[campo]);
          else expect(c[campo], `campo ${campo} no chamado ${c.id}`).to.be.a(tipo);
          if (tipo === 'string') expect(c[campo], `campo ${campo} no chamado ${c.id}`).to.not.be.empty;
        });
      });
    });
  });
});

// o cy.request já mede quanto tempo a resposta levou
Then('a resposta chega em menos de {int} milissegundos', (limite) => {
  cy.get('@resposta').then((r) => expect(r.duration, 'tempo da resposta (ms)').to.be.lessThan(limite));
});
