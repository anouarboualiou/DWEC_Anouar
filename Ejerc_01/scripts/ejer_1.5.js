const estudiantes = [

    {nombre: "Ana",apellidos: "Rodriguez", calificacion: 5, aprobado: true}, 
    {nombre: "Pedro",apellidos: "Fernandez", calificacion: 3, aprobado: false},
    {nombre: "Juan",apellidos: "Alvarez", calificacion: 7, aprobado: true}

]

const estudiantesID = estudiantes.map((estudiante, index) => {
    return {...estudiante, id: index+1}
}) 


const estudiantesFiltrados = estudiantes.filter(estudiante => estudiante.calificacion >=5)

console.log(estudiantesFiltrados)

estudiantesFiltrados.forEach(estudiante => {

    console.log(`Felicidades ${estudiante.nombre}, has
        aprobado con ${estudiante.calificacion} `)
})

estudiantes.forEach(estudiante => {

    const aprobadoCorreccion = estudiante.calificacion >= 5

    if (estudiante.calificacion !== aprobadoCorreccion){

        console.log(`Incoherencia en el registro ${estudiante.nombre}: calificacion = ${estudiante.calificacion}, aprobado = ${estudiante.aprobado}`)
    }
})

