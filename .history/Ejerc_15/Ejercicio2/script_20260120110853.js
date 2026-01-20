let draggedCard = null;

document.addEventListener("dragstart", e => {
  if (!e.target.classList.contains("card")) return;

  draggedCard = e.target;
  e.target.classList.add("dragging");

  const data = {
    id: e.target.dataset.id,
    status: e.target.parentElement.dataset.status
  };

  e.dataTransfer.setData("application/json", JSON.stringify(data));
});
