// Servidor do FlowDesk pro módulo 6 do curso Vida de QA.
// Liga com: npm run api
// Liga um bug antigo: npm run api -- --regressao=cliente
// Bugs que dá pra ligar (pode juntar com vírgula):
//   cliente           o chamado vem sem o nome do cliente
//   prioridade        prioridade que o servidor não conhece vira "baixa", calado (o sábado da Panificadora Sol)
//   cliente-fantasma  aceita chamado de cliente que não existe
//   rascunho          entrega o rascunho de uma pessoa pra outra
//   nome-do-campo     o campo "cliente" passa a se chamar "nomeCliente"
//   lento             a lista de chamados demora quase 4 segundos
const http = require('http');
const crypto = require('crypto');

const PORTA = Number(process.env.PORT) || 3000;
const arg = process.argv.find((a) => a.startsWith('--regressao='));
const BUGS = new Set(((arg ? arg.split('=')[1] : process.env.REGRESSAO) || '').split(',').map((b) => b.trim()).filter(Boolean));
const bug = (nome) => BUGS.has(nome);

const CLIENTES = ['Panificadora Sol', 'Padaria Pão Quente', 'Mercado Bom Preço', 'Clínica Vida', 'Auto Peças Silva', 'Escola Aprender', 'Studio Fit'];
const PRIORIDADES = ['baixa', 'média', 'alta'];
const USUARIOS = [
  { id: 1, nome: 'Você', email: 'voce@flowdesk.test', senha: 'teste123' },
  { id: 2, nome: 'Lucas', email: 'lucas@flowdesk.test', senha: 'teste123' },
];

let chamados, rascunhos, tokens, proximoChamado, proximoRascunho;
function semente() {
  const diasAtras = (d, h) => { const x = new Date(); x.setDate(x.getDate() - d); x.setHours(h, 0, 0, 0); return x.toISOString(); };
  chamados = [
    { id: 1, titulo: 'Forno não liga', cliente: 'Panificadora Sol', prioridade: 'alta', status: 'Aberto', criadoEm: diasAtras(0, 6) },
    { id: 2, titulo: 'Erro ao emitir nota fiscal', cliente: 'Mercado Bom Preço', prioridade: 'média', status: 'Em andamento', criadoEm: diasAtras(2, 15) },
    { id: 3, titulo: 'Como cadastrar um novo atendente?', cliente: 'Clínica Vida', prioridade: 'baixa', status: 'Resolvido', criadoEm: diasAtras(5, 9) },
    { id: 4, titulo: 'Relatório mensal veio em branco', cliente: 'Auto Peças Silva', prioridade: 'média', status: 'Aberto', criadoEm: diasAtras(9, 11) },
    { id: 5, titulo: 'Notificações por e-mail não chegam', cliente: 'Escola Aprender', prioridade: 'alta', status: 'Em andamento', criadoEm: diasAtras(12, 14) },
    { id: 6, titulo: 'Quero mudar o plano para o anual', cliente: 'Studio Fit', prioridade: 'baixa', status: 'Fechado', criadoEm: diasAtras(20, 16) },
  ];
  rascunhos = []; tokens = new Map(); proximoChamado = 7; proximoRascunho = 1;
}
semente();

// o que o servidor devolve de um chamado (com os bugs, se ligados)
function saida(c) {
  const x = { ...c };
  if (bug('cliente')) x.cliente = '';
  if (bug('nome-do-campo')) { x.nomeCliente = x.cliente; delete x.cliente; }
  return x;
}

// "urgente" é como o cliente fala: vira alta (regra do Rafael, EP40)
function prioridade(p) {
  const v = String(p || '').trim().toLowerCase().replace('media', 'média');
  if (PRIORIDADES.includes(v)) return v;
  if (bug('prioridade')) return 'baixa';
  if (v === 'urgente') return 'alta';
  return null;
}

const quemE = (req) => {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  return m ? USUARIOS.find((u) => u.id === tokens.get(m[1])) : null;
};

function responde(res, status, corpo, atraso = 0) {
  setTimeout(() => {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
    res.end(JSON.stringify(corpo));
  }, atraso);
}

function leCorpo(req) {
  return new Promise((ok) => {
    let t = ''; req.on('data', (p) => { t += p; });
    req.on('end', () => { try { ok(t ? JSON.parse(t) : {}); } catch { ok(null); } });
  });
}

const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORTA}`);
  const rota = url.pathname.replace(/\/+$/, '');
  const m = req.method;
  if (m === 'OPTIONS') return responde(res, 204, {});

  if (rota === '/api/saude' && m === 'GET') return responde(res, 200, { ok: true, bugs: [...BUGS] });

  // volta tudo pro começo (útil antes de cada teste)
  if (rota === '/api/teste/reiniciar' && m === 'POST') { semente(); return responde(res, 200, { ok: true }); }

  if (rota === '/api/chamados' && m === 'GET') return responde(res, 200, chamados.map(saida), bug('lento') ? 3800 : 0);

  if (rota === '/api/chamados' && m === 'POST') {
    const c = await leCorpo(req);
    if (!c) return responde(res, 400, { erro: 'O corpo do pedido não é um JSON válido' });
    if (!String(c.titulo || '').trim()) return responde(res, 400, { erro: 'O título é obrigatório' });
    if (!CLIENTES.includes(c.cliente) && !bug('cliente-fantasma')) return responde(res, 400, { erro: 'Cliente não encontrado' });
    const p = prioridade(c.prioridade ?? 'média');
    if (!p) return responde(res, 400, { erro: 'Prioridade inválida: use baixa, média ou alta' });
    const novo = { id: proximoChamado++, titulo: String(c.titulo).trim(), cliente: c.cliente, prioridade: p, status: 'Aberto', criadoEm: c.criadoEm ? new Date(c.criadoEm).toISOString() : new Date().toISOString() };
    chamados.push(novo);
    return responde(res, 201, saida(novo));
  }

  const umChamado = /^\/api\/chamados\/(\d+)$/.exec(rota);
  if (umChamado && m === 'GET') {
    const c = chamados.find((x) => x.id === Number(umChamado[1]));
    return c ? responde(res, 200, saida(c)) : responde(res, 404, { erro: 'Chamado não encontrado' });
  }

  if (rota === '/api/entrar' && m === 'POST') {
    const c = await leCorpo(req) || {};
    const u = USUARIOS.find((x) => x.email === c.email && x.senha === c.senha);
    if (!u) return responde(res, 401, { erro: 'E-mail ou senha errados' });
    const token = crypto.randomBytes(16).toString('hex');
    tokens.set(token, u.id);
    return responde(res, 200, { token, nome: u.nome });
  }

  if (rota.startsWith('/api/rascunhos')) {
    const u = quemE(req);
    if (!u) return responde(res, 401, { erro: 'Entre primeiro: esse pedido precisa de token' });
    if (rota === '/api/rascunhos' && m === 'GET') return responde(res, 200, rascunhos.filter((r) => r.dono === u.id));
    if (rota === '/api/rascunhos' && m === 'POST') {
      const c = await leCorpo(req) || {};
      if (!String(c.titulo || '').trim()) return responde(res, 400, { erro: 'O título é obrigatório' });
      const r = { id: proximoRascunho++, titulo: String(c.titulo).trim(), texto: c.texto || '', dono: u.id };
      rascunhos.push(r);
      return responde(res, 201, r);
    }
    const um = /^\/api\/rascunhos\/(\d+)$/.exec(rota);
    if (um && m === 'GET') {
      const r = rascunhos.find((x) => x.id === Number(um[1]));
      if (!r) return responde(res, 404, { erro: 'Rascunho não encontrado' });
      if (r.dono !== u.id && !bug('rascunho')) return responde(res, 403, { erro: 'Esse rascunho não é seu' });
      return responde(res, 200, r);
    }
  }

  return responde(res, 404, { erro: 'Rota não encontrada' });
});

servidor.listen(PORTA, () => {
  console.log(`Servidor do FlowDesk ligado em http://localhost:${PORTA}/api/chamados`);
  console.log(BUGS.size ? `Bug ligado: ${[...BUGS].join(', ')}` : 'Nenhum bug ligado');
});
