const email = document.getElementById("email");
const senha = document.getElementById("senha");
const button = document.getElementById("button-login");
const alertMessage = document.querySelector("#alert");
button.addEventListener("click", () => {
  let userEmail = document.getElementById("email").value;
  let userSenha = document.getElementById("senha").value;
  //! Validação de login sem API (Lógica)
  // if(!userSenha || !userEmail ){
  //     alert("Os campos de de senha e e-mail são obrigatérios!")
  // }else{
  //     if(userSenha == 123 && userEmail  =='exemplo@gmail.com'){
  //     window.open("home.html", "_self");
  //     }else{if(userSenha != 123 || userEmail  !='exemplo@gmail.com'){
  //     alert("Senha ou E-mail incorretos!");
  //     };
  //! Validação de login com API
  if (!userEmail || !userSenha) {
    // alert("Os campos de e-mail e senha são obrigatórios!");
    Swal.fire({
      icon: "error",
      title: "ATENÇÃO",
      text: "Os campos de e-mail e senha são obrigatórios!",
    });
    return;
  }
  autenticar(userEmail, userSenha);
});
function autenticar(email, senha) {
  const urlBase = `http://localhost:3400`;
  fetch(`${urlBase}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  })
    .then((response) => (response = response.json()))
    .then((response) => {
      if (!!response.mensagem) {
        alert(response.mensagem);
        return;
      } else {
        alert("Usuario autenticado com sucesso!");
        salvarToken(response.token);
        salvarUsuario(response.usuario);
        window.open("cadastro-de-produto.html", "_self");
        let y = email
        capturarEmail(y)
      }
    });
}

function capturarEmail(emaill){
    let captura = emaill;
    alert(emaill)
    colocarEmailNaTela(captura)
}

function colocarEmailNaTela(email) { 
    alert('kkkk')
    let x = document.getElementById('login');
    x.innerHTML = email;
}

function salvarToken(token) {
  localStorage.setItem("token", token);
}

function salvarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}



$(window).on("load", function(){
    // página totalmente carregada (DOM, imagens etc.)
    colocarEmailNaTela()
 });