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



