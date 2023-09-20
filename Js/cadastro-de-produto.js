// Pegar produtos cadastrados na API
const URL = 'http://localhost:3400/produtos';

let tabelaProduto = document.querySelector('table>tbody');

// Acessar a Api e trazer produtos
function pegarProdutos (){
    
    fetch(URL, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
        popularTabela(response);
    })
    .catch()
}
pegarProdutos();

function editarProduto(nome) {
    alert('Editar produto: '+ nome)
}

function excluirProduto(nome) {
    alert('Excluir produto: '+ nome)
}

// Montar a tabela de forma dinâmica, com os produtos obtidos

function criarLinhaNaTabela(produto){
    // Criar a linha da tabela

    let linhaTR = document.createElement('tr');

    // Criar as TDs

    let nomeTD = document.createElement('td');
    let valorTD = document.createElement('td');
    let estoqueTD = document.createElement('td');
    let acoesTD = document.createElement('td');

    // Popular as TDs

    nomeTD.textContent = produto.nome;
    valorTD.textContent = produto.valor;
    estoqueTD.textContent = produto.quantidadeEstoque;

    acoesTD.innerHTML = `
    <a href="" onclick="editarProduto(nome)">
    <i class="bi bi-pencil"></i>
    </a>
    <a href="" onclick="excluirProduto(nome)">
    <i class="bi bi-trash"></i>
    </a>
    `;

    // Adicionar as TDs a linha

    linhaTR.appendChild(nomeTD);
    linhaTR.appendChild(valorTD);
    linhaTR.appendChild(estoqueTD);
    linhaTR.appendChild(acoesTD);


    // Adicionar as linha a tabela

    tabelaProduto.appendChild(linhaTR);
}

function popularTabela(produtos){
    produtos.forEach(produto => {
        criarLinhaNaTabela(produto)
    });
}