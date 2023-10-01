class Cliente {
    constructor(obj) {
        obj = obj  || {};

        this.id = obj.id;
        this.nome = obj.nome;
        this.cpfOuCnpj = obj.cpfOuCnpj;
        this.telefone = obj.telefone;
        this.dataCadastro = obj.dataCadastro;
        this.email  = obj.email;
        
    }
}