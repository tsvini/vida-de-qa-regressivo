# language: pt
@regressivo
Funcionalidade: Buscar chamado

  Cenário: Buscar com acento encontra o chamado (BUG-05)
    Dado que estou no FlowDesk na Sprint 18
    Quando eu busco por "manutenção"
    Então aparece só o chamado "Manutenção do forno da padaria"
