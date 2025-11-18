# Ejercicio 3 - Creación de un Nuevo Producto (Validación de SKU)

## Estructura de ficheros
```
ejercicio3/
├─ index.html
├─ styles.css
├─ app.js
└─ data/
   └─ productos.json  (aumentado con SKUs)
```

## Qué hice
- Aseguré que `data/productos.json` contiene el campo `sku` para cada producto y añadí un producto de prueba con SKU `TESTSKU12345`.
- Implementé un formulario con validaciones en tiempo real y una validación asíncrona de SKU que comprueba existencia en `data/productos.json` usando `fetch` + `some`.
- El botón "Guardar" está deshabilitado hasta que todas las validaciones (básicas + SKU disponible) sean correctas.
- El guardado está simulado (no se escribe en el JSON).

## Cómo desplegar en Netlify
1. Sube el contenido a GitHub y usa Netlify "New site from Git".
2. O arrastra la carpeta del proyecto a Netlify Drop: https://app.netlify.com/drop
3. Cuando tengas la URL pública, pégala aquí y la incluiré en el README.

## Producto de prueba con SKU conocido (para probar duplicados)
- SKU: TESTSKU12345
