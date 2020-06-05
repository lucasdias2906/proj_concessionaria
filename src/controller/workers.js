const mysql = require("mysql")

// const FormatWorkers = require("../validators/format")

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