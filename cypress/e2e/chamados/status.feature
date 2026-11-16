# language: pt
@regressivo
Funcionalidade: Status do chamado
  Cada cenário monta o próprio mundo: roda sozinho, em qualquer ordem.

  Contexto:
    Dado que estou no FlowDesk na Sprint 18
    E eu crio o chamado "simples"

  Cenário: Chamado novo nasce Aberto
    Quando eu abro o chamado "simples"
    Então o status do chamado é "Aberto"

  Cenário: Resolver um chamado
    Quando eu abro o chamado "simples"
    E eu mudo o status para "Resolvido"
    Então o status do chamado é "Resolvido"
