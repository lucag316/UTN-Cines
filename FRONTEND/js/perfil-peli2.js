

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

    let cart = JSON.parse(localStorage.getItem("cart")) !== null && JSON.parse(localStorage.getItem("cart")).length > 0 ? JSON.parse(localStorage.getItem("cart")) : [];
    
    // Verificamos si no hay película seleccionada (si el dato no existe en localStorage)
    if (!peliculaJSON) {
        // Si no hay película seleccionada, mostramos un mensaje de error en la consola
        console.error("No se encontró la pelicula seleccionada");
        return; // Salimos de la función si no se ha encontrado la película
    }

    // Convertimos la cadena JSON de la película de vuelta a un objeto JavaScript
    const pelicula = JSON.parse(peliculaJSON);
    // console.log(pelicula); // Mostramos la película en la consola para verificar su contenido

    // Obtenemos el contenedor donde se mostrará el detalle de la película en la página
    const mainPelicula = document.querySelector('.main-pelicula');

    let peliculaInCart;

    if(cart){
        peliculaInCart = cart.find(m => m.id == pelicula.id)
        if(peliculaInCart){
            peliculaInCart.index = cart.findIndex(m => m.id == pelicula.id)
        }
    }

    console.log(pelicula)

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
                <div class="details-item"><h3>Reparto:</h3><p id="reparto_text">${pelicula.reparto?.map(r=>r.nombre).join(', ') || ""}</p></div>
                <div class="details-item"><h3>Director:</h3><p id="director_text">${pelicula.director?.nombre || ""}</p></div>
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
                    <button class="btn btn-primary w-100 mt-2" onclick="addToCart('${pelicula.id}', '${pelicula.titulo}')">Agregar al carrito</button>
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

let cartData = JSON.parse(localStorage.getItem("cart"));
let cart = cartData && cartData.length > 0 ? cartData : [];



const cartDropdown = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

function addToCart(movieId, movieTitle) {

    // Busca si la película ya está en el carrito
    const movieInCart = cart.find(movie => movie.id === movieId);

    if (movieInCart) {
        // Incrementa la cantidad si ya existe
        movieInCart.quantity++;
    } else {
        // Añade la película al carrito con cantidad 1
        cart.push({ id: movieId, title: movieTitle, quantity: 1 });
    }
    
    updateCart();
    mostrarPelicula()
}

// Función para actualizar el carrito
function updateCart() {
    cartCount.textContent = cart.reduce((total, movie) => total + movie.quantity, 0); // Suma todas las cantidades
    

    // Limpia el contenido previo del carrito
    cartDropdown.innerHTML = "";

    if (cart.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "dropdown-item text-center text-muted";
        emptyMessage.textContent = "El carrito está vacío";
        cartDropdown.appendChild(emptyMessage);
        localStorage.setItem("cart", JSON.stringify([]))
        return;
    }

    // Añade las películas al carrito
    cart.forEach((movie, index) => {
        const cartItem = document.createElement("li");
        cartItem.className = "dropdown-item d-flex justify-content-between align-items-center";

        cartItem.innerHTML = `
            <span>${movie.title} (x${movie.quantity})</span>
            <div>
                <button class="btn btn-sm btn-secondary me-2" onclick="decreaseQuantity(${index},event)">-</button>
                <button class="btn btn-sm btn-primary me-2" onclick="increaseQuantity(${index},event)">+</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index},event)">X</button>
            </div>
        `;

        cartDropdown.appendChild(cartItem);
    });

    // Añade un botón para finalizar la compra
    const checkoutButton = document.createElement("li");
    checkoutButton.className = "dropdown-item text-center";
    checkoutButton.innerHTML = `<button class="btn btn-success w-100" onclick="finalizePurchase()">Finalizar compra</button>`;
    cartDropdown.appendChild(checkoutButton);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para incrementar la cantidad
function increaseQuantity(index,event) {
    console.log(cart)
    event.stopPropagation(); // Prevent dropdown from closing
    cart[index].quantity++;
    updateCart();
    mostrarPelicula()

}

// Función para disminuir la cantidad
function decreaseQuantity(index,event) {
    event.stopPropagation(); // Prevent dropdown from closing
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        // Si la cantidad llega a 0, elimina el ítem del carrito
        cart.splice(index, 1);
    }

    updateCart();
    mostrarPelicula()

}

// Función para eliminar una película del carrito
function removeFromCart(index,event) {
    event.stopPropagation(); // Prevent dropdown from closing
    cart.splice(index, 1);
    updateCart();
    mostrarPelicula()

}


function finalizePurchase() {
    // Store the cart in localStorage or sessionStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Redirect to the payment page
    const path = window.location.pathname;
    window.location.href = "../html/pago.html";
}

updateCart()