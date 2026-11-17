# language: pt
@desempenho @regressivo
Funcionalidade: Orçamento de tempo
  Cada tela importante tem um tempo máximo. Os limites ficam em cypress/fixtures/orcamento.json.

  Esquema do Cenário: <tela> dentro do orçamento
    Dado que estou no FlowDesk depois do e-mail da Paula
    Quando eu abro a tela "<tela>" medindo o tempo
    Então ela aparece dentro do orçamento

    Exemplos:
      | tela              |
      | painel            |
      | lista de chamados |
      | novo chamado      |
