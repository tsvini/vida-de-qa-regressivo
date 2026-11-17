# language: pt
@api @regressivo @smoke
Funcionalidade: Sessão (o incidente de sexta)
  Vermelho com o bug, verde com o conserto: aí dá pra confiar no teste.

  Cenário: O token vale pelo menos 30 minutos
    Quando eu entro pelo servidor como "voce"
    Então o token vale pelo menos 30 minutos
