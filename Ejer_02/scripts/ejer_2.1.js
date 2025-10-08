const numeros = [1,6,2,5,7,17]


const dobles = numeros.map(numero => numero*2)

const pares = numeros.filter(numero => numero % 2 === 0)


for (const numero of pares){

    console.log(numero)
}

