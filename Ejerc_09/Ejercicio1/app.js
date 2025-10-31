const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

const app = document.getElementById("app");
const links = document.querySelectorAll("nav a");


function updateActiveLink(route) {
  links.forEach(link => {
    link.classList.toggle("active", link.dataset.route === route);
  });
}


function loadPage(route, addToHistory = true) {
  const content = pages[route] || "<h1>404</h1><p>Página no encontrada.</p>";
  app.innerHTML = content;

  updateActiveLink(route);

  if (addToHistory) {
    history.pushState({ route }, "", "/" + route);
  }
}

links.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const route = link.dataset.route;
    loadPage(route, true);
  });
});

window.addEventListener("popstate", event => {
  const route = event.state?.route || "inicio";
  loadPage(route, false);
});


(function init() {
  const path = window.location.pathname.replace("/", "") || "inicio";
  loadPage(path, false);
})();
