document.addEventListener('DOMContentLoaded', () => {
    // Código para el menú desplegable (si ya lo tenías)
    const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
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
let tarjetaCategoria = document.querySelector('.tarjeta-categoria');
if (tarjetaCategoria) {
    tarjetaCategoria.addEventListener('click', function(e) {
        if (!e.target.classList.contains('btn-explorar')) {
            window.location.href = 'maquillaje.html';
        }
    });
}
function abrirModal(param1, param2) {
    let modal = document.getElementById("modalProducto");
    
    // Si le pasas imagen y título (como en maquillaje)
    if (param2) {
        let imgModal = document.getElementById("imgModal");
        let tituloModal = document.getElementById("tituloModal");
        let btnwhatsapp = document.getElementById("btnwhatsapp");

        if (modal && imgModal && tituloModal) {
            imgModal.src = param1;
            tituloModal.innerText = param2;
            modal.style.display = "block";

         let mensaje = `Hola, me interesa el producto: ${param2} de Glow Beauty Studio. ¿Me das info de pago?`;
            let numerowhatsApp = "526361113943"; // <--- Pon tu número aquí
            
            if (btnwhatsapp) {
                let urlWhatsApp = `https://wa.me/${numerowhatsApp}?text=${encodeURIComponent(mensaje)}`;
                
                // Asignamos el clic para que abra la ventana sin recargar
                btnwhatsapp.onclick = function(e) {
                    e.preventDefault(); // Bloquea cualquier comportamiento extraño
                    window.open(urlWhatsApp, '_blank');
                };
            }
        }
    } 
    // Si solo le pasas un ID (como en piel)
    else {
        let modalPorId = document.getElementById(param1);
        if (modalPorId) {
            modalPorId.style.display = "block";
        } else if (modal) {
            modal.style.display = "block";
        }
    }
}

function cerrarModal(id) {
    // Si le pasas un ID específico (como en piel), cierra ese:
    if (id) {
        let modalEspecifico = document.getElementById(id);
        if (modalEspecifico) {
            modalEspecifico.style.display = "none";
        }
    } 
    // Si no le pasas nada (como en maquillaje), cierra el general:
    let modalGeneral = document.getElementById("modalProducto");
    if (modalGeneral) {
        modalGeneral.style.display = "none";
    }
}
// --- LÓGICA DEL CARRITO CON LISTA Y WHATSAPP ---
let carrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
const TELEFONO_WA = "6361113943"; // <-- PON AQUÍ TU NÚMERO CON CLAVE DE PAÍS (ej: 521XXXXXXXXXX)

function actualizarUI() {
    const contadorElem = document.getElementById('contador-carrito');
    const totalElem = document.getElementById('total-items');
    const listaElem = document.getElementById('lista-carrito');
    const btnWA = document.getElementById('btn-whatsapp');

    if (contadorElem) contadorElem.textContent = carrito.length;
    if (totalElem) totalElem.textContent = carrito.length;

    if (listaElem) {
        listaElem.innerHTML = '';
        carrito.forEach((prod) => {
            const li = document.createElement('li');
            li.textContent = `• ${prod}`;
            listaElem.appendChild(li);
        });
    }

    // Generar enlace directo de WhatsApp con el pedido
    if (btnWA && carrito.length > 0) {
        const mensaje = encodeURIComponent(`Hola! Quisiera ordenar los siguientes productos:\n- ${carrito.join('\n- ')}`);
        btnWA.href = `https://wa.me/${TELEFONO_WA}?text=${mensaje}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarUI();

    // Abrir / Cerrar panel al dar clic en el icono 🛒
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#btn-abrir-carrito')) {
            const panel = document.getElementById('panel-carrito');
            if (panel) panel.classList.toggle('oculto');
            return;
        }

        // Detectar cuando agregan un producto
        const elemento = e.target.closest('button, a');
        if (!elemento || elemento.id === 'menu-toggle' || elemento.classList.contains('menu-toggle')) return;

        const texto = elemento.textContent.toLowerCase();

        if (texto.includes('agregar al carrito') || elemento.classList.contains('btn-agregar')) {
            // Intenta capturar el nombre del producto desde el título o la tarjeta más cercana
            const tarjeta = elemento.closest('.tarjeta, .modal-contenido, div');
            const titulo = tarjeta?.querySelector('h1, h2, h3, h4')?.textContent || 'Producto Glow Studio';

            carrito.push(titulo);
            localStorage.setItem('productosCarrito', JSON.stringify(carrito));
            actualizarUI();
        }

        // Botón de Vaciar Carrito
        if (e.target.closest('#btn-vaciar')) {
            carrito = [];
            localStorage.removeItem('productosCarrito');
            actualizarUI();
        }
    });
});
const audio = document.getElementById('audio-fondo');
const btnMusica = document.getElementById('btn-musica');

// 1. Al cargar cualquier página, revisar si la música estaba sonando y en qué segundo se quedó
window.addEventListener('DOMContentLoaded', () => {
    const estabaSonando = localStorage.getItem('musicaSonando');
    const segundoGuardado = localStorage.getItem('musicaTiempo');

    // Recuperar el segundo exacto
    if (segundoGuardado) {
        audio.currentTime = parseFloat(segundoGuardado);
    }

    // Si estaba sonando en la página anterior, darle play automáticamente
    if (estabaSonando === 'true') {
        audio.play().then(() => {
            btnMusica.textContent = '🔊';
            btnMusica.classList.add('sonando');
        }).catch(() => {
            // Si el navegador bloquea el auto-play al cambiar de página
            localStorage.setItem('musicaSonando', 'false');
        });
    }
});

// 2. Guardar el segundo actual todo el tiempo mientras suena
audio.addEventListener('timeupdate', () => {
    localStorage.setItem('musicaTiempo', audio.currentTime);
});

// 3. Control manual del botón 🎵
btnMusica.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnMusica.textContent = '🔊';
        btnMusica.classList.add('sonando');
        localStorage.setItem('musicaSonando', 'true');
    } else {
        audio.pause();
        btnMusica.textContent = '🎵';
        btnMusica.classList.remove('sonando');
        localStorage.setItem('musicaSonando', 'false');
    }
});
// Cerrar el carrito al hacer clic fuera de él
window.addEventListener('click', function(e) {
    const panel = document.getElementById('panel-carrito');
    const boton = document.getElementById('btn-abrir-carrito');

    // Si el carrito está abierto y el clic fue fuera del panel y fuera del botón
    if (panel && !panel.classList.contains('oculto') && !panel.contains(e.target)) {
        if (boton && !boton.contains(e.target)) {
            panel.classList.add('oculto');
        }
    }
});