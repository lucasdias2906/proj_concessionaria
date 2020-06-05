

function MascaraData(data){
    if(data ==false){
            event.returnValue = false;
    }       
    return MascaraData(data, '00/00/0000', event);
}

// function MascaraCPF(cpf){
//     if(mascaraInteiro(cpf)==false){
//             event.returnValue = false;
//     }       
//     return formataCampo(cpf, '000.000.000-00', event);
// }

// function MascaraRG(rg){
//     if(mascaraInteiro(rg)==false){
//             event.returnValue = false;
//     }       
//     return formataCampo(rg, '00.000.000-0', event);
// }
