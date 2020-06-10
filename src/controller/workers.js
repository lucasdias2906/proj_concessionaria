const mysql = require("mysql")
const { Encripty } = require("../services/EncriptyDecripty")
const ValidationContract = require("../validators/worker_validator")
// const FormatDate = require("../validators/format")

const db = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect(function (err) {
    if (err) throw console.warn("Banco não conectado ", err)
    console.log("Conectado com o banco, WORKERS OK")
})

exports.get = ((req, res) => {
    const query = "SELECT * FROM workers"
    db.query(query, function (err, rows) {
        if (!err) {
            res.send({ data: rows })
        } else { res.status(400).send({ message: "Erro ao realizar consulta" }) }
    })
})

exports.post = async (data, call) => {

    const workers = {
        name: data.name,
        login: data.login,
        password: data.password,
        birth: data.birth,
        rg: data.rg,
        cpf: data.cpf,
        id_profession: data.id_profession,
        createdAt: new Date().getTime(),
        lastmodification: new Date().getTime()
    }

    // Validação dos dados
    const contract = new ValidationContract();

    contract.hasMinLen(data.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isLogin(data.login, 6, "O login deve conter pelo menos 6 caracteres,digitos,letras minusculas e maiusculas,caractere especiais");
    contract.isPassword(data.password, 8, "password deve conter pelo menos 8 caracteres,digitos,letras minusculas e maiusculas,caractere especiais");
    contract.hasMinLen(data.rg, 9, 'O nome deve conter 9 caracteres');
    contract.hasMinLen(data.cpf, 11, 'O nome deve conter pelo menos 11 caracteres');


    console.log(contract.isValid())
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        console.log("ERRO EM VALIDAÇÃO", contract.errors())
        return contract.errors();
    }

    // formatar CPF e DATA DE NASCIMENTO
    // workers.cpf = FormatDate.formatCPF(workers.cpf)
    // workers.birth = FormatDate.formatBirth(workers.birth)

    // Criptografar os dados 
    workers.name = Encripty.encryptValue(workers.name)
    workers.password = Encripty.encryptValue(workers.password)
    workers.birth = Encripty.encryptValue(workers.name)
    workers.rg = Encripty.encryptValue(workers.name)
    workers.cpf = Encripty.encryptValue(workers.name)

    console.log("Dados Pessoais do Funcionario foram Criptografados com sucesso ")


    const values = workers

    const query = `INSERT INTO workers (name,login,password,birth,rg,cpf,id_profession,createdAt,lastmodification)
    VALUES('${workers.name}','${workers.login}','${workers.password}','${workers.birth}','${workers.rg}','${workers.cpf}',
    '${workers.id_profession}','${workers.createdAt}','${workers.lastmodification}')`

    db.query(query, values, function (err, rows) {
        console.log("cadastrado ", values)
        if (!err) return call(rows)

        return call(err)
    })

}

exports.delete = async (data, call) => {
    const workers = {
        id: data.id
    }
    const values = workers

    const query = `DELETE FROM workers WHERE id =${workers.id}`

    db.query(query, values, function (err, rows) {
        console.log("Cadastro Deletado ", values)
        if (!err) return call(rows)
        return call(err)
    })
}