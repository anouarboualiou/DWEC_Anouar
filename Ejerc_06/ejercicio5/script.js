document.getElementById('search').addEventListener('input', () => {
  const filter = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('#countries li').forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(filter) ? '' : 'none';
  });
});