# language: pt
@api @regressivo @smoke
Funcionalidade: Rascunho é de quem escreveu, também no servidor (BUG-07)
  A tela já esconde o rascunho desde o módulo 4. Aqui a porta de trás.

  Contexto:
    Dado que eu entrei pelo servidor como "voce"
    E eu criei o rascunho "Contrato da Panificadora Sol"

  Cenário: Sem token, o servidor não sabe quem é
    Quando alguém sem token pede os rascunhos
    Então o servidor responde 401

  Cenário: O Lucas não vê o rascunho de outra pessoa
    Dado que eu entrei pelo servidor como "lucas"
    Quando eu peço esse rascunho
    Então o servidor responde 403

  Cenário: Quem escreveu vê o próprio rascunho
    Quando eu peço esse rascunho
    Então o servidor responde 200
