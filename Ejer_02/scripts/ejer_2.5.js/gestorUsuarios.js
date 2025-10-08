export function crearPerfil(nombre, edad, email) {

    return {nombre, edad, email}

}


export function mostrarPerfil(perfil) {

    return `Nombre: ${perfil.nombre}, Edad: ${perfil.edad}, Email: ${perfil.email}`
}


export function esMayorEdad(perfil){

    if(perfil.edad >=18){
        return true
    }

    else return false

}


export function obtenerMayoresDeEdad(perfiles){

    const mayores = perfiles.filter(perfil => esMayorEdad(perfil))

    return mayores

}

export function calcularEdadPromedio(perfiles){

    const media = usuarios.reduce((acum, perfil) => acum + perfil.edad, 0)
    return media / usuarios.length

}

