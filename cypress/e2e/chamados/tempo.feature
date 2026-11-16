# language: pt
@regressivo @tempo
Funcionalidade: Datas da lista de chamados
  O relógio é do teste: nada de esperar o dia passar.

  Cenário: "Últimos 7 dias" inclui os chamados de hoje (borda do Desafio 1)
    Dado que hoje é "2026-11-18 10:00"
    E que estou no FlowDesk na Sprint 18
    Quando eu abro a lista de chamados
    E eu escolho os últimos 7 dias no filtro
    Então os chamados criados hoje aparecem na lista

  Cenário: Chamado criado às 23h59 continua na lista depois da meia-noite
    Dado que hoje é "2026-11-18 23:59"
    E que estou no FlowDesk na Sprint 18
    E eu crio o chamado "simples"
    Quando eu abro a lista de chamados
    E o relógio anda 2 minutos
    E eu escolho os últimos 7 dias no filtro
    Então o chamado "simples" aparece criado "há 2 min"
