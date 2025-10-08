/*function retirarDinero (saldo,cantidad){

    if(saldo>=cantidad){

        const nuevoSaldo = saldo-cantidad

        return console.log(`Retiro exitoso. Saldo restante: ${nuevoSaldo}`)

    }

    else return console.log(`Saldo insuficiente`)



}*/

function retirarDinero (saldo,cantidad,tieneTarjetaCredito){

    

    if(saldo>=cantidad){

        const nuevoSaldo = saldo-cantidad

        return console.log(`Retiro exitoso. Saldo restante: ${nuevoSaldo}`)

    }


    else if (saldo<=cantidad && tieneTarjetaCredito === true){

        return console.log(`Saldo insuficiente,pagando con tarjeta de credito`)

    }

    else return console.log(`Saldo insuficiente`)


}
