import { crearPerfil as nuevoPerfil, calcularEdadPromedio, mostrarPerfil, obtenerMayoresDeEdad} from "./gestorUsuarios.js"



const usuario1 = nuevoPerfil("Ana", "ana@gmail.com", 28)

const usuario2 = nuevoPerfil("Luis", "luis@gmail.com", 35)

const usuario3 = nuevoPerfil("Gema", "gema@gmail.com", 12)

const usuario4 = nuevoPerfil("Adrian", "adrian@gmail.com", 14)

const usuario5 = nuevoPerfil("Maria", "maria@gmail.com", 18)

const usuarios = [usuario1, usuario2, usuario3, usuario4, usuario5]


const mayoresEdad = obtenerMayoresDeEdad(usuarios)

console.log("Usuarios mayores de edad:")

for (const usuario of mayoresEdad) {

    console.log(mostrarPerfil(usuario))
}

const edadPromedio = calcularEdadPromedio(usuarios)

console.log(`Edad promedio de los usuarios: ${edadPromedio}`)   

