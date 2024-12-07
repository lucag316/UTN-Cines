
// PONERLO EN EL DIV TRAILER <iframe id="iframe_perfil_peli" width="700" height="350" src="https://www.youtube.com/embed/${getTrailerKey(pelicula.trailer)}" frameborder="0" allowfullscreen></iframe>

/*
// Esperamos a que el contenido del DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Recuperamos el tema guardado en localStorage (si no existe, usamos 'auto' por defecto)
    const temaGuardado = localStorage.getItem('temaActual') || 'auto';
    cart = JSON.parse(localStorage.getItem("cart")) !== null && JSON.parse(localStorage.getItem("cart")).length > 0 ? JSON.parse(localStorage.getItem("cart")) : [];


    // Aplicamos el tema guardado usando la función 'changeTheme'
    // Esta función debe estar definida en otro lugar para cambiar el tema de la página
    changeTheme(temaGuardado); 
});
*/
/**
 * Función para mostrar la película seleccionada en la página.
 * Obtiene los detalles de la película desde localStorage y actualiza el contenido de la página.
 */
/*window.mostrarPelicula = function mostrarPelicula () {
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
}*/
// Esperamos a que el contenido del DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Recuperamos el tema guardado en localStorage (si no existe, usamos 'auto' por defecto)
    const temaGuardado = localStorage.getItem('temaActual') || 'auto';
    // Recuperamos el carrito de compras (si no existe, inicializamos un array vacío)
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Aplicamos el tema guardado usando la función 'changeTheme'
    changeTheme(temaGuardado);
    mostrarPelicula();
});

let detallePelicula;

let cart = JSON.parse(localStorage.getItem("cart")) !== null && JSON.parse(localStorage.getItem("cart")).length > 0 ? JSON.parse(localStorage.getItem("cart")) : [];

// Función para mostrar la película seleccionada en la página
async function mostrarPelicula() {
    const urlParams = new URLSearchParams(window.location.search);
    const idPelicula = urlParams.get('id');
    //console.log('ID de la película:', idPelicula); // Verifica el valor aquí.

    if (!idPelicula) {
        console.error("No se proporcionó un ID de película en la URL");
        return;
    }

    // Intentamos obtener la lista de películas desde localStorage
    const todasLasPeliculas = JSON.parse(localStorage.getItem('todasLasPeliculas')) || [];

    let pelicula = todasLasPeliculas.find(p => p.id === idPelicula);

    
    // Si no se encontró la película en localStorage, la buscamos desde el servidor
    if (!pelicula) {
        try {
            pelicula = await getPeliculaPorId(idPelicula);
            detallePelicula = pelicula
        } catch (error) {
            console.error("Error al obtener los detalles de la película:", error);
            return;
        }
    }

    if (!pelicula) {
        console.error("No se encontró la película con el ID proporcionado");
        return;
    }
/*
    let peliculaInCart;

    if(cart){
        peliculaInCart = cart.find(m => m.id == pelicula.id_pelicula)
        if(peliculaInCart){
            peliculaInCart.index = cart.findIndex(m => m.id == pelicula.id_pelicula)
        }
    }*/

    console.log('Película encontrada:', pelicula); // Verifica si la película se encontró correctamente
    mostrarDetallesDePelicula(pelicula);
}

// Función para mostrar los detalles de la película en la página
function mostrarDetallesDePelicula(pelicula) {
    const mainPelicula = document.querySelector('.main-pelicula');
    console.log(pelicula)
    pelicula.director = pelicula.reparto?.find(r=>r.rol=="Director")
    
    // Verificamos si la película ya está en el carrito
    const peliculaInCart = cart.find(m => parseInt(m.id) === pelicula.id_pelicula);
    if(peliculaInCart){
        peliculaInCart.index = cart.findIndex(m => parseInt(m.id) == pelicula.id_pelicula)
    }


    mainPelicula.innerHTML = `
        <div class="container-movie">
            <div class="left-section">
                <img id="img_perfil_peli" class="portada" src="${pelicula.img_url}" alt="portada_img">
                <div class="details">
                    <div class="details-item"><h3>Género:</h3><p id="genero_text">${pelicula.generos.map(g=>g.nombre).join(', ')}</p></div>
                    <div class="details-item"><h3>Duración:</h3><p id="duracion_text">${pelicula.duracion} min</p></div>
                    <div class="details-item"><h3>Reparto:</h3><p id="reparto_text">${pelicula.reparto?.map(r=>r.nombre + " " + r.apellido).join(', ') || ""}</p></div>
                    <div class="details-item"><h3>Director:</h3><p id="director_text">${pelicula.director?.nombre + " " + pelicula.director?.apellido || ""}</p></div>
                    <div class="details-item"><h3>País:</h3><p id="pais_text">${pelicula.pais}</p></div>
                    <div class="details-item"><h3>Clasificación:</h3><p id="clasificacion_text">${pelicula.clasificacion}</p></div>
                    <div class="details-item"><h3>Rating:</h3><p id="rating_text">${pelicula.rating}</p></div>
                    <div class="details-item"><h3>Año:</h3><p id="año_text">${pelicula.anio}</p></div>
                </div>
            </div>
            <div class="right-section">
            <!-- Mostramos el video del trailer de la película en un iframe -->
                <div class="trailer">
                    <iframe id="iframe_perfil_peli" width="700" height="350" src="${pelicula.trailer_url}" frameborder="0" allowfullscreen></iframe>
                </div>
                <h2 id="titulo_text">${pelicula.titulo}</h2>
                <div class="summary">
                    <p id="resumen_text">${pelicula.descripcion}</p>
                </div>
                <div>
                    <!-- Label para el precio -->
                    <div id="precio" class="details-item"><h3>Precio:</h3><p id="precio_text">$${pelicula.precio}</p></div>

                    <!-- Botón para comprar entradas -->
                    ${
                        peliculaInCart ? `
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h4 class="mt-4"> Agregar o eliminar </h4>
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
                            <button class="btn btn-primary w-100 mt-2" onclick="addToCart('${pelicula.id_pelicula}','${pelicula.titulo}','${pelicula.precio}','${pelicula.img_url}')">Agregar al carrito</button>
                        </div>
                    `
                    }

                </div>
            </div>
        </div>
        
    `;
}




