const grid = document.getElementById('grid');
let isDrawing = false;

for(let i=0;i<40;i++){
  for(let j=0;j<40;j++){
    const cell = document.createElement('div');
    cell.className='cell';
    grid.appendChild(cell);
  }
}

grid.addEventListener('mousedown', e => { if(e.target.classList.contains('cell')) isDrawing = true; paint(e); });
grid.addEventListener('mouseup', () => isDrawing = false);
grid.addEventListener('mouseover', paint);

function paint(e){
  if(isDrawing && e.target.classList.contains('cell')) e.target.style.backgroundColor='black';
}