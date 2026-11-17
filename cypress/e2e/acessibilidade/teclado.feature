# language: pt
@acessibilidade @regressivo
Funcionalidade: Novo chamado só no teclado
  Quem usa leitor de tela, ou não consegue usar o mouse, anda pela tela com o Tab.

  Cenário: O Tab segue a ordem do formulário
    Dado que estou no FlowDesk depois do e-mail da Paula
    E eu abro o novo chamado
    Quando eu clico no título e aperto Tab
    Então o foco está na descrição
    Quando eu aperto Tab
    Então o foco está no cliente
    Quando eu aperto Tab
    Então o foco está no botão de enviar
