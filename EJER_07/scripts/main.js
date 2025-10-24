document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');

// --- Solución Ejercicio 1 y 4 ---

    const outerBox = document.getElementById("outer-box");
    const middleBox = document.getElementById("middle-box");
    const innerBox = document.getElementById("inner-box");

// Listener del contenedor exterior
    outerBox.addEventListener("click", (event) => {
        console.log("Elemento pulsado (target):", event.target.id);
        console.log("Elemento que maneja el evento (currentTarget):", event.currentTarget.id);

    
    event.target.style.backgroundColor = "coral";
});


    middleBox.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el outerBox reciba el evento
        middleBox.style.backgroundColor = "coral";
        console.log("Clic en middle-box (propagación detenida)");
    });


    // --- Solución Ejercicio 2 ---

    const testLink = document.getElementById("test-link");
    testLink.addEventListener("click", (event) => {
        event.preventDefault(); // Evita la navegación
        console.log("Navegación prevenida");
    });

    // --- Solución Ejercicio 3 ---

    const backToTopBtn = document.getElementById("back-to-top");


    window.addEventListener("scroll", () => {
        if (window.scrollY > 250) {
            backToTopBtn.classList.remove("hidden");
        } else {
            backToTopBtn.classList.add("hidden");
        }
    });


    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // --- Solución Ejercicio 5 ---

    const notificationBtn = document.getElementById("notification-btn");
    const notificationArea = document.getElementById("notification-area");


    document.body.addEventListener("notification", (event) => {
        const { message, date } = event.detail;
        notificationArea.innerHTML = `
            <p><strong>Mensaje:</strong> ${message}</p>
            <p><em>${date}</em></p>
        `;
    });


    notificationBtn.addEventListener("click", () => {
        const eventData = {
            message: "Has recibido una nueva notificación 🎉",
            date: new Date().toLocaleString()
        };

        const customEvent = new CustomEvent("notification", { detail: eventData });
        document.body.dispatchEvent(customEvent);
    });
});
