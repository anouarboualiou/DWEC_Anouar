const cursos = [

    {nombre: "Mates",profesor: "Maria",
        estudiantes: [
            {nombreEstu: "Adrian",calificacion: 4},
            {nombreEstu: "Jesus",calificacion: 8},
            {nombreEstu: "Laura",calificacion: 6},
        ]
    
    },

    {nombre: "Frances",profesor: "Ana",
        estudiantes: [
            {nombreEstu: "Cristina",calificacion: 4},
            {nombreEstu: "Daniel",calificacion: 6},
            {nombreEstu: "Alan",calificacion: 6},
        ]
    
    },

    {nombre: "Lengua",profesor: "Jose",
        estudiantes: [
            {nombreEstu: "Samuel",calificacion: 5},
            {nombreEstu: "Anouar",calificacion: 7},
            {nombreEstu: "Carlos",calificacion: 2},
        ]
    
    },

    {nombre: "Ingles",profesor: "Ignacio",
        estudiantes: [
            {nombreEstu: "Pedro",calificacion: 6},
            {nombreEstu: "Chus",calificacion: 9},
            {nombreEstu: "Paula",calificacion: 3},
        ]
    
    }

]

const resumenCursos = cursos.map(curso => {

    let suma = 0
    for (const estudiante of curso.estudiantes){
        suma += estudiante.calificacion

    }

    const media = suma / curso.estudiantes.length 

    return {nombreCurso : curso.nombre, promedio: media}
})


const cursosDestacados = resumenCursos.filter(curso => curso.promedio >= 7)


cursosDestacados.forEach(curso => {
    console.log(`El curso ${curso.nombreCurso} tiene un promedio de ${curso.promedio} y es considerado destacado`)}
)

cursos.forEach(curso => {

    if(curso.estudiantes.some(estudiante => estudiante.calificacion< 4)){

        console.log(`En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas`)
    }


})


