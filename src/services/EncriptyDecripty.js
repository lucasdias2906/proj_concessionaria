const md5 = require("md5")

class Encryption {

    constructor() {
        this.PRIVATE_KEY = process.env.PRIVATE_KEY
    }

    encryptValue(value) {
        return md5(value, this.PRIVATE_KEY)
    }

    decrypteVaalue(value){
        return md5(value, this.PRIVATE_KEY)
    }
}

exports.Encripty = new Encryption()

