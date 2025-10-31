
const elViewport = document.getElementById("viewport");
const elOuter = document.getElementById("outer");
const elPosition = document.getElementById("position");
const elResolution = document.getElementById("resolution");
const elAvailable = document.getElementById("available");
const elConnection = document.getElementById("connection");
const elIndicator = document.getElementById("indicator");


function updateInfo() {
  elViewport.textContent = `${window.innerWidth} x ${window.innerHeight}`;
  elOuter.textContent = `${window.outerWidth} x ${window.outerHeight}`;
  elResolution.textContent = `${screen.width} x ${screen.height}`;
  elAvailable.textContent = `${screen.availWidth} x ${screen.availHeight}`;

  updateConnectionStatus();
}

function updateConnectionStatus() {
  const online = navigator.onLine;
  elConnection.textContent = online ? "Online" : "Offline";
  elIndicator.style.backgroundColor = online ? "green" : "red";
}


let lastX = window.screenX;
let lastY = window.screenY;

function checkWindowPosition() {
  if (window.screenX !== lastX || window.screenY !== lastY) {
    lastX = window.screenX;
    lastY = window.screenY;

    elPosition.textContent = `${lastX}, ${lastY}`;
  }
}


setInterval(checkWindowPosition, 250);

window.addEventListener("resize", updateInfo);


window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);


