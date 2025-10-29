
const lista = document.getElementById('listaProductos');
const buscar = document.getElementById('buscar');
const categoria = document.getElementById('categoria');
const precioMax = document.getElementById('precioMax');
const valorPrecio = document.getElementById('valorPrecio');
const ordenRadios = document.querySelectorAll('input[name="orden"]');


document.addEventListener('DOMContentLoaded', () => {
  cargarCategorias();
  valorPrecio.textContent = precioMax.value;
  renderizarProductos(productos);
});


function cargarCategorias() {
  const categoriasUnicas = ['Todas', ...new Set(productos.map(p => p.categoria))];
  categoria.innerHTML = categoriasUnicas
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join('');
}


function renderizarProductos(listaProductos) {
  lista.innerHTML = '';
  if (listaProductos.length === 0) {
    lista.innerHTML = `<p class="text-center text-muted fs-5">No se encontraron productos</p>`;
    return;
  }

  listaProductos.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'col-md-3';
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text mb-1"><strong>${prod.precio} €</strong></p>
          <span class="badge bg-primary">${prod.categoria}</span>
        </div>
      </div>
    `;
    lista.appendChild(card);
  });
}


function filtrarProductos() {
  let resultado = [...productos];
  const texto = buscar.value.toLowerCase();
  const catSeleccionada = categoria.value;
  const precio = parseFloat(precioMax.value);
  const orden = document.querySelector('input[name="orden"]:checked').value;


  if (texto) {
    resultado = resultado.filter(p => p.nombre.toLowerCase().includes(texto));
  }

  if (catSeleccionada !== 'Todas') {
    resultado = resultado.filter(p => p.categoria === catSeleccionada);
  }

  resultado = resultado.filter(p => p.precio <= precio);
  
  if (orden === 'asc') resultado.sort((a, b) => a.precio - b.precio);
  if (orden === 'desc') resultado.sort((a, b) => b.precio - a.precio);
  if (orden === 'az') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));

  renderizarProductos(resultado);
}

buscar.addEventListener('input', filtrarProductos);
categoria.addEventListener('change', filtrarProductos);
precioMax.addEventListener('input', () => {
  valorPrecio.textContent = precioMax.value;
  filtrarProductos();
});
ordenRadios.forEach(r => r.addEventListener('change', filtrarProductos));
