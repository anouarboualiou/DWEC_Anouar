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

document.querySelectorAll(".column").forEach(column => {
  column.addEventListener("dragover", e => {
    e.preventDefault();

    const afterElement = getDragAfterElement(column, e.clientY);
    if (afterElement == null) {
      column.appendChild(draggedCard);
    } else {
      column.insertBefore(draggedCard, afterElement);
    }
  });

  column.addEventListener("drop", e => {
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    draggedCard.dataset.status = column.dataset.status;
  });
});
