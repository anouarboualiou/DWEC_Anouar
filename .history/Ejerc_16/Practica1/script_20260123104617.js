const tabla = document.getElementById("tablaLogs");
const totalDiv = document.getElementById("total");

async function cargarLogs() {
  try {
    const response = await fetch("logs.txt");
    if (!response.ok) {
      throw new Error("Archivo logs.txt no encontrado");
    }

    const texto = await response.text();
    const lineas = texto.split("\n");

    let consumoTotal = 0;

    lineas.forEach(linea => {

      linea = linea.trim();
      if (linea === "") return;


      const esError = linea.includes("ERROR");


      const posGuion = linea.indexOf("-");
      const posBarra = linea.indexOf("|", posGuion);
      const idSesion = linea.slice(posGuion + 1, posBarra).trim();

      const userInicio = linea.indexOf("user:") + 5;
      const userFin = linea.indexOf("|", userInicio);
      const usuario = linea
        .slice(userInicio, userFin)
        .trim()
        .toLowerCase();

      const consInicio = linea.indexOf("consumo:") + 8;
      const consFin = linea.indexOf("bytes", consInicio);
      const consumoBytes = Number(
        linea.slice(consInicio, consFin).trim()
      );

      // 🔄 Bytes → MB
      const consumoMB = consumoBytes / (1024 * 1024);
      consumoTotal += consumoMB;

      // 🧱 DOM
      const fila = document.createElement("tr");
      if (esError) fila.classList.add("error");

      fila.innerHTML = `
        <td>${idSesion}</td>
        <td>${usuario}</td>
        <td>${consumoMB.toFixed(2)}</td>
      `;

      tabla.appendChild(fila);
    });

    // 🧮 Total con control de precisión
    totalDiv.textContent = `Consumo Total: ${consumoTotal.toFixed(2)} MB`;

  } catch (error) {
    console.error(error);
    totalDiv.textContent = "❌ Error cargando los logs";
  }
}

cargarLogs();
