const producto = {
    nombre : "teclado",
    precio : 20

}


const cliente = {
    nombreCliente : "Dolores",
    esPremium : false
}

const pedido = {...producto, ...cliente}

//console.table(pedido)


const producto2 = {
    nombreCliente : "Samuel",

}

const pedido2 = {...cliente, ...producto2}

console.table(pedido2)


