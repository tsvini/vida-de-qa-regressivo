# language: pt
@acessibilidade @regressivo @smoke
Funcionalidade: O robô da acessibilidade
  Ligado tela por tela, só pros problemas graves e críticos. O que fica limpo não piora mais.

  Cenário: Novo chamado sem problema grave
    Dado que estou no FlowDesk depois do e-mail da Paula
    E eu abro o novo chamado
    Então o robô não acha problema grave de acessibilidade

  Cenário: Lista de chamados sem problema grave
    Dado que estou no FlowDesk depois do e-mail da Paula
    E eu abro a lista de chamados
    Então o robô não acha problema grave de acessibilidade
