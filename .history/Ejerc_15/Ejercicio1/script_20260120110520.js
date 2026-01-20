const dropzone = document.getElementById("dropzone");
const previews = document.getElementById("previews");
const output = document.getElementById("output");

let images = [];

dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.style.background = "#eee";
});

dropzone.addEventListener("dragleave", () => {
  dropzone.style.background = "";
});

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.style.background = "";

  [...e.dataTransfer.files].forEach(file => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      images.push({ file, src: reader.result });

      const div = document.createElement("div");
      div.className = "preview";
      div.innerHTML = `<img src="${reader.result}"><span>${file.name}</span>`;
      previews.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
});


document.getElementById("process").addEventListener("click", () => {
  output.innerHTML = "";

  const watermark = document.getElementById("watermark").value;
  const maxWidth = Number(document.getElementById("maxWidth").value);
  const format = document.getElementById("format").value;

  images.forEach(({ file, src }) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const w = img.width * scale;
      const h = img.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, w, h);

      // Marca de agua
      ctx.font = "20px Arial";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.textAlign = "right";
      ctx.fillText(watermark, w - 10, h - 10);

      const dataURL = canvas.toDataURL(format);

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `editada-${file.name}`;
      link.textContent = `Descargar ${file.name}`;

      output.appendChild(link);
      output.appendChild(document.createElement("br"));
    };
  });
});

