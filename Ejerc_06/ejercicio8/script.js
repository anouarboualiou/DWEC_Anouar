const list = document.getElementById('list');

function updateButtons() {
  const items = list.children;
  Array.from(items).forEach((li, i) => {
    li.querySelector('.up').disabled = i===0;
    li.querySelector('.down').disabled = i===items.length-1;
  });
}

list.addEventListener('click', e => {
  const li = e.target.parentElement;
  if (e.target.classList.contains('up')) {
    if (li.previousElementSibling) list.insertBefore(li, li.previousElementSibling);
  }
  if (e.target.classList.contains('down')) {
    if (li.nextElementSibling) list.insertBefore(li.nextElementSibling, li);
  }
  updateButtons();
});

updateButtons();