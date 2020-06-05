const { post } = require("../controller/workers")
// const redis = require("redis");
// const JWTR =  require("jwt-redis").default;
// const redisClient = redis.createClient();
// const jwtr = new JWTR(redisClient);
const { verify, sign } = require("jsonwebtoken")
const { logged } = require("../controller/logged")
const controWorkers = require("../controller/workers")
const authWokers = require("../services/workers_auth")
const ValidationContract = require("../validators/worker_validator")
const md5 = require("md5")

exports.postWorkers = (req, res, err) => {
    const workers = req.body

    if (!workers.name || !workers.password || !workers.birth || !workers.rg || !workers.cpf) return err


    const contract = new ValidationContract();
    
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isLogin(req.body.login, 6, "O login deve conter pelo menos 6 caracteres,digitos,letras minusculas e maiusculas,caractere especiais");
    contract.isPassword(req.body.password, 8, "password deve conter pelo menos 8 caracteres,digitos,letras minusculas e maiusculas,caractere especiais");
    contract.hasMinLen(req.body.rg, 9, 'O nome deve conter 9 caracteres');
    contract.hasMinLen(req.body.cpf, 11, 'O nome deve conter pelo menos 11 caracteres');

    console.log(contract.isValid())
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        console.log("LDIKSHDKSHDKSHDHS", contract.errors())
        return contract.errors();
    }

        workers.name = md5(workers.name, process.env.PRIVATE_KEY)
        workers.password = md5(workers.password, process.env.PRIVATE)
        workers.birth = md5(workers.birth, process.env.PRIVATE_KEY)
        workers.rg = md5(workers.rg, process.env.PRIVATE_KEY)
        workers.cpf = md5(workers.cpf, process.env.PRIVATE_KEY)
        
        console.log("Dados Pessoais do Funcionario foram Criptografados com sucesso ")

    
        post(workers, (sucess) => {
            if (!sucess) {
            console.warn("Não conseguiu conectar com a porta ", process.env.PORT)
            return res.status(200).json({ mensagem: err })
        }
        console.log("Funcionario Cadastrado ", sucess)
        return res.status(200).json({ mensagem: " Cadastrado com Sucesso"})
    })
    
}

exports.deleteWorkers = (req, res, err) => {
    const workers = req.body

    if (!workers.id) return err

    controWorkers.delete(workers, (sucess) => {
        if (!sucess) {
            return res.status(400).send({ menssage: err })
        }
        console.log("DELETADO ", sucess)
        return res.status(200).json({ menssage: "Deletado com SUCESSO" })
    })
}

exports.login = (req, res, err) => {
    const { login, password } = req.body
    if (!login && !password) return err

    const workers = { login, password }

    logged(workers, (sucess) => {
        if (!sucess) {
            return res.status(400).json({ message: "Login ou Password invalidos" })
        }

        const result = md5(password, workers.password)
        if (result) {
            workers.password = undefined
            const jsontoken = sign({ login: workers.login }, process.env.PRIVATE_KEY, {
                expiresIn: "1h"
            })
            return res.status(200).json({
                message: "Logado com Sucesso",
                token: jsontoken,
                decrypted: verify(jsontoken, process.env.PRIVATE_KEY),
                data: workers
            })
        } else {
            console.log(err)
            return err
        }
    })
}

exports.refreshToken = async (req, res, err) => {
    try {
        const token = req.body.token || req.query.token || req.headers.authorization
        const workers = await authWokers.decodeToken(token)

        if(!workers.login){
            res.status(404).send({message:"Login não encontrado"})
        }

        const tokenWorker = await authWokers.generateToken({
            login:workers.login
        })
            res.status(201).send({
                token:tokenWorker,
                data:{
                    login:workers.login
                }
            })
    } catch (error) {
        res.status(500).send({message:"Falha ao processar a requisição"})
        
    }
}