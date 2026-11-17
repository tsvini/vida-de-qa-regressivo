# language: pt
@regressivo @ia
Funcionalidade: Chamado em dobro, o teste que a IA escreveu (revisado)
  A IA escreveu um teste que passava verde até com o bug ligado.
  Revisado: sem espera fixa, botão achado pelo nome, e conferindo quantos chamados foram criados.

  Cenário: Dois cliques no enviar criam um chamado só
    Dado que estou no FlowDesk depois do e-mail da Paula
    E a lista tem 10 chamados
    Quando eu clico duas vezes no botão "Enviar chamado" com o chamado preenchido
    Então só um chamado novo aparece na lista
