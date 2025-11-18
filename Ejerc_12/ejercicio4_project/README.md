# Ejercicio 4 - Panel de Pedidos con Detalles

## Estructura de ficheros
```
ejercicio4/
├─ index.html
├─ styles.css
├─ app.js
└─ data/
   ├─ pedidos.json
   ├─ detalles_pedido.json
   └─ productos.json
```

## Qué hice
- Busqué `pedidos.json` y `productos.json` en los datos disponibles.
- Si no existía `detalles_pedido.json`, generé uno sintético relacionando pedidos y productos para completar el ejercicio.
- Implementé `Promise.all` para cargar los tres archivos simultáneamente, combiné los datos con `combinarDatos` y calculé `totalPedido` para cada pedido.
- Preparé la UI que muestra cada pedido con su lista de detalles y el total formateado en euros.

## Cómo desplegar en Netlify
1. Sube el contenido a GitHub y usa Netlify "New site from Git".
2. O arrastra la carpeta del proyecto a Netlify Drop: https://app.netlify.com/drop
3. Cuando tengas la URL pública, pégala aquí y la incluiré en el README.

