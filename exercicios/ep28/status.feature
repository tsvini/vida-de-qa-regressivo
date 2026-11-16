# language: pt
@testIsolation(false)
Funcionalidade: Status do chamado

  Cenário: Criar chamado
    Dado que estou no FlowDesk na Sprint 18
    Quando eu crio um chamado e confiro que ele abriu como Aberto

  Cenário: Resolver chamado
    Quando eu resolvo o último chamado da lista
    Então ele fica Resolvido
