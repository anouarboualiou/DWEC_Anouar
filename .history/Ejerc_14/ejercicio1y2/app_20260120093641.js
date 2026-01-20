const DATA_PATH = './data/productos.json';

const CART_KEY = 'carrito';

let productos = [];
let productosMostrados = [];

const mensajeEl = document.getElementById('mensaje');
const productosContainer = document.getElementById('productosContainer');
const categoriaSelect = document.getElementById('categoriaSelect');
const sortAscBtn = document.getElementById('sortAsc');
const sortDescBtn = document.getElementById('sortDesc');

async function cargarProductos() {
  try {
    mensajeEl.textContent = 'Cargando...';
    const res = await fetch(DATA_PATH);
    if (!res.ok) throw new Error('Error cargando datos: ' + res.status);
    const data = await res.json();
    productos = data;
    productosMostrados = [...productos];
    poblarCategorias(productos);
    mostrarProductos(productosMostrados);
    mensajeEl.textContent = '';
  } catch (err) {
    mensajeEl.textContent = 'Error al cargar productos: ' + err.message;
  }
}

function mostrarProductos(lista) {
  productosContainer.innerHTML = '';
  if (!lista || lista.length === 0) {
    productosContainer.innerHTML = '<p>No hay productos para mostrar.</p>';
    return;
  }
  for (const p of lista) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: €${Number(p.precio).toFixed(2)}</p>
      <p>Stock: ${p.stock}</p>
      <p>Categoría: ${p.categoria}</p>
      ${p.descripcion ? `<p>${p.descripcion}</p>` : ''}
      <button data-id="${p.id}" class="btnCarrito">
    Añadir al carrito
  </button>
    `;
    productosContainer.appendChild(card);
  }
}

function poblarCategorias(lista) {
  const categorias = Array.from(new Set(lista.map(p => p.categoria))).sort();
  categoriaSelect.innerHTML = '<option value="__todas">Todas</option>' + categorias.map(c => `<option value="${c}">${c}</option>`).join('');
  categoriaSelect.addEventListener('change', onCategoriaChange);
}

function onCategoriaChange() {
  const sel = categoriaSelect.value;
  if (sel === '__todas') {
    productosMostrados = [...productos];
  } else {
    productosMostrados = productos.filter(p => p.categoria === sel);
  }
  mostrarProductos(productosMostrados);
}

function ordenarPorPrecio(asc = true) {
  productosMostrados.sort((a, b) => asc ? a.precio - b.precio : b.precio - a.precio);
  mostrarProductos(productosMostrados);
}

sortAscBtn.addEventListener('click', () => ordenarPorPrecio(true));
sortDescBtn.addEventListener('click', () => ordenarPorPrecio(false));

const temaClaroBtn = document.getElementById('temaClaro');
const temaOscuroBtn = document.getElementById('temaOscuro');

function aplicarTema(tema) {
  document.body.classList.remove('tema-claro', 'tema-oscuro');

  if (tema === 'oscuro') {
    document.body.classList.add('tema-oscuro');
  } else {
    document.body.classList.add('tema-claro');
  }

  sessionStorage.setItem('tema', tema);
}

temaClaroBtn.addEventListener('click', () => aplicarTema('claro'));
temaOscuroBtn.addEventListener('click', () => aplicarTema('oscuro'));


const temaGuardado = sessionStorage.getItem('tema');

if (temaGuardado) {
  aplicarTema(temaGuardado);
} else {
  aplicarTema('claro');
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

document.addEventListener('click', function (e) {
  if (!e.target.classList.contains('btnCarrito')) return;

  const id = Number(e.target.dataset.id);
  let carrito = obtenerCarrito();

  const encontrado = carrito.find(p => p.id === id);

  if (encontrado) {
    encontrado.cantidad++;
  } else {
    carrito.push({ id: id, cantidad: 1 });
  }

  guardarCarrito(carrito);
  alert('Producto añadido al carrito');
});


const carritoDiv = document.getElementById('carrito');
const vaciarBtn = document.getElementById('vaciar');

function pintarCarrito() {
  const carrito = obtenerCarrito();
  carritoDiv.innerHTML = '';

  if (carrito.length === 0) {
    carritoDiv.textContent = 'Carrito vacío';
    return;
  }

  carrito.forEach(item => {
    carritoDiv.innerHTML += `
      Producto ID ${item.id} — Cantidad ${item.cantidad}<br>
    `;
  });
}

vaciarBtn.addEventListener('click', () => {
  localStorage.removeItem(CART_KEY);
  pintarCarrito();
});



cargarProductos();
pintarCarrito();
