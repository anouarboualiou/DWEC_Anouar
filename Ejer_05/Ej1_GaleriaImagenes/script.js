function cambiarImagenPrincipal(indice) {
  const miniaturas = document.querySelectorAll('.miniatura'); ras
  const mini = miniaturas[indice]; 
  const src = mini.getAttribute('src'); 
  const principal = document.getElementById('imagen-principal');
  principal.setAttribute('src', src); 
}


function resaltarMiniatura(indice) {
  const miniaturas = document.querySelectorAll('.miniatura');
  miniaturas.forEach((m, i) => {
    if (i === indice) m.classList.add('activa');
    else m.classList.remove('activa');
  });
}


document.querySelectorAll('.miniatura').forEach((el, i) => {
  el.addEventListener('click', () => {
    cambiarImagenPrincipal(i);
    resaltarMiniatura(i);
  });
});