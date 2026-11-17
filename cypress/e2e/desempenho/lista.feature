# language: pt
@desempenho @regressivo
Funcionalidade: A lista grande do Mercado Bom Preço
  Lentidão é bug. Só que nenhum teste de funciona ou não funciona pega.

  Cenário: Com 2000 chamados, a lista aparece em menos de 2 segundos
    Dado que estou no FlowDesk depois do e-mail da Paula
    Quando eu abro a lista com 2000 chamados
    Então a lista aparece em menos de 2000 milissegundos
