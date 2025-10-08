import {obtenerLibros, agregarLibro} from './biblioteca.js';



const nuevoLibro = {
  id: 11,
  titulo: "El código Da Vinci",
  autor: "Dan Brown",
  paginas: 454
};

agregarLibro(nuevoLibro);
const libros = obtenerLibros();
console.log(libros);
