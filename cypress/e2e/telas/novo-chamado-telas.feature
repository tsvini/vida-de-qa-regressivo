# language: pt
@regressivo @telas
Funcionalidade: Abrir um novo chamado em qualquer tela
  Metade do suporte usa o celular. O botão tem que estar lá.

  Esquema do Cenário: Abrir o formulário pela lista no <tela>
    Dado que estou usando um <tela>
    E que estou no FlowDesk na Sprint 18
    Quando eu abro a lista de chamados
    Então consigo abrir um novo chamado pelo botão da lista

    Exemplos:
      | tela    |
      | desktop |
      | tablet  |
      | celular |
