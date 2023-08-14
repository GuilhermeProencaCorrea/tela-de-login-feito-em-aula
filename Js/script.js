function loginEntra () {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    if(senha== 123 && email=='exemplo@gmail.com'){
        window.open("home.html", "_self");
    }else{
        alert("Senha ou e-mail incorretos!");
    }
}