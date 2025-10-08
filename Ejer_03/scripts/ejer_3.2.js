const playlist = [

    {
    titulo: "Bohemian Rhapsody",
    artista: "Queen",
    duracion: 354
  },
  {
    titulo: "Billie Jean",
    artista: "Michael Jackson",
    duracion: 294
  },
  {
    titulo: "Shape of You",
    artista: "Ed Sheeran",
    duracion: 263
  },
  {
    titulo: "Hotel California",
    artista: "Eagles",
    duracion: 391
  },
  {
    titulo: "Imagine",
    artista: "John Lennon",
    duracion: 187
  },
  {
    titulo: "Smells Like Teen Spirit",
    artista: "Nirvana",
    duracion: 301
  },
  {
    titulo: "Hey Jude",
    artista: "The Beatles",
    duracion: 431
  },
  {
    titulo: "Rolling in the Deep",
    artista: "Adele",
    duracion: 228
  },
  {
    titulo: "Stairway to Heaven",
    artista: "Led Zeppelin",
    duracion: 482
  },
  {
    titulo: "Uptown Funk",
    artista: "Mark Ronson ft. Bruno Mars",
    duracion: 269
  }

];

const playlistFiltrada = playlist.filter(musica => musica.duracion > 180);

const stringArray = playlistFiltrada.map(musica => `La cancion ${musica.titulo} de ${musica.artista} dura ${musica.duracion} segundos`);
console.log(stringArray);

  