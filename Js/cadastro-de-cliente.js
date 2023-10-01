const URL = 'http://localhost:3400/clientes';
let edicao = false;

let listaClientes = [];

let tabelaCliente = document.querySelector('table>tbody');
let modalAdicionar = document.querySelector('.modal');
let tituloModal = document.querySelector('h4.modal-title');
let modalCliente = new bootstrap.Modal(document.getElementById("modal-cadastro-de-cliente"), {});

//Capturar botões do modal
let btnSalvar = document.querySelector('#btn-salvar');
let btnCancelar = document.querySelector('#btn-cancelar')

let btnAdicionar = document.querySelector('#adicionar');

//Capturar campos do modal por meio de um objeto: myModal

let myModal = {
    id: document.getElementById('id'),
    nome: document.getElementById('nome'),
    cpf: document.getElementById('cpf'),
    telefone: document.getElementById('telefone'),
    dataCadastro: document.getElementById('dataCadastro'),
    email: document.getElementById('email'),
}

//Capturar valor dos campos do modal
function capturarClienteDoModal(){

    return new Cliente({
        id: myModal.id.value,
        nome: myModal.nome.value,
        email: myModal.email.value,
        cpfOuCnpj: myModal.cpf.value,
        telefone: myModal.telefone.value,
        dataCadastro: (myModal.dataCadastro.value)
                ? new Date(myModal.dataCadastro.value).toISOString()
                : new Date().toISOString()
    });
}

btnSalvar.addEventListener('click',() => {
     //Pegar os dados do modal
     let cliente = capturarClienteDoModal();

     //Ver se os campos obrigatórios foram preenchidos
     if(!cliente.cpfOuCnpj || !cliente.email){
        alert("E-mail e CPF são obrigatórios.")
        return;
     }

     (edicao) ? atualizarClienteBackEnd(cliente) : adicionarClienteBackEnd(cliente);

});
btnCancelar.addEventListener('click', () => {

    modalCliente.hide();
});
btnAdicionar.addEventListener('click',() => {
    edicao = false;
    tituloModal.textContent = "Adicionar cliente"
    limparModalCliente();
    modalCliente.show();
});

// Acessar a Api e pegar os clientes cadastrados
function pegarClientes (){
    
    fetch(URL, {
        method: 'GET',
        headers :{
            'Authorization': obterToken()
        }
    })
    .then(response => response.json())
    .then(clientes => {
        listaClientes = clientes;
        popularTabela(clientes);
    })
    .catch()
}

// Modificar cliente na tabela
function editarCliente(id) {
    edicao = true;
    tituloModal.textContent = "Editar cliente"

    let cliente = listaClientes.find(cliente => cliente.id == id);
    
    atualizarModalCliente(cliente);

    modalCliente.show();
}
//Pegar os dados do cliente com tal id e colocar no modal para ser editado
function atualizarModalCliente(cliente){

    myModal.id.value = cliente.id;
    myModal.nome.value = cliente.nome;
    myModal.cpf.value = cliente.cpfOuCnpj;
    myModal.telefone.value = cliente.telefone;
    myModal.dataCadastro.value = cliente.dataCadastro.substring(0,10);
    myModal.email.value = cliente.email;
   
}
// Remover cliente da tabela
function excluirCliente(id) {
    let cliente = listaClientes.find(c => c.id == id);

    if(confirm("Deseja realmente excluir o cliente " + cliente.nome)){
        excluirClienteBackEnd(cliente);
    }

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
    <button onclick="editarCliente(${cliente.id})" class="btn btn-outline-primary btn-sm mr-3">
        <i class="bi bi-pencil"></i>
    </button>
    <button onclick="excluirCliente(${cliente.id})" class="btn btn-outline-primary btn-sm mr-3">
        <i class="bi bi-trash"></i>
    </button>`;
    

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

// Colocar clientes da api na tabela
function popularTabela(clientes){
    tabelaCliente.textContent = "";

    clientes.forEach(cliente => {
        criarLinhaNaTabela(cliente)
    });
}

// Limpar o Modal
function limparModalCliente(){
    myModal.id.value ="";
    myModal.nome.value = "";
    myModal.cpf.value = "";
    myModal.telefone.value = "";
    myModal.dataCadastro.value = "";
    myModal.email.value = "";
}

function adicionarClienteBackEnd(cliente){

    cliente.dataCadastro = new Date().toISOString();

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body : JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(response => {

        let novoCliente = new Cliente(response);
        listaClientes.push(novoCliente);

        popularTabela(listaClientes)

        modalCliente.hide();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}

function atualizarClienteBackEnd(cliente){

    fetch(`${URL}/${cliente.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body : JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(() => {
        atualizarClienteNaLista(cliente, false);
        modalCliente.hide();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}

function excluirClienteBackEnd(cliente){

    fetch(`${URL}/${cliente.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        }
    })
    .then(response => response.json())
    .then(() => {
        atualizarClienteNaLista(cliente, true);
        modalCliente.hide();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente excluido com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}

function atualizarClienteNaLista(cliente, removerCliente){

    let indice = listaClientes.findIndex((c) => c.id == cliente.id);

    (removerCliente) 
        ? listaClientes.splice(indice, 1)
        : listaClientes.splice(indice, 1, cliente);

    popularTabela(listaClientes);
}

pegarClientes();