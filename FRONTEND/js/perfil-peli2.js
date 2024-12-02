
(() => {
    let cart;
})();

// Esperamos a que el contenido del DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Recuperamos el tema guardado en localStorage (si no existe, usamos 'auto' por defecto)
    const temaGuardado = localStorage.getItem('temaActual') || 'auto';
    cart = JSON.parse(localStorage.getItem("cart")) !== null && JSON.parse(localStorage.getItem("cart")).length > 0 ? JSON.parse(localStorage.getItem("cart")) : [];


    // Aplicamos el tema guardado usando la función 'changeTheme'
    // Esta función debe estar definida en otro lugar para cambiar el tema de la página
    changeTheme(temaGuardado); 
});

/**
 * Función para mostrar la película seleccionada en la página.
 * Obtiene los detalles de la película desde localStorage y actualiza el contenido de la página.
 */
window.mostrarPelicula = function mostrarPelicula () {
    // Obtenemos la película guardada en localStorage bajo la clave 'peliculaSeleccionada'
    const peliculaJSON = localStorage.getItem('peliculaSeleccionada');

    // Verificamos si no hay película seleccionada (si el dato no existe en localStorage)
    if (!peliculaJSON) {
        // Si no hay película seleccionada, mostramos un mensaje de error en la consola
        console.error("No se encontró la pelicula seleccionada");
        return; // Salimos de la función si no se ha encontrado la película
    }

    // Convertimos la cadena JSON de la película de vuelta a un objeto JavaScript
    const pelicula = JSON.parse(peliculaJSON);
    console.log(pelicula); // Mostramos la película en la consola para verificar su contenido

    // Obtenemos el contenedor donde se mostrará el detalle de la película en la página
    const mainPelicula = document.querySelector('.main-pelicula');

    let peliculaInCart;

    if(cart){
        peliculaInCart = cart.find(m => m.id == pelicula.id)
        if(peliculaInCart){
            peliculaInCart.index = cart.findIndex(m => m.id == pelicula.id)
        }
    }

    // Actualizamos el contenido HTML del contenedor con los detalles de la película
    mainPelicula.innerHTML = `
    <div class="container-movie">
        <div class="left-section">
            <!-- Mostramos la imagen de la portada de la película -->
            <img id="img_perfil_peli" class="portada" src="${pelicula.portada}" alt="portada_img">
            <div class="details">
                <!-- Mostramos los detalles de la película como género, duración, reparto, etc. -->
                <div class="details-item"><h3>Género:</h3><p id="genero_text">${pelicula.generos.map(g=>g.nombre).join(', ')}</p></div>
                <div class="details-item"><h3>Duración:</h3><p id="duracion_text">${pelicula.duracion} min</p></div>
                <div class="details-item"><h3>Reparto:</h3><p id="reparto_text">${pelicula.reparto.map(r=>r.nombre).join(', ')}</p></div>
                <div class="details-item"><h3>Director:</h3><p id="director_text">${pelicula.director.nombre}</p></div>
                <div class="details-item"><h3>País:</h3><p id="pais_text">${pelicula.pais}</p></div>
                <div class="details-item"><h3>Clasificación:</h3><p id="clasificacion_text">${pelicula.clasificacion}</p></div>
                <div class="details-item"><h3>Rating:</h3><p id="rating_text">${pelicula.rating}</p></div>
                <div class="details-item"><h3>Año:</h3><p id="año_text">${pelicula.año}</p></div>
            </div>
        </div>
        <div class="right-section">
            <!-- Mostramos el video del trailer de la película en un iframe -->
            <div class="trailer">
                <iframe id="iframe_perfil_peli" width="700" height="350" src="https://www.youtube.com/embed/${getTrailerKey(pelicula.trailer)}" frameborder="0" allowfullscreen></iframe>
            </div>
            <!-- Título de la película -->
            <h2 id="titulo_text">${pelicula.titulo}</h2>
            <!-- Resumen o sinopsis de la película -->
            <div class="summary">
                <p id="resumen_text">${pelicula.sinopsis}</p>
            </div>
            <!-- Botón para comprar entradas -->
            ${
                peliculaInCart ? `
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity('${peliculaInCart.index}',event)">-</button>
                        <span id="quantity_${peliculaInCart.id}" class="mx-2">${peliculaInCart.quantity}</span>
                        <button class="btn btn-sm btn-secondary" onclick="increaseQuantity('${peliculaInCart.index}',event)">+</button>
                    </div>
                </div>
                `
            :
            `
                <div class="card-body d-flex flex-column justify-content-between">
                    <button class="btn btn-primary w-100 mt-2" onclick="addToCart('${pelicula.id}', '${pelicula.title}')">Agregar al carrito</button>
                </div>
            `
            }
        </div>
    </div>
    `;
}

/**
 * Función para obtener la clave del trailer (si el trailer es un enlace de YouTube).
 * Extrae el ID del video de YouTube a partir de la URL.
 */
function getTrailerKey(url) {
    // Usamos una expresión regular para extraer el ID del video de YouTube desde la URL
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    // Si se encuentra un ID de YouTube, lo retornamos
    return match ? match[1] : '';
}

// Llamamos a la función mostrarPelicula cuando el contenido de la página se haya cargado
document.addEventListener("DOMContentLoaded", mostrarPelicula);