// Función para obtener los detalles de la película por ID desde el servidor
async function getPeliculaPorId(id) {
    const response = await fetch(`http://localhost:5000/Pelicula/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener la película");
    }
    return response.json();
}


function getTrailerKey(trailerUrl) {
    const url = new URL(trailerUrl);

    // Si ya está en formato embed, no modificamos nada
    if (url.pathname.includes('embed')) {
        return url.pathname.split('/').pop();
    }

    // Extraemos la clave del parámetro `v` si es una URL normal de YouTube
    if (url.hostname.includes('youtube.com')) {
        return url.searchParams.get('v');
    }

    // Si es un enlace abreviado
    if (url.hostname.includes('youtu.be') || url.hostname.includes('youtube-nocookie.com')) {
        return url.pathname.split('/').pop();
    }
    
    return '';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Función para agregar una película al carrito
function addToCart(id_pelicula,titulo, precio,img_url) {
    const movieInCart = cart.find(movie => parseInt(movie.id) === id_pelicula);

    if (movieInCart) {
        movieInCart.quantity++;
    } else {
        cart.push({ id: id_pelicula, title: titulo,precio: precio, img:img_url, quantity: 1 });
    }

    updateCart();
    mostrarDetallesDePelicula(detallePelicula)
}

// Función para actualizar el carrito en el dropdown
function updateCart() {
    const cartDropdown = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");

    // Actualizamos el número total de películas en el carrito
    cartCount.textContent = cart.reduce((total, movie) => total + movie.quantity, 0);

    cartDropdown.innerHTML = "";

    if (cart.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "dropdown-item text-center text-muted";
        emptyMessage.textContent = "El carrito está vacío";
        cartDropdown.appendChild(emptyMessage);
    } else {
        cart.forEach((movie, index) => {
            const cartItem = document.createElement("li");
            cartItem.className = "dropdown-item d-flex justify-content-between align-items-center";
            cartItem.innerHTML = `
                <span>${movie.title} (x${movie.quantity})</span>
                <div>
                    <button class="btn btn-sm btn-secondary me-2" onclick="decreaseQuantity(${index}, event)">-</button>
                    <button class="btn btn-sm btn-primary me-2" onclick="increaseQuantity(${index}, event)">+</button>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index}, event)">X</button>
                </div>
            `;
            cartDropdown.appendChild(cartItem);
        });

        const checkoutButton = document.createElement("li");
        checkoutButton.className = "dropdown-item text-center";
        checkoutButton.innerHTML = `<button class="btn btn-success w-100" onclick="irACarrito()">Ver resumen</button>`;
        cartDropdown.appendChild(checkoutButton);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para incrementar la cantidad de una película en el carrito
function increaseQuantity(index, event) {
    console.log(index)
    event.stopPropagation();
    cart[index].quantity++;
    updateCart();
    mostrarDetallesDePelicula(detallePelicula)
}

// Función para disminuir la cantidad de una película en el carrito
function decreaseQuantity(index, event) {
    event.stopPropagation();
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
    mostrarDetallesDePelicula(detallePelicula)
}

// Función para eliminar una película del carrito
function removeFromCart(index, event) {
    event.stopPropagation();
    cart.splice(index, 1);
    updateCart();
    mostrarDetallesDePelicula(detallePelicula)
}

const irACarrito = ()=>{
    window.location.href = "./carrito.html";
}

// Función para finalizar la compra
function finalizePurchase() {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "../html/pago.html";
}
// Llamamos a la función updateCart para inicializar el carrito al cargar la página
updateCart();