let errors = []

function ValidationContract(){
    errors = []
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

ValidationContract.prototype.isPassword = (value,blabla, message) => {
    var reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

// /^
//   (?=.*\d)              // deve conter ao menos um dígito
//   (?=.*[a-z])           // deve conter ao menos uma letra minúscula
//   (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
//   (?=.*[$*&@#])         // deve conter ao menos um caractere especial
//   [0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados
// $/

ValidationContract.prototype.isLogin = (value,maxLength = null, message) => {
    var reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

ValidationContract.prototype.errors = () => { 
    return errors; 
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}



module.exports = ValidationContract;