# language: pt
@regressivo @tempo
Funcionalidade: Filtro dos últimos 7 dias
  A preparação vai pelo servidor. O que o cenário confere continua na tela.

  Cenário: "Últimos 7 dias" mostra só a última semana
    Dado que hoje é "2026-11-18 10:00"
    E que existem estes chamados:
      | título                 | criado           |
      | Balança descalibrada   | 2026-11-18 08:00 |
      | Impressora sem papel   | 2026-11-15 09:00 |
      | Sistema lento no caixa | 2026-11-12 10:00 |
      | Senha do Wi-Fi         | 2026-11-10 14:00 |
      | Troca de plano         | 2026-11-01 11:00 |
    E que estou no FlowDesk na Sprint 18
    Quando eu abro a lista de chamados
    E eu escolho os últimos 7 dias no filtro
    Então aparecem "Balança descalibrada", "Impressora sem papel" e "Sistema lento no caixa"
    E não aparecem "Senha do Wi-Fi" e "Troca de plano"
