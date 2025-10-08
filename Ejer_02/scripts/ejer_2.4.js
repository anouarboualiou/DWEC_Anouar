const usuario = {

    nombre: "wayeyey",
    email: "wayeyey67@gmail.com"

}

const perfil = {

    puesto: "jefe",
    empresa: "Logitec"

}

const empleado ={...usuario,...perfil}


const ciudad = empleado.ciudad?.direccion?.ciudad

const ciudadNoExistente = ciudad ?? "Ciudad no especificada"







