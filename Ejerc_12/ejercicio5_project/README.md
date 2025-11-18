# Ejercicio 5 - Panel completo de ventas

## Estructura de ficheros
```
ejercicio5/
├─ index.html
├─ styles.css
├─ app.js
└─ data/
   ├─ usuarios.json
   ├─ productos.json
   ├─ pedidos.json
   └─ detalles_pedido.json
```

## Qué hice
- Busqué los datos existentes y guardé copias en `data/` del proyecto.
- Si no existía `detalles_pedido.json`, generé uno sintético para poder relacionar pedidos y productos.
- Implementé carga inicial con `Promise.all` para usuarios, productos, pedidos y detalles; esos arrays se almacenan en variables globales.
- Poblado un `<select>` con los usuarios (value = id). Al seleccionar, se muestra:
  - Panel de Usuario con datos personales.
  - Panel de Pedidos con lista de pedidos enriquecidos (productos, cantidades, precio unitario y total por pedido).
  - Panel de Resumen con el gasto total acumulado del usuario.
- Todo el procesamiento se hace en el cliente combinando arrays (filter/map/reduce) y reutilizando funciones pequeñas.

## Cómo desplegar en Netlify
1. Subir al repositorio en GitHub y usar Netlify "New site from Git".
2. O arrastrar la carpeta del proyecto a Netlify Drop: https://app.netlify.com/drop
3. Pegar aquí la URL pública para que la incluya en el README.

