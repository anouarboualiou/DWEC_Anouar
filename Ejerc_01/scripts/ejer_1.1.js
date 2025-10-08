const nombre = "Anouar"
let edad = 19
//const tieneMascota = true no se puede renombrar por que la variable const es constante

let tieneMascota = true

edad = 20
tieneMascota = false

//console.log(nombre, typeof nombre, edad, typeof edad, tieneMascota, typeof tieneMascota)

let frase = `${nombre} tiene ${edad} años y ${tieneMascota? 'tiene' : 'no tiene'} mascota `

console.log(frase)

