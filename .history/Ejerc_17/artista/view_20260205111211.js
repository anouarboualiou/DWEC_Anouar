function list(artistas) {
  let html = `<h1>Artistas</h1>
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

  html += `</ul><a href="/artistas">Volver</a>`;

  return html;
}

module.exports = { list, detail };
