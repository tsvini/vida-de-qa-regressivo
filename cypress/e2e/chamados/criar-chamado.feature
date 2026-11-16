# language: pt
@smoke @regressivo
Funcionalidade: Criar chamado (FD-101)
  O suporte abre chamados o dia inteiro. Se isso quebrar, a empresa para.

  Contexto:
    Dado que estou no FlowDesk na Sprint 18

  Cenário: Criar um chamado e encontrar ele na lista
    Quando eu crio o chamado "simples"
    Então aparece a mensagem de chamado criado
    E o chamado "simples" está na lista de chamados

  Cenário: Título só com espaços não cria chamado
    Quando eu tento criar um chamado com o título "     "
    Então o título mostra o erro "Título é obrigatório"
