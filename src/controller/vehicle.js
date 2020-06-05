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
    console.log("Conectado com o banco, VEHICLE OK")
})

exports.get = ((req, res) => {
    const query = "SELECT * FROM vehicles"
    db.query(query, function (err, rows) {
        if (!err) {
            res.send({ data: rows })
        } else { res.status(400).send({ message: "Erro ao realizar consulta" }) }
    })
})

exports.post = async (req, res) => {
    const vehicle = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        board: req.body.board,
        price: req.body.price,
        id_colors: req.body.id_colors,
        id_profession: req.body.id_profession,
        createdAt: new Date().getTime(),
        lastmodification: new Date().getTime()
    }

    if (vehicle.id_profession != 7) return res.status(400).send({ message: "Essa profissão não pode fazer cadastro do veiculo" })

    // if (vehicle === undefined) return res.status(400).send({message:"TODOS os campos são obrigatorios"})

    const values = vehicle

    const query = `INSERT INTO vehicles (brand,model,year,board,price,id_colors,id_profession,createdAt,lastmodification)
        VALUES('${vehicle.brand}', '${vehicle.model}', '${vehicle.year}', '${vehicle.board}', '${vehicle.price}', 
        '${vehicle.id_colors}','${vehicle.id_profession}','${vehicle.createdAt}','${vehicle.lastmodification}')`

    db.query(query, values, function (err, rows) {
        console.log("veiculo cadastrado com sucesso", values)
        if (!err) return res.status(200).send({ message: "veiculo cadastrado " })

        return err
    })
}

exports.put = async (req, res) => {
    const vehicle = {
        id: req.body.id,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        board: req.body.board,
        price: req.body.price,
        id_colors: req.body.id_colors,
        id_profession: req.body.id_profession,
        createdAt: new Date().getTime(),
        lastmodification: new Date().getTime()
    }

    if (vehicle.id_profession != 7) return res.status(400).send({ message: "Essa profissão não pode atualizar o veiculo" })

    const values = vehicle

    const query = `UPDATE vehicles SET id = '${vehicle.id}', brand = '${vehicle.brand}',model = '${vehicle.model}', year = '${vehicle.year}', 
    board = '${vehicle.board}',price = '${vehicle.price}',id_colors = '${vehicle.id_colors}',id_profession = '${vehicle.id_profession}',createdAt = '${vehicle.createdAt}',
    lastmodification = '${vehicle.lastmodification}'    
    WHERE id = '${vehicle.id}'`

    db.query(query, values, function (err, rows) {
        console.log("veiculo atualizado com sucesso ", values)
        if (!err) return res.status(200).send({ message: "veiculo atualizado " })

        return err
    })
}

exports.delete = async (req, res,err) => {
    const vehicle = {
        id: req.body.id
    }
    const values = vehicle

    const query = `DELETE FROM vehicles WHERE id =${vehicle.id}`

    db.query(query, values, function(err,rows){
        console.warn("veiculo deletada", values)
        if(!err) return res.status(200).send({ message: "veiculo deletado" })

        return err
    })
}