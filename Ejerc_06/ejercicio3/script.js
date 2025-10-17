const checkbox = document.getElementById('terms');
const btn = document.getElementById('submitBtn');

checkbox.addEventListener('change', () => {
  btn.disabled = !checkbox.checked;
});