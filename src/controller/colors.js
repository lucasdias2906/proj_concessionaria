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
    console.log("Conectado com o banco, COLORS OK")
})


exports.get = ((req, res) => {
    const query = "SELECT * FROM colors"
    db.query(query, function (err, rows) {
        if (!err) {
            res.send({ data: rows })
        } else { res.status(400).send({ message: "Erro ao realizar consulta" }) }
    })
})

exports.post = async (req, res) => {
    const colors = {
        name: req.body.name
    }

    if (colors.name === undefined) return res.status(400).send({message:" name é obrigatorio"})
    
    const values = colors

    const query = `INSERT INTO colors (name)
        VALUES('${colors.name}}')`

    db.query(query, values, function (err, rows) {
        console.log("cor cadastrada  com sucesso", values)
        if (!err) return res.status(200).send({ message: "cor cadastrada " })


        return err
    })
}

exports.put = async (req, res) => {
    const colors = {
        id: req.body.id,
        name: req.body.name
    }

    if (colors.name === undefined) return res.status(400).send({message:" name é obrigatorio"})
    
    const values = colors

    const query = `UPDATE colors SET id = '${colors.id}', name = '${colors.name}' WHERE id = '${colors.id}'`

    db.query(query, values, function(err,rows){
        console.warn("cor atualizada", values)
        if(!err) return res.status(200).send({ message: "atualização feita" })

        return err
    })
}

exports.delete = async (req, res) => {
    const colors = {
        id: req.body.id,
    }
    const values = colors

    const query = `DELETE FROM colors WHERE id =${colors.id}`

    db.query(query, values, function(err){
        console.warn("cor deletada", values)
        if(!err) return res.status(200).send({ message: "cor deletada" })

        return err
    })
}