# language: pt
@acessibilidade @regressivo @smoke
Funcionalidade: Criar chamado pelo nome que o leitor de tela fala
  Se o teste acha o campo pelo nome, o leitor de tela também acha.

  Cenário: Cada campo e o botão têm nome
    Dado que estou no FlowDesk depois do e-mail da Paula
    E eu abro o novo chamado
    Quando eu preencho o chamado "simples" achando cada campo pelo nome
    E eu clico no botão "Enviar chamado"
    Então aparece a mensagem de chamado criado
