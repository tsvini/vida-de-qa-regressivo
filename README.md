# Vida de QA · Regressivo do FlowDesk

Projeto do **módulo 4 do curso Vida de QA**: o regressivo de verdade do FlowDesk, com **Cypress + Cucumber** (cenários em Gherkin, em português).

## Como rodar

Precisa do **Node 22 ou mais novo**.

```bash
npm install
npx cypress open            # abre o Cypress com a tela dele
npm test                    # roda tudo no terminal
npm run test:smoke          # só os cenários @smoke
npm run test:regressivo     # só os cenários @regressivo
```

Os testes rodam contra o FlowDesk publicado: `https://tsvini.github.io/flowdesk/`

## Ligando um bug antigo de volta

O teste só vale se ele pegar o bug. Pra provar, o FlowDesk consegue trazer bugs antigos de volta:

```bash
npx cypress run --expose regressao=duplicado   # BUG-04: chamado em dobro com rede lenta
npx cypress run --expose regressao=rascunho    # BUG-07: rascunho aparece pra outra conta
npx cypress run --expose regressao=periodo     # Desafio 1: "últimos 7 dias" sem os de hoje
npx cypress run --expose regressao=layout      # botão "Novo chamado" some no celular
```

Com o bug ligado, o teste dele tem que ficar vermelho. Sem o bug, verde.

## Valendo a missão no FlowDesk

Cada prática do módulo tem uma missão. Rode o comando da aula, copie a saída do terminal (pode ser inteira) e cole na página **Regressivo** do FlowDesk:
https://tsvini.github.io/flowdesk/regressivo.html

O FlowDesk confere o spec e, na prova com o bug, se ele falhou pelo motivo certo.

## Ganchos do FlowDesk pra teste

| Na URL | O que faz |
|---|---|
| `?save=m4` | monta o estado do módulo 4 (Sprint 18) e entra com a conta de teste |
| `?regressao=duplicado,rascunho` | traz bugs antigos de volta nessa aba (vazio desliga) |
| `?api=rede` | o novo chamado vai pela rede em `servidor/chamados`, e quem responde é o teste (`cy.intercept`) |
| `?lento=1` | a busca demora um pouco mais, e cada vez um tanto diferente, como a rede de um CI |

## Episódios e gabaritos

Cada episódio tem uma branch com o código pronto do fim dele. Travou? Compara com o gabarito.

| Episódio | Branch | O que entra |
|---|---|---|
| EP22 · Estrutura que aguenta 200 testes | `ep22-gabarito` | steps por área, massa em fixtures, o primeiro fluxo crítico |
| EP23 · Clique duplo com rede lenta | `ep23-gabarito` | `cy.intercept` com atraso e contagem de pedidos |
| EP24 · Dois usuários, um navegador | `ep24-gabarito` | o vazamento do rascunho com duas contas |
| EP25 · O dono do relógio | `ep25-gabarito` | `cy.clock` e `cy.tick`: borda dos 7 dias e meia-noite |
| EP26 · Três telas, um cenário | `ep26-gabarito` | Esquema do Cenário com desktop, tablet e celular |
| EP27 · O teste que mente | `ep27-gabarito` | o teste instável do Rafael, consertado |
| EP28 · O teste passou. E agora? | `ep28-gabarito` | a revisão do PR do Rafael |

Os exercícios do EP27 e do EP28 ficam em `exercicios/` (fora da pasta de testes, pra não rodarem sozinhos).

## O servidor do FlowDesk (módulo 6)

A pasta `servidor/` tem o servidor do FlowDesk que os testes de API usam. Não precisa instalar nada a mais.

```bash
npm run api                              # liga em http://localhost:3000/api/chamados
npm run api -- --regressao=cliente       # liga com um bug antigo
```

Bugs que dá pra ligar: `cliente`, `prioridade`, `cliente-fantasma`, `rascunho`, `nome-do-campo`, `lento`, `sessao` e `lembrar`. A lista com o que cada um faz está no começo de `servidor/index.js`.

Contas de teste: `voce@flowdesk.test` e `lucas@flowdesk.test`, as duas com a senha `teste123`.
