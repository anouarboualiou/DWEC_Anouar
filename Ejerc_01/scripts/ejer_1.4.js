const ciudades = ["Madrid", "Buenos Aires", "Tokio", "Nueva York", "Paris"]

ciudades [5] = "Barcelona"

const ciudadesMayusculas = ciudades.map(ciudad => ciudad.toUpperCase())

console.log(ciudadesMayusculas)

const ciudadesFiltradas = ciudades.filter(ciudad => ciudad.length > 6)
