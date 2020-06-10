


exports.formatCPF = function mCPF(cpf) {
    cpf = cpf.toString().replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

exports.formatBirth = function mBirthDay(dateValue) {
    dateValue = dateValue.toString()
    return dateValue.substr(0, 2) + "/" + dateValue.substr(2, 2) + "/" + dateValue.substr(4, 7)
}


// console.log(mCPF(096459991845))
// console.log(mBirthDay(27101997))
