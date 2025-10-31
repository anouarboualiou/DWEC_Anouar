const progressBar = document.getElementById("progress-bar");
const backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";


  if (scrollTop > window.innerHeight) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});


backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
