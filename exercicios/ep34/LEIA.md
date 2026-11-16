# EP34 · Na minha máquina funciona

O teste do Rafael passa no computador dele e no seu. No pipeline, falha toda vez.

1. Copie `painel.feature` pra `cypress/e2e/` e `painel.steps.js` pra `cypress/support/step_definitions/`
2. Rode no seu computador: passa
3. Abra um pedido de revisão no seu fork: no pipeline, fica vermelho
4. Descubra a diferença entre os dois lugares e faça passar no pipeline **sem mudar o que o teste confere**

O gabarito está na branch `ep34-gabarito`.
