const tabla = document.getElementById("tablaLogs");
const totalDiv = document.getElementById("total");

async function cargarLogs() {
  try {
    const response = await fetch("logs.txt");
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo logs.txt");
    }

    const texto = await response.text();
    const lineas = texto.split("\n");

    let consumoTotal = 0;

    lineas.forEach(linea => {
      // 🔹 Limpieza
      linea = linea.trim();
      if (linea === "") return;

      // 🔹 Detección de ERROR
      const esError = linea.includes("ERROR");

      // 🔹 Extracción ID (parte después del guion)
      const idInicio = linea.indexOf("ID:");
      const idGuion = linea.indexOf("-", idInicio);
      const idSesion = linea.slice(idGuion + 1, idGuion + 5);

      // 🔹 Usuario en minúsculas
      const userInicio = linea.indexOf("USER:") + 5;
      const userFin = linea.indexOf("|", userInicio);
      const usuario = linea.slice(userInicio, userFin).trim().toLowerCase();

      // 🔹 Extracción de consumo (soporta notación científica)
      const consInicio = linea.indexOf("CONSUMO:") + 8;
      const consFin = linea.indexOf("BYTES", consInicio);
      const consumoBytes = Number(linea.slice(consInicio, consFin).trim());

      // 🔹 Conversión a MB
      const consumoMB = consumoBytes / (1024 * 1024);
      consumoTotal += consumoMB;

      // 🔹 DOM: fila
      const fila = document.createElement("tr");
      if (esError) fila.classList.add("error");

      fila.innerHTML = `
        <td>${idSesion}</td>
        <td>${usuario}</td>
        <td>${consumoMB.toFixed(2)}</td>
      `;

      tabla.appendChild(fila);
    });

    // 🔹 Total con control de precisión
    totalDiv.textContent = `Consumo Total: ${consumoTotal.toFixed(2)} MB`;

  } catch (error) {
    console.error("Error al cargar los logs:", error);
    totalDiv.textContent = "❌ Error al cargar los datos";
  }
}

cargarLogs();
