const coche = {
    marca : "Volkswagen",
    modelo : "Touran",
    año : 2006,
    estaDisponible : false
}


//console.table(coche)

const {marca: marcaCoche, modelo : modeloCoche}= coche

//console.log(marcaCoche, modeloCoche)

coche.estaDisponible = true

coche.color = "gris"

delete coche.año

console.table(coche)

