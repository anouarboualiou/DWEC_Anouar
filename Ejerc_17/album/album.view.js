const layout = require('../views/layout')

function list(albumes){

    const rows = albumes.map(album => {
        return `
        <tr>
        <td>
            <img 
            src="${album.foto}" 
            class="img-thumbnail"
            style="width: 80px; height: 80px; object-fit: cover;"
            >
        </td>

        <td class="align-middle">
            ${album.titulo}
        </td>

        <td class="align-middle">
            ${album.anio}
        </td>

        <td class="align-middle">
            ${album.artistaNombre}
        </td>

        <td class="align-middle">

            <a href="/album/form/${album.id}" 
            class="btn btn-warning btn-sm me-2">
            Editar
            </a>

            <a href="/album/delete/${album.id}" 
            class="btn btn-danger btn-sm">
            Eliminar
            </a>

        </td>
        </tr>
            
        `
    }).join('')

    const html = `
        <div class="d-flex justify-content-between align-items-center mb-4">

        <h2 class="mb-0">Lista de Álbumes</h2>

        <a href="/album/form" class="btn btn-primary">
            + Añadir álbum
        </a>

        </div>

        <div class="card shadow">

        <div class="card-body">

            <table class="table table-hover align-middle mb-0">

            <thead class="table-dark">
                <tr>
                <th>Foto</th>
                <th>Título</th>
                <th>Año</th>
                <th>Artista</th>
                <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                ${rows}
            </tbody>

            </table>

        </div>

        </div>
    `;

    return layout('Albumes', html)

}

function form (album = {}, artistas = [], error = ''){

    const options = artistas.map(artista => {
        return `
            <option value="${artista.id}" ${album.artistaId == artista.id ? 'selected' : ''}>
                ${artista.nombre}
            </option>
        `
    }).join('')

    const html = `
        <div class="card shadow">

            <div class="card-body">

                <h2 class="mb-4">
                ${album.id ? 'Editar Álbum' : 'Nuevo Álbum'}
                </h2>

                ${error ? `
                <div class="alert alert-danger">
                    ${error}
                </div>
                ` : ''}

                <form method="POST" action="/album/save">

                <input type="hidden" name="id" value="${album.id || ''}">

                <div class="mb-3">
                    <label class="form-label">Título</label>

                    <input
                    type="text"
                    name="titulo"
                    class="form-control"
                    value="${album.titulo || ''}"
                    >
                </div>

                <div class="mb-3">
                    <label class="form-label">Año</label>

                    <input
                    type="number"
                    name="anio"
                    class="form-control"
                    value="${album.anio || ''}"
                    >
                </div>

                <div class="mb-3">
                    <label class="form-label">Foto URL</label>

                    <input
                    type="text"
                    name="foto"
                    class="form-control"
                    value="${album.foto || ''}"
                    >
                </div>

                <div class="mb-3">
                    <label class="form-label">Artista</label>

                    <select name="artistaId" class="form-select">
                    ${options}
                    </select>
                </div>

                <button class="btn btn-success">
                    Guardar
                </button>

                <a href="/albumes" class="btn btn-secondary">
                    Cancelar
                </a>

                </form>

            </div>

        </div>
    
    `

    return layout('Formulario Album', html)

}

module.exports = {list, form}