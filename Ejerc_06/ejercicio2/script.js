document.getElementById('addRow').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;

  const tr = document.createElement('tr');
  const tdNombre = document.createElement('td');
  tdNombre.textContent = nombre;
  const tdApellido = document.createElement('td');
  tdApellido.textContent = apellido;

  tr.appendChild(tdNombre);
  tr.appendChild(tdApellido);

  document.getElementById('tbody').appendChild(tr);

  document.getElementById('form').reset();
});