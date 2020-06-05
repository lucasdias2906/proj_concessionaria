const mysql = require("mysql")

const db = mysql.createConnection({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect(function (err) {
    if (err) throw console.warn("NÃO CONECTOU COM O BANCO ", err)
    console.log("Conectado com o banco, LOGGED OK")
})

exports.logged = (data, call) => {

    const workers = {
        login: data.login,
        password: data.password
    }

    const values = workers

    const query = `SELECT*FROM workers WHERE login = '${workers.login}' AND password = '${workers.password}'`

    db.query(query, values, function (err, rows) {
        if (!err)
            return call(rows)
        return call(err)

    })
}