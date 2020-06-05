module.exports = class Workers {
    constructor(json){
        if(json){
            this.name = json.name
            this.login = json.login
            this.password = json.password
            this.birth = json.birth
            this.rg = json.rg
            this.cpf = json.cpf
            this.id_profession = json.id_profession
        }
    }
}
