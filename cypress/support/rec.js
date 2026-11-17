import './e2e';
// só na gravação: segura a tela no fim de cada teste pro vídeo pegar o final
afterEach(() => { cy.wait(1500, { log: false }); });
