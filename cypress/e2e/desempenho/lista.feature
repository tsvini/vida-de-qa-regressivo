# language: pt
@desempenho @regressivo
Funcionalidade: A lista grande do Mercado Bom Preço
  Lentidão é bug. Só que nenhum teste de funciona ou não funciona pega.

  Cenário: Com 2000 chamados, a lista aparece em menos de 2 segundos
    Dado que estou no FlowDesk depois do e-mail da Paula
    E o Mercado Bom Preço tem 2000 chamados
    Quando eu abro a lista e espero o primeiro chamado
    Então a lista aparece em menos de 2000 milissegundos
