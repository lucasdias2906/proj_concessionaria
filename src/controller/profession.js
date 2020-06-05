const mysql = require("mysql")

const db = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect(function (err) {
    if (err) throw console.warn("Banco não conectado ", err)
    console.log("Conectado com o banco, PROFESSION OK")
})


exports.get = ((req, res) => {
    const query = "SELECT * FROM profession"
    db.query(query, function (err, rows) {
        if (!err) {
            res.send({ data: rows })
        } else { res.status(400).send({ message: "Erro ao realizar consulta" }) }
    })
})

exports.post = async (req, res) => {
    const profession = {
        name: req.body.name
    }

    if (profession.name === undefined) return res.status(400).send({message:" name é obrigatorio"})
    
    const values = profession

    const query = `INSERT INTO profession (name)
        VALUES('${profession.name}}')`

    db.query(query, values, function (err, rows) {
        console.log("cadastrado com sucesso", values)
        if (!err) return res.status(200).send({ message: "Cadastro feito" })


        return err
    })
}

exports.put = async (req, res) => {
    const profession = {
        id: req.body.id,
        name: req.body.name
    }

    if (profession.name === undefined) return res.status(400).send({message:" name é obrigatorio"})
    
    const values = profession

    const query = `UPDATE profession SET id = '${profession.id}', name = '${profession.name}' WHERE id = '${profession.id}'`

    db.query(query, values, function(err,rows){
        console.warn("profession atualizada", values)
        if(!err) return res.status(200).send({ message: "atualização feita" })

        return err
    })
}

exports.delete = async (req, res,err) => {
    const profession = {
        id: req.body.id,
        name: req.body.name
    }
    const values = profession

    const query = `DELETE FROM profession WHERE id =${profession.id}`

    db.query(query, values, function(err,rows){
        console.warn("profissão deletada", values)
        if(!err) return res.status(200).send({ message: "profissão deletada" })

        return err
    })
}