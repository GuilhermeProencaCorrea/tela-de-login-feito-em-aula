const URL = 'http://localhost:3400/produtos';

let tabelaProduto = document.querySelector('table>tbody');
let modalAdicionar = document.querySelector('.modal');
let btnSalvar = document.querySelector('#btn-salvar');

btnSalvar.addEventListener('click',() => {

modalAdicionar.Hide();
});

// Acessar a Api e pegar os produtos
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
// Acessar API é pegar o email do usuário
function name(params) {
    
}
// Modificar um produto na tabela
function editarProduto(nome) {
    alert('Editar produto: '+ nome.nome)
}
// Remover um produto da tabela
function excluirProduto(nome) {
    alert('Excluir produto: '+ nome)
}
// Montar a tabela de forma dinâmica, com os produtos obtidos da API
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
    <a href="" onclick="teste()">
                    <i class="bi bi-pencil"></i>
                </a>
                <a href="" onclick="teste()">
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
// Colocar dados na tabela
function popularTabela(produtos){
    produtos.forEach(produto => {
        criarLinhaNaTabela(produto)
    });
}