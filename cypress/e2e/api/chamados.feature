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

  Cenário: Criar pelo servidor e buscar de volta
    Quando eu crio pelo servidor um chamado da "Panificadora Sol" com prioridade "alta"
    Então o servidor responde 201
    Quando eu busco esse chamado de volta
    Então a prioridade guardada é "alta"

  # o pedido que o sistema do caixa fez no sábado (regra do Rafael: urgente vira alta)
  @smoke
  Cenário: Prioridade "urgente" é guardada como alta
    Quando eu crio pelo servidor um chamado da "Panificadora Sol" com prioridade "urgente"
    Então o servidor responde 201
    Quando eu busco esse chamado de volta
    Então a prioridade guardada é "alta"
