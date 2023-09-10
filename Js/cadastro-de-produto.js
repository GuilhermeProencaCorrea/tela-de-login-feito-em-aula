const URL = 'http://localhost:3400/produtos';

let tabelaProduto = document.querySelector('table>tbody');

// Acessar a Api
function trazerProdutos (){
    
    fetch(URL, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
        popularTabela(response);
    })
    .catch()
}

// Montar a tabela de forma dinâmica

function popularTabela(produto){
    // Criar a linha da tabela
     console.log(produto)
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

// Colocar o E-mail do usuário na tela

function telaEmail() {

}

trazerProdutos();

function teste() {
    alert(':)');
}