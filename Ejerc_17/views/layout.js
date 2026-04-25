//Platilla reutilizable

function layout(titulo, contenido) {

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${titulo}</title>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

            <link rel="stylesheet" href="/css/style.css">
        </head>

        <body class="bg-light">

            <header class="bg-dark text-white p-4">

                <div class="container">

                    <h1>Discoteca Virtual</h1>

                    <nav>
                        <a href="/" class="text-white me-3">Inicio</a>
                        <a href="/albumes" class="text-white me-3">Álbumes</a>
                        <a href="/artistas" class="text-white">Artistas</a>
                    </nav>

                </div>

            </header>

            <main class="container py-4">
                ${contenido}
            </main>

        </body>
        </html>
    `
}

module.exports = layout