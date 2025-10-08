//ejercicio 3.3
const libros = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    paginas: 471
  },
  {
    id: 2,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    paginas: 863
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    paginas: 328
  },
  {
    id: 4,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    paginas: 96
  },
  {
    id: 5,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    paginas: 249
  },
  {
    id: 6,
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    paginas: 576
  },
  {
    id: 7,
    titulo: "Crimen y castigo",
    autor: "Fiódor Dostoyevski",
    paginas: 671
  },
  {
    id: 8,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    paginas: 432
  },
  {
    id: 9,
    titulo: "El señor de los anillos: La comunidad del anillo",
    autor: "J.R.R. Tolkien",
    paginas: 423
  },
  {
    id: 10,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    paginas: 309
  }

];


export function agregarLibro(nuevoLibro) {
  libros.push(nuevoLibro);
}


export function obtenerLibros(){

    libros.forEach((libro, index) =>{

        console.log(index +1, libro.id, libro.titulo, libro.autor, libro.paginas);


    })

}

//ejercicio 3.4

export function buscarLibro(id){


  const librobuscado = libros.find(function(libro){
    return libro.id === id;

  })
}


export function eliminarLibro(id){

  const index = libros.findIndex(libro => libro.id === id);

  if(index !== -1){

    libros.splice(index,1);
    console.log(`El libro con ID ${id} ha sido eliminado.`);
  } else {
    console.log(`No se encontró un libro con ID ${id}.`);


}

}

//ejercicio 3.5

export function calcularTotalPaginas(){


const totalPaginas = libros.reduce((acumulador, libro) => acumulador + libro.paginas, 0);
console.log(`El total de páginas de todos los libros es: ${totalPaginas}`);


}


//ejercicio 3.6

export function ordenarPorPaginas(){

  const librosOrdenados = libros.sort((a,b) => a.paginas - b.paginas);
}




