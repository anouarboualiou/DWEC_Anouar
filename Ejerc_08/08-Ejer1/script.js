
    const form = document.getElementById('formPizza');
    const precioTotal = document.getElementById('precioTotal');
    const btnPedido = document.getElementById('btnPedido');
    const masaSelect = document.getElementById('masa');

    function actualizarPrecio() {
      let total = 0;

      const tamañoSeleccionado = form.querySelector('input[name="tamaño"]:checked');
      if (tamañoSeleccionado) {
        total += parseFloat(tamañoSeleccionado.value);
      }

     
      total += parseFloat(masaSelect.value);

      
      const extras = form.querySelectorAll('input[type="checkbox"]');
      extras.forEach(extra => {
        if (extra.checked) {
          total += parseFloat(extra.value);
        }
      });

    
      precioTotal.textContent = `Precio Total: ${total.toFixed(2)} €`;
    }


    form.addEventListener('change', actualizarPrecio);

    btnPedido.addEventListener('click', () => {
      const tamaño = form.querySelector('input[name="tamaño"]:checked').nextSibling.textContent.trim();
      const masa = masaSelect.options[masaSelect.selectedIndex].text;
      const extrasSeleccionados = [];
      form.querySelectorAll('input[type="checkbox"]:checked').forEach(chk => {
        extrasSeleccionados.push(chk.nextSibling.textContent.trim());
      });

      const resumen = `
Resumen de tu pedido:
- Tamaño: ${tamaño}
- Masa: ${masa}
- Ingredientes extra: ${extrasSeleccionados.length ? extrasSeleccionados.join(', ') : 'Ninguno'}
- ${precioTotal.textContent}`;

      alert(resumen);
    });

    actualizarPrecio();