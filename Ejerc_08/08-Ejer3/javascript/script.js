const filtroDestino = document.getElementById("filtroDestino");
const filtroTipo = document.getElementById("filtroTipo");
const filtroPrecio = document.getElementById("filtroPrecio");
const valorPrecio = document.getElementById("valorPrecio");
const listaActividades = document.getElementById("listaActividades");
const listaItinerario = document.getElementById("listaItinerario");
const totalPrecio = document.getElementById("totalPrecio");
const form = document.getElementById("formReserva");
const errores = document.getElementById("errores");
const seguro = document.getElementById("seguro");

let itinerario = [];


document.addEventListener("DOMContentLoaded", () => {
  cargarFiltros();
  valorPrecio.textContent = filtroPrecio.value;
  mostrarActividades(actividades);
});


function cargarFiltros() {
  const destinos = ["Todos", ...new Set(actividades.map(a => a.destino))];
  filtroDestino.innerHTML = destinos.map(d => `<option value="${d}">${d}</option>`).join("");

  const tipos = [...new Set(actividades.map(a => a.tipo))];
  filtroTipo.innerHTML = tipos.map(t =>
    `<div><input type="checkbox" value="${t}" class="chkTipo"> ${t}</div>`
  ).join("");
}


function mostrarActividades(lista) {
  listaActividades.innerHTML = "";
  lista.forEach(a => {
    const div = document.createElement("div");
    div.className = "col-md-6";
    div.innerHTML = `
      <div class="card p-2">
        <img src="${a.imagen}" class="card-img-top">
        <h6>${a.nombre}</h6>
        <p>${a.destino} - ${a.tipo}<br><strong>${a.precio} €</strong></p>
        <button class="btn btn-sm btn-success w-100" onclick="agregar(${a.id})">Añadir</button>
      </div>`;
    listaActividades.appendChild(div);
  });
}


document.querySelectorAll("#filtroDestino, #filtroPrecio").forEach(el =>
  el.addEventListener("input", aplicarFiltros)
);
filtroTipo.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  let resultado = actividades;
  const dest = filtroDestino.value;
  const max = filtroPrecio.value;
  const tiposSel = Array.from(document.querySelectorAll(".chkTipo:checked")).map(t => t.value);

  valorPrecio.textContent = max;

  if (dest !== "Todos") resultado = resultado.filter(a => a.destino === dest);
  if (tiposSel.length > 0) resultado = resultado.filter(a => tiposSel.includes(a.tipo));
  resultado = resultado.filter(a => a.precio <= max);

  mostrarActividades(resultado);
}


function agregar(id) {
  const act = actividades.find(a => a.id === id);
  if (!itinerario.includes(act)) itinerario.push(act);
  actualizarItinerario();
}
function quitar(id) {
  itinerario = itinerario.filter(a => a.id !== id);
  actualizarItinerario();
}

function actualizarItinerario() {
  listaItinerario.innerHTML = "";
  let total = 0;

  itinerario.forEach(a => {
    total += a.precio;
    listaItinerario.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${a.nombre} - ${a.precio} €
        <button class="btn btn-sm btn-danger" onclick="quitar(${a.id})">X</button>
      </li>`;
  });

  totalPrecio.textContent = total;

  if (total > 1000) {
    seguro.required = true;
  } else {
    seguro.required = false;
    seguro.checked = false;
  }
}


form.addEventListener("submit", e => {
  e.preventDefault();
  errores.textContent = "";

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const fecha = document.getElementById("fecha").value;
  const codigo = document.getElementById("codigo").value.trim();
  const total = parseFloat(totalPrecio.textContent);

  if (itinerario.length === 0) return (errores.textContent = "El itinerario está vacío.");
  if (!nombre || !email || !fecha) return (errores.textContent = "Completa todos los campos obligatorios.");
  if (new Date(fecha) < new Date()) return (errores.textContent = "La fecha no puede ser pasada.");
  if (total > 1000 && !seguro.checked) return (errores.textContent = "Debes marcar el seguro de viaje.");
  if (codigo && !/^[A-Z]{4}\d{2}$/.test(codigo)) return (errores.textContent = "Código de descuento inválido (Ej: ABCD25).");

  alert("Reserva confirmada. ¡Buen viaje!");
  form.reset();
  itinerario = [];
  actualizarItinerario();
});
