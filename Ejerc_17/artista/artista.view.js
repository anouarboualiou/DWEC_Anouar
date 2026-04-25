
const layout = require('../views/layout')


function list(artistas){

    const cards = artistas.map(artista => {
        return `
            <div class="col-md-4 mb-4">

                <div class="card shadow h-100">

                

                    <img src="${artista.foto}" class="card-img-top">

                    <div class="card-body">

                        <h5>${artista.nombre}</h5>

                        <a href="/artista/${artista.id}" class="btn btn-primary">
                        Ver detalle
                        </a>

                    </div>

                    <div class="mt-3">

                        <a href="/artista/form/${artista.id}" class="btn btn-warning btn-sm">
                            Editar
                        </a>

                        <a href="/artista/delete/${artista.id}" class="btn btn-danger btn-sm">
                            Eliminar
                        </a>

                    </div>

                </div>

            </div>
        
        `
    }).join('')

    const html = `
        <h2 class="mb-4">Artistas</h2>

        <a href="/artista/form" class="btn btn-primary mb-4">
            Nuevo Artista
        </a>

        <div class="row">
            ${cards}
        </div>
    
    `


    return layout('Artistas', html)

}


function detail(artista, albumes){

    const albums = albumes.map(album => {
        return `
            <div class="col-md-4 mb-4">

                <div class="card shadow h-100">

                <img src="${album.foto}" class="card-img-top">

                <div class="card-body">

                    <h5>${album.titulo}</h5>
                    <p>${album.anio}</p>

                </div>

                </div>

            </div>
        `
    }).join('')


    const html = `
        <div class="card shadow mb-5">

        <div class="row g-0">

            <div class="col-md-4">
            <img src="${artista.foto}" class="img-fluid rounded-start">
            </div>

            <div class="col-md-8">

            <div class="card-body">

                <h2>${artista.nombre}</h2>

                <p><strong>País:</strong> ${artista.pais}</p>
                <p><strong>Género:</strong> ${artista.genero}</p>
                <p><strong>Formación:</strong> ${artista.fecha_formacion}</p>

            </div>

            </div>

        </div>

        </div>

        <h3 class="mb-4">Álbumes</h3>

        <div class="row">
        ${albums}
        </div>
    `

    return layout(artista.nombre, html)

}

function form(artista = {}){

    const html = `
        <div class="card shadow">

        <div class="card-body">

            <h2 class="mb-4">
            ${artista.id ? 'Editar Artista' : 'Nuevo Artista'}
            </h2>

            <form method="POST" action="/artista/save">

            <input type="hidden" name="id" value="${artista.id || ''}">

            <div class="mb-3">
                <label class="form-label">Nombre</label>

                <input
                type="text"
                name="nombre"
                class="form-control"
                value="${artista.nombre || ''}"
                >
            </div>

            <div class="mb-3">
                <label class="form-label">País</label>

                <input
                type="text"
                name="pais"
                class="form-control"
                value="${artista.pais || ''}"
                >
            </div>

            <div class="mb-3">
                <label class="form-label">Género</label>

                <input
                type="text"
                name="genero"
                class="form-control"
                value="${artista.genero || ''}"
                >
            </div>

            <div class="mb-3">
                <label class="form-label">Año Formación</label>

                <input
                type="number"
                name="fecha_formacion"
                class="form-control"
                value="${artista.fecha_formacion || ''}"
                >
            </div>

            <div class="mb-3">
                <label class="form-label">Foto URL</label>

                <input
                type="text"
                name="foto"
                class="form-control"
                value="${artista.foto || ''}"
                >
            </div>

            <button class="btn btn-success">
                Guardar
            </button>

            <a href="/artistas" class="btn btn-warning btn-sm">
                Volver
            </a>

            </form>

        </div>

        </div>
    `

    return layout('Formulario artista', html)
}

module.exports = {list, detail, form}