function list(artistas) {
  let html = `
  <link rel="stylesheet" href="../public/css/styles.css">
  <h1>Artistas</h1>
  <a href="/artista/form">Añadir artista</a><ul>`;

  artistas.forEach(a => {
    html += `
      <li>
        <img src="${a.foto}" width="50">
        <a href="/artista/${a.id}">${a.nombre}</a>
        - <a href="/artista/form/${a.id}">Editar</a>
        - <a href="/artista/delete/${a.id}">Eliminar</a>
      </li>
    `;
  });

  html += `</ul>`;
  return html;
}

function detail(artista, albumes) {
  let html = `
    <h1>${artista.nombre}</h1>
    <img src="${artista.foto}" width="150">
    <p>${artista.pais}</p>
    <p>${artista.genero}</p>
    <p>${artista.fecha_formacion}</p>

    <h2>Álbumes</h2>
    <ul>
  `;

  albumes.forEach(a => {
    html += `<li>${a.titulo} (${a.anio})</li>`;
  });

  html += `</ul><a href="/artista">Volver</a>`;

  return html;
}

function form(artista = {}) {

  return `
    <h1>${artista.id ? "Editar artista" : "Nuevo artista"}</h1>

    <form action="/artista/save" method="POST">

      <input type="hidden" name="id" value="${artista.id || ""}">

      Nombre:<br>
      <input name="nombre" value="${artista.nombre || ""}"><br><br>

      País:<br>
      <input name="pais" value="${artista.pais || ""}"><br><br>

      Género:<br>
      <input name="genero" value="${artista.genero || ""}"><br><br>

      Año formación:<br>
      <input name="fecha_formacion" value="${artista.fecha_formacion || ""}"><br><br>

      Foto:<br>
      <input name="foto" value="${artista.foto || ""}"><br><br>

      <button>Guardar</button>
    </form>
  `;
}


module.exports = { list, detail, form };
