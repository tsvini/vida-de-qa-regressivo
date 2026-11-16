# EP27 · O teste que mente

O Rafael escreveu esse teste de busca. Na máquina dele passa sempre. No CI, às vezes fica vermelho.

1. Copie `busca.feature` pra `cypress/e2e/chamados/` e `busca.steps.js` pra `cypress/support/step_definitions/`
2. Rode umas 10 vezes simulando a rede do CI:
   `npx cypress run --spec cypress/e2e/chamados/busca.feature --expose lento=1`
3. Descubra por que ele às vezes falha e conserte sem aumentar nenhuma espera

O gabarito está na branch `ep27-gabarito`.
