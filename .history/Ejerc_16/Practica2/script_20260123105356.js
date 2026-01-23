// ================================
// 1. Crear fecha desde múltiples formatos
// ================================
function crearFecha(entrada) {
    let fecha;

    if (typeof entrada === "number") {
        // Timestamp
        fecha = new Date(entrada);

    } else if (typeof entrada === "string") {
        // String (ISO o texto)
        fecha = new Date(entrada);

    } else if (typeof entrada === "object") {
        // Objeto { año, mes, dia }
        const { año, mes, dia } = entrada;
        fecha = new Date(año, mes, dia);
     

    } else {
        throw new Error("Formato de fecha no válido");
    }

    if (isNaN(fecha.getTime())) {
        throw new Error("Fecha inválida");
    }

    return fecha;
}


function iniciarContador(fechaEvento, elemento, tarjeta) {
    const intervalo = setInterval(() => {
        const ahora = Date.now();
        const diferencia = fechaEvento - ahora;

        if (diferencia <= 0) {
            elemento.textContent = "⛔ Finalizado";
            tarjeta.classList.add("finalizado");
            clearInterval(intervalo);
            return;
        }

        const totalSegundos = Math.floor(diferencia / 1000);

        const dias = Math.floor(totalSegundos / 86400);
        const horas = Math.floor((totalSegundos % 86400) / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        elemento.textContent =
            `${dias} : ${horas} : ${minutos} : ${segundos}`;

    }, 1000);
}

function ordenarEventos(eventos) {
    return eventos.sort((a, b) => a.fecha - b.fecha);
}


async function cargarEventos() {
    const contenedor = document.getElementById("eventos");

    try {
        const response = await fetch("./data/eventos.json");
        if (!response.ok) {
            throw new Error("No se pudo cargar eventos.json");
        }

        const datos = await response.json();

        const eventosProcesados = datos.map(evento => {
            return {
                nombre: evento.nombre,
                descripcion: evento.descripcion,
                fecha: crearFecha(evento.fecha)
            };
        });

        const eventosOrdenados = ordenarEventos(eventosProcesados);

        eventosOrdenados.forEach(evento => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("evento");

            const titulo = document.createElement("h3");
            titulo.textContent = evento.nombre;

            const descripcion = document.createElement("div");
            descripcion.classList.add("descripcion");
            descripcion.textContent = evento.descripcion;

            const contador = document.createElement("div");
            contador.classList.add("contador");

            tarjeta.appendChild(titulo);
            tarjeta.appendChild(descripcion);
            tarjeta.appendChild(contador);

            contenedor.appendChild(tarjeta);

            iniciarContador(evento.fecha, contador, tarjeta);
        });

    } catch (error) {
        contenedor.textContent = "❌ Error cargando los eventos";
        console.error(error);
    }
}


cargarEventos();
