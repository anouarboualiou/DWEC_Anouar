function list(albumes) {
  let html = `
  <h1>Álbumes</h1><ul>`;

  albumes.forEach(a => {
    html += `
      <li>
        <img src="${a.foto}" width="50">
        ${a.titulo} (${a.anio})
      </li>
    `;
  });

  html += `</ul>`;
  return html;
}

module.exports = { list };
