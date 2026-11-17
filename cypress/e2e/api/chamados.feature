# language: pt
@api @regressivo
Funcionalidade: Servidor de chamados
  Conversa direta com o servidor do FlowDesk, sem tela.

  Cenário: A lista de chamados responde
    Quando eu peço a lista de chamados
    Então o servidor responde 200
    E a resposta tem pelo menos 1 chamado

  Cenário: O chamado 1 vem com título e cliente
    Quando eu peço o chamado 1
    Então o servidor responde 200
    E o título é "Forno não liga"
    E o cliente é "Panificadora Sol"
