# language: pt
@regressivo @rede
Funcionalidade: Chamado em dobro com rede lenta (BUG-04)
  Voltou uma vez em produção. Não volta de novo sem esse teste ficar vermelho.

  Contexto:
    Dado que estou no FlowDesk na Sprint 18

  Cenário: Dois cliques com o servidor lento criam um chamado só
    Dado que o servidor demora 2 segundos pra responder
    Quando eu clico duas vezes em Criar chamado com o chamado "lento"
    Então só sai um pedido pro servidor
    E existe só um chamado "lento" na lista
