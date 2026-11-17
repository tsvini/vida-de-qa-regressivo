# language: pt
@api @regressivo @smoke
Funcionalidade: Sessão (o incidente de sexta)
  Vermelho com o bug, verde com o conserto: aí dá pra confiar no teste.

  Cenário: O token vale pelo menos 30 minutos
    Dado que eu entrei pelo servidor como "voce"
    Então o token vale pelo menos 30 minutos

  # o vizinho: o deploy de sexta mexeu também no "lembrar de mim"
  Cenário: Com "lembrar de mim", a sessão dura 30 dias
    Quando eu entro pelo servidor como "voce" marcando lembrar de mim
    Então o token vale pelo menos 30 dias
