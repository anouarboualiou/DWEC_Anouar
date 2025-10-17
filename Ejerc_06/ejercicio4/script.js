document.getElementById('colors').addEventListener('click', (e) => {
  if(e.target.classList.contains('square')){
    document.body.style.backgroundColor = e.target.style.backgroundColor;
  }
});