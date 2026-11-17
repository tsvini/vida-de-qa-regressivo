# language: pt
@api @regressivo @smoke
Funcionalidade: Contrato do chamado
  O combinado entre o servidor e quem usa ele: quais campos, com que nome, de que tipo.

  Cenário: Todo chamado segue o contrato
    Quando eu peço a lista de chamados
    Então cada chamado segue o contrato do chamado

  Cenário: A lista responde em menos de 1 segundo
    Quando eu peço a lista de chamados
    Então a resposta chega em menos de 1000 milissegundos
