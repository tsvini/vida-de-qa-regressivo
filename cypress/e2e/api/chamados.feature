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

  Cenário: Chamado que não existe
    Quando eu peço o chamado 9000
    Então o servidor responde 404
    E a mensagem de erro diz "não encontrado"

  # uma regra diferente do servidor em cada linha
  Esquema do Cenário: O servidor recusa chamado errado: <caso>
    Quando eu crio pelo servidor um chamado com título "<título>", cliente "<cliente>" e prioridade "<prioridade>"
    Então o servidor responde 400
    E a mensagem de erro diz "<mensagem>"

    Exemplos:
      | caso                   | título      | cliente          | prioridade | mensagem                  |
      | título vazio           |             | Panificadora Sol | alta       | título é obrigatório      |
      | cliente que não existe | Forno parou | Padaria Fantasma | alta       | Cliente não encontrado    |
      | prioridade inválida    | Forno parou | Panificadora Sol | gigante    | use baixa, média ou alta  |
