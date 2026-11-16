# language: pt
@regressivo @privacidade
Funcionalidade: Rascunho de uma conta não aparece pra outra (BUG-07)
  O rascunho da Beatriz tinha o contrato de um cliente. Isso não pode vazar de novo.

  Cenário: Quem entra depois não vê o rascunho de quem saiu
    Dado que estou no FlowDesk na Sprint 18
    E eu escrevo o rascunho "Renovação do contrato da Panificadora Sol"
    Quando eu saio da conta
    E o Lucas entra com a conta dele
    Então o novo chamado do Lucas abre vazio
