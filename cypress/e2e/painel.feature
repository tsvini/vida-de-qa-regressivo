# language: pt
@regressivo
Funcionalidade: Painel do dia

  Cenário: O painel mostra a data de hoje
    Dado que o relógio marca "2026-11-19T01:30:00Z"
    E que estou no FlowDesk na Sprint 18
    Então o painel mostra "Quarta-feira, 18 de novembro"
