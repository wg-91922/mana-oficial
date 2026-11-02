const produtos = [
  {id:1,nome:'Granola',emoji:'🥣',descricao:'Para um café da manhã especial.'},
  {id:2,nome:'Aveia',emoji:'🌾',descricao:'Uma opção versátil para suas receitas.'},
  {id:3,nome:'Nescau',emoji:'🥛',descricao:'Sabor de chocolate para o dia a dia.'},
  {id:4,nome:'Leite',emoji:'🥛',descricao:'Um item essencial na sua cozinha.'},
  {id:5,nome:'Creatina',emoji:'💪',descricao:'Consulte opções e disponibilidade.'},
  {id:6,nome:'Açafrão',emoji:'🟡',descricao:'Cor e sabor para seus pratos.'},
  {id:7,nome:'Corante',emoji:'🧡',descricao:'Dê mais cor às suas receitas.'},
  {id:8,nome:'Cominho',emoji:'🌿',descricao:'Um tempero marcante e aromático.'}
];
const telefone = '556193045720';
const carrinho = [];
const lista = document.getElementById('lista-produtos');
const itens = document.getElementById('itens-carrinho');

produtos.forEach(produto => {
  const card = document.createElement('article');
  card.className = 'produto';
  card.innerHTML = `<div class="produto-emoji">${produto.emoji}</div>
    <h3>${produto.nome}</h3><p>${produto.descricao}</p>
    <span class="preco">Consulte o preço</span>
    <button class="botao adicionar" type="button" data-id="${produto.id}">＋ Adicionar ao carrinho</button>`;
  lista.appendChild(card);
});

lista.addEventListener('click', event => {
  const botao = event.target.closest('[data-id]');
  if (!botao) return;
  const produto = produtos.find(item => item.id === Number(botao.dataset.id));
  const existente = carrinho.find(item => item.id === produto.id);
  if (existente) existente.quantidade++;
  else carrinho.push({...produto, quantidade:1});
  atualizarCarrinho();
  botao.textContent = '✓ Adicionado';
  setTimeout(() => botao.textContent = '＋ Adicionar ao carrinho', 900);
});

function atualizarCarrinho() {
  const quantidade = carrinho.reduce((soma,item) => soma + item.quantidade, 0);
  document.getElementById('contador').textContent = quantidade;
  document.getElementById('total-itens').textContent = `${quantidade} ${quantidade === 1 ? 'produto' : 'produtos'}`;
  itens.innerHTML = '';
  if (!carrinho.length) {
    itens.innerHTML = '<li class="vazio">Seu carrinho está vazio. Adicione produtos para começar!</li>';
    return;
  }
  carrinho.forEach(item => {
    const li = document.createElement('li');
    const nome = document.createElement('span');
    nome.textContent = `${item.emoji} ${item.nome} × ${item.quantidade}`;
    const remover = document.createElement('button');
    remover.className = 'remover';
    remover.type = 'button';
    remover.textContent = 'Remover';
    remover.setAttribute('aria-label', `Remover ${item.nome} do carrinho`);
    remover.addEventListener('click', () => {
      const atual = carrinho.find(p => p.id === item.id);
      if (atual.quantidade > 1) atual.quantidade--;
      else carrinho.splice(carrinho.indexOf(atual),1);
      atualizarCarrinho();
    });
    li.append(nome,remover);
    itens.appendChild(li);
  });
}

document.getElementById('enviar-pedido').addEventListener('click', () => {
  if (!carrinho.length) {
    alert('Adicione pelo menos um produto ao carrinho antes de enviar.');
    return;
  }
  const linhas = carrinho.map(item => `• ${item.nome} — quantidade: ${item.quantidade}`);
  const mensagem = `Olá! Quero fazer um pedido no Armazém Mana:\n\n${linhas.join('\n')}\n\nPor favor, informe o valor e a disponibilidade.`;
  window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,'_blank','noopener');
});
document.getElementById('ano').textContent = new Date().getFullYear();
