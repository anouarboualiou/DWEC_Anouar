const table = document.getElementById('table');

table.addEventListener('dblclick', e => {
  const target = e.target;
  if (target.tagName === 'TD') {
    const input = document.createElement('input');
    input.value = target.textContent;
    target.textContent = '';
    target.appendChild(input);
    input.focus();
    input.addEventListener('blur', () => { target.textContent = input.value; });
  }
});