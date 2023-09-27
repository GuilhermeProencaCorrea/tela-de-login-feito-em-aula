const URL = 'http://localhost:3400/clientes';

let tabelaCliente = document.querySelector('table>tbody');
let modalAdicionar = document.querySelector('.modal');
let btnSalvar = document.querySelector('#btn-salvar');

btnSalvar.addEventListener('click',() => {

modalAdicionar.Hide();
});

// Acessar a Api e pegar os clientes cadastrados
function pegarClientes (){
    
    fetch(URL, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
        popularTabela(response);
        console.log(response)
    })
    .catch()
}
pegarClientes();
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
function criarLinhaNaTabela(cliente){
    // Criar a linha da tabela

    let linhaTR = document.createElement('tr');

    // Criar as TDs

    let idTD = document.createElement('td');
    let nomeTD = document.createElement('td');
    let cpfTD = document.createElement('td');
    let emailTD = document.createElement('td');
    let telefoneTD = document.createElement('td');
    let cadastroTD = document.createElement('td');
    let acoesTD = document.createElement('td');
   
    // Popular as TDs

    idTD.textContent = cliente.id;
    nomeTD.textContent = cliente.nome;
    cpfTD.textContent = cliente.cpfOuCnpj;
    emailTD.textContent = cliente.email;
    telefoneTD.textContent = cliente.telefone;
    cadastroTD.textContent = cliente.dataCadastro;

    acoesTD.innerHTML = `
    <a href="">
    <i class="bi bi-pencil"></i>
    </a>
    <a href="">
    <i class="bi bi-trash"></i>
    </a>

    `;

    // Adicionar as TDs a linha

    linhaTR.appendChild(idTD);
    linhaTR.appendChild(nomeTD);
    linhaTR.appendChild(cpfTD);
    linhaTR.appendChild(emailTD);
    linhaTR.appendChild(telefoneTD);
    linhaTR.appendChild(cadastroTD);
    linhaTR.appendChild(acoesTD);

    // Adicionar as linha a tabela

    tabelaCliente.appendChild(linhaTR);
}
// Colocar dados na tabela
function popularTabela(clientes){
    clientes.forEach(cliente => {
        criarLinhaNaTabela(cliente)
    });
}