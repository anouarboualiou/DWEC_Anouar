const productosDOM = document.querySelectorAll('#productos .producto');
const carritoDOM = document.getElementById('carrito');
const totalDOM = document.getElementById('total');

let carrito = []; 


productosDOM.forEach(producto => {
  const boton = producto.querySelector('button');
  boton.addEventListener('click', () => {
    const nombre = producto.querySelector('strong').textContent;
    const precio = parseFloat(producto.querySelector('.precio').textContent);

    
    const existente = carrito.find(item => item.nombre === nombre);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    renderizarCarrito();
  });
});


function renderizarCarrito() {
  carritoDOM.innerHTML = ''; 

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('carrito-item');
    li.textContent = `${item.nombre} (x${item.cantidad}) - ${item.precio * item.cantidad} €`;

 
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Quitar';
    btnEliminar.addEventListener('click', () => {
      if (item.cantidad > 1) {
        item.cantidad -= 1;
      } else {
        carrito = carrito.filter(p => p.nombre !== item.nombre);
      }
      renderizarCarrito();
    });

    li.appendChild(btnEliminar);
    carritoDOM.appendChild(li);
  });

  calcularTotal();
}


function calcularTotal() {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  totalDOM.textContent = total.toFixed(2);
}
