const dragItem = document.getElementById('draggable');
const container = document.getElementById('container');
let active = false, currentX, currentY, initialX, initialY;

dragItem.addEventListener('mousedown', dragStart);
document.addEventListener('mouseup', dragEnd);
document.addEventListener('mousemove', drag);

function dragStart(e) {
  active = true;
  initialX = e.clientX - (dragItem.offsetLeft || 0);
  initialY = e.clientY - (dragItem.offsetTop || 0);
}

function dragEnd() { active = false; }

function drag(e) {
  if (!active) return;
  e.preventDefault();
  currentX = e.clientX - initialX;
  currentY = e.clientY - initialY;
  const maxX = container.clientWidth - dragItem.offsetWidth;
  const maxY = container.clientHeight - dragItem.offsetHeight;
  dragItem.style.left = Math.min(Math.max(0, currentX), maxX) + 'px';
  dragItem.style.top = Math.min(Math.max(0, currentY), maxY) + 'px';
}