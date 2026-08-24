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
