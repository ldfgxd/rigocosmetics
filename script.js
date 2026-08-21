document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Código para el menú desplegable (si ya lo tenías)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Código para el carrusel de Instagram
    const carrusel = document.getElementById('carrusel');
    const btnIzq = document.getElementById('btn-izq');
    const btnDer = document.getElementById('btn-der');

    if (carrusel && btnIzq && btnDer) {
        btnDer.addEventListener('click', () => {
            carrusel.scrollBy({
                left: carrusel.clientWidth,
                behavior: 'smooth'
            });
        });

        btnIzq.addEventListener('click', () => {
            carrusel.scrollBy({
                left: -carrusel.clientWidth,
                behavior: 'smooth'
            });
        });
    }
});
// Hace que al hacer clic en la tarjeta de maquillaje (foto o título) te mande a la página
document.querySelector('.tarjeta-categoria').addEventListener('click', function(e) {
    // Si no le picaron directamente al botón de abajo, redirige a la página
    if (!e.target.classList.contains('btn-explorar')) {
        window.location.href = 'maquillaje.html';
    }
});