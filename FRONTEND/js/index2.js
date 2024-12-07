
// Obtener el contenedor donde se mostrarán las películas
let contenedorPeliculas = document.getElementById("contenedor-peliculas");

// Obtener la barra de búsqueda y una lista para almacenar todas las películas
let barraBusquedaInput = document.getElementById("barra-busqueda-input");
let todasLasPeliculas = []; // Aquí almacenaremos todas las películas cargadas

// Obtener referencias a los filtros de género, duración, año, rating y país
let filtroGenero = document.getElementById("filtro-genero");
let filtroDuracion = document.getElementById("filtro-duracion");
let filtroAno = document.getElementById("filtro-ano");
let filtroRating = document.getElementById("filtro-rating");
let filtroPais = document.getElementById("filtro-pais");

// Función para mostrar las películas en la grilla de la interfaz
function mostrarPeliculas(peliculas) {

  
    // Crear el HTML para cada tarjeta de película usando los datos proporcionados
    let tarjetas = peliculas.map((pelicula, index) => {
        // Verificar si el tema oscuro está activado
        const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';

        if(pelicula.titulo == "Heavenly Touch") console.log(pelicula)

        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card ${themeClass}" data-index="${index}" data-id="${pelicula.id}">
                    <img src="${pelicula.portada}" class="card-img-top" alt="${pelicula.titulo}">
                    <div class="card-body">
                    <h5 class="card-title ${themeClass}">${pelicula.titulo}</h5>
                    </div>
                    
                    
                    <div class="card-footer text-muted">
                        <p class="mb-0">
                            <span class="duracion-label ${themeClass}">Duración:</span>
                            <span class="duracion-minutos ${themeClass}">${pelicula.duracion} min</span>
                        </p>
                        <p class="mb-0">
                            <span class="duracion-label ${themeClass}">Precio:</span>
                            <span class="duracion-minutos ${themeClass}">$${pelicula.precio}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }).join(''); // Convertir el array de tarjetas en un solo string

    // Insertamos el HTML generado en el contenedor de películas
    contenedorPeliculas.innerHTML = tarjetas;

    // Agregar un evento de clic a cada tarjeta de película
    contenedorPeliculas.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            //guardarPelicula(event, peliculas[card.getAttribute('data-index')]);
            const idPelicula = card.getAttribute('data-id'); // Obtenemos el ID de la película
        if (idPelicula) {
            // Guardar el ID de la película seleccionada en Local Storage
            localStorage.setItem('peliculaSeleccionada', idPelicula);

            // Redirigir a la página del perfil con el ID como parámetro en la URL
            window.location.href = `./html/perfil_peli2.html?id=${idPelicula}`;
        }
        });
    });
}

// Función para guardar la película seleccionada en localStorage y redirigir a la página de detalles
function guardarPelicula(event, pelicula) {
    // Evitar que el evento de clic realice su acción predeterminada
    event.preventDefault();

    // Guardamos la película en localStorage como una cadena JSON
    localStorage.setItem('peliculaSeleccionada', JSON.stringify(pelicula));

    // Guardamos el tema actual en localStorage (puede ser 'auto', 'light' o 'dark')
    const temaActual = localStorage.getItem('selectedTheme') || 'auto';
    localStorage.setItem('temaActual', temaActual);

    // Redirigimos a la página de detalles de la película
    window.location.href = "./html/perfil_peli2.html";  // Cambiar a la URL de la página de película
}

// Función para filtrar las películas basadas en la búsqueda en la barra de búsqueda
function filtrarPeliculasBusqueda() {
    // Obtener el valor de la barra de búsqueda y convertirlo a minúsculas
    let valorBusqueda = barraBusquedaInput.value.toLowerCase();

    // Filtrar las películas que coincidan con el valor de búsqueda en el título
    let peliculasFiltradas = todasLasPeliculas.filter(pelicula => {
        return pelicula.titulo.toLowerCase().includes(valorBusqueda); // Filtrar por el título de la película
    });
    loadPage(1,peliculasFiltradas); // Mostrar las películas filtradas
}

// Función para filtrar las películas según los filtros seleccionados (género, duración, etc.)
function filtrarPeliculas() {
    // Obtener los valores seleccionados de los filtros
    let generoSeleccionado = filtroGenero.value;
    let duracionSeleccionada = filtroDuracion.value;
    let anoSeleccionado = filtroAno.value;
    let ratingSeleccionado = filtroRating.value;
    let paisSeleccionado = filtroPais.value;
    
    // Filtrar las películas de acuerdo a los valores de los filtros
    let peliculasFiltradas = todasLasPeliculas.filter(pelicula => {

        // Filtrar por género
        let generoCoincide = generoSeleccionado === "todos" || 
        (Array.isArray(pelicula.generos) && 
        pelicula.generos.some(genero => genero.nombre.toLowerCase() === generoSeleccionado.toLowerCase()));
        
        //console.log(generoCoincide);  // Verifica el formato de los géneros


        // Filtrar por año: Compara el año de la película con el filtro seleccionado
        let anoCoincide = anoSeleccionado === "todos" || 
                        pelicula.año.toString() === anoSeleccionado ||
                        (anoSeleccionado === "mas-nueva" || anoSeleccionado === "mas-vieja");

        // Filtrar por rating (calificación)
        let ratingCoincide = ratingSeleccionado === "todos" || (ratingSeleccionado === "mayor-rating" && pelicula.rating) || (ratingSeleccionado === "menor-rating" && pelicula.rating);

        console.log(pelicula.pais);
        console.log(paisSeleccionado);
        // Filtrar por país
        let paisCoincide = paisSeleccionado === "todos" || pelicula.pais.toLowerCase() === paisSeleccionado.toLowerCase();

        return generoCoincide  && anoCoincide && ratingCoincide && paisCoincide;  // Solo devolver las películas que coincidan con todos los filtros
    });

    // Si el filtro de duración no es "todos", ordenar las películas por duración
    if (duracionSeleccionada !== "todos") {
        ordenarPorDuracion(peliculasFiltradas, duracionSeleccionada);
    }

    // Ordenar las películas por Año
    ordenarPorAno(peliculasFiltradas, anoSeleccionado);

    // Ordenar las películas por Rating (calificación)
    ordenarPorRating(peliculasFiltradas, ratingSeleccionado);

    // Mostrar las películas que cumplen con los filtros y el orden seleccionado
    loadPage(1,peliculasFiltradas);
}

// Función para ordenar las películas por duración
function ordenarPorDuracion(peliculas, duracionSeleccionada) {
    // Ordenar las películas de acuerdo a la duración seleccionada
    if (duracionSeleccionada === "mayor-duracion") {
        peliculas.sort((a, b) => b.duracion - a.duracion);  // Ordenar de mayor a menor duración
    } else if (duracionSeleccionada === "menor-duracion") {
        peliculas.sort((a, b) => a.duracion - b.duracion);  // Ordenar de menor a mayor duración
    }
}

// Función para ordenar las películas por año
function ordenarPorAno(peliculas, anoSeleccionado) {
    if (anoSeleccionado === "mas-nueva") {
        peliculas.sort((a, b) => b.año - a.año);  // Ordenar de más nueva a más vieja
    } else if (anoSeleccionado === "mas-vieja") {
        peliculas.sort((a, b) => a.año - b.año);  // Ordenar de más vieja a más nueva
    }
}


// Función para ordenar las películas por rating (calificación)
function ordenarPorRating(peliculas, ratingSeleccionado) {
    if (ratingSeleccionado === "mayor-rating") {
        peliculas.sort((a, b) => b.rating - a.rating);  // Ordenar de mayor a menor rating
    } else if (ratingSeleccionado === "menor-rating") {
        peliculas.sort((a, b) => a.rating - b.rating);  // Ordenar de menor a mayor rating
    }
}


// Función inicial para cargar y mostrar las películas desde un archivo JSON
function init() {
    getPeliculas().then(peliculas => {
        console.log(peliculas); // Verifica si las películas se cargan correctamente
        todasLasPeliculas = peliculas;  // Almacenar las películas obtenidas
        loadPage(1,todasLasPeliculas)
        // mostrarPeliculas(todasLasPeliculas); // Llamar a mostrarPeliculas para visualizarlas
    }).catch(error => {
        console.error("Error al cargar las peliculas:", error);  // Mostrar error en caso de que no se carguen correctamente
    });
}

// Agregar eventos de cambio a los filtros para aplicar el filtrado cuando el usuario selecciona una opción
filtroGenero.addEventListener("change", filtrarPeliculas);
filtroDuracion.addEventListener("change", filtrarPeliculas);
filtroAno.addEventListener("change", filtrarPeliculas);
filtroRating.addEventListener('change', filtrarPeliculas);
filtroPais.addEventListener('change', filtrarPeliculas);

// Agregar evento para realizar el filtrado mientras se escribe en la barra de búsqueda
barraBusquedaInput.addEventListener("keyup", filtrarPeliculasBusqueda);

// Llamar a la función init cuando el DOM esté completamente cargado para cargar las películas
document.addEventListener("DOMContentLoaded", init);



// ==== Paginación ====
// Función para crear y mostrar los botones de paginación
function setupPagination(currentPage, totalPages, peliculas) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Limpiar los botones de paginación anteriores

    if (totalPages > 1) {
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(currentPage + 2, totalPages);

        const ulElement = document.createElement('ul');
        ulElement.classList.add('pagination', 'justify-content-center');

        // Botón "Anterior"
        if (currentPage > 1) {
            const prevLi = document.createElement('li');
            prevLi.classList.add('page-item');

            const prevButton = document.createElement('button');
            prevButton.classList.add('page-link');
            prevButton.textContent = 'Anterior';
            prevButton.onclick = () => loadPage(currentPage - 1, peliculas);

            prevLi.appendChild(prevButton);
            ulElement.appendChild(prevLi);
        }

        // Botones de las páginas
        for (let i = startPage; i <= endPage; i++) {
            const pageLi = document.createElement('li');
            pageLi.classList.add('page-item');
            if (i === currentPage) {
                pageLi.classList.add('active');
            }

            const pageButton = document.createElement('button');
            pageButton.classList.add('page-link');
            pageButton.textContent = i;
            pageButton.onclick = () => loadPage(i, peliculas);

            pageLi.appendChild(pageButton);
            ulElement.appendChild(pageLi);
        }

        // Botón "Siguiente"
        if (currentPage < totalPages) {
            const nextLi = document.createElement('li');
            nextLi.classList.add('page-item');

            const nextButton = document.createElement('button');
            nextButton.classList.add('page-link');
            nextButton.textContent = 'Siguiente';
            nextButton.onclick = () => loadPage(currentPage + 1, peliculas);

            nextLi.appendChild(nextButton);
            ulElement.appendChild(nextLi);
        }

        paginationContainer.appendChild(ulElement);
    }
}


// Función para cargar una página específica de películas
function loadPage(pageNumber,peliculas) {
    const moviesPerPage = 10; // Número de películas por página
    const offset = (pageNumber - 1) * moviesPerPage; // Calcular el offset para la consulta

    // Obtener las películas actuales a mostrar
    const currentMovies = peliculas.slice(offset, offset + moviesPerPage);

    console.log(currentMovies)
    // Mostrar las películas de la página seleccionada
    mostrarPeliculas(currentMovies);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(peliculas.length / moviesPerPage);

    // Configurar la paginación
    setupPagination(pageNumber, totalPages,peliculas);
}


////////////////////////////////////////////CARRITO////////////////////////////////////////////////////////////////////


let cartData2 = JSON.parse(localStorage.getItem("cart"));
let cart2 = cartData2 && cartData2.length > 0 ? cartData2 : [];



const cartDropdown2 = document.getElementById("cartItems");
const cartCount2 = document.getElementById("cartCount");

function addToCart(movieId, movieTitle) {

    // Busca si la película ya está en el carrito
    const movieInCart = cart2.find(movie => movie.id === movieId);

    if (movieInCart) {
        // Incrementa la cantidad si ya existe
        movieInCart.quantity++;
    } else {
        // Añade la película al carrito con cantidad 1
        cart2.push({ id: movieId, title: movieTitle, quantity: 1 });
    }
    
    updateCart();

}

// Función para actualizar el carrito
function updateCart() {
    cartCount2.textContent = cart2.reduce((total, movie) => total + movie.quantity, 0); // Suma todas las cantidades
    

    // Limpia el contenido previo del carrito
    cartDropdown2.innerHTML = "";

    if (cart2.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "dropdown-item text-center text-muted";
        emptyMessage.textContent = "El carrito está vacío";
        cartDropdown2.appendChild(emptyMessage);
        localStorage.setItem("cart", JSON.stringify([]))
        return;
    }

    // Añade las películas al carrito
    cart2.forEach((movie, index) => {
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

        cartDropdown2.appendChild(cartItem);
    });

    // Añade un botón para finalizar la compra
    const checkoutButton = document.createElement("li");
    checkoutButton.className = "dropdown-item text-center";
    checkoutButton.innerHTML = `<button class="btn btn-success w-100" onclick="irACarrito()">Ver resumen</button>`;
    cartDropdown2.appendChild(checkoutButton);
    localStorage.setItem("cart", JSON.stringify(cart2));
}

// Función para incrementar la cantidad
function increaseQuantity(index,event) {
    console.log(cart2)
    event.stopPropagation(); // Prevent dropdown from closing
    cart2[index].quantity++;
    updateCart();

}

// Función para disminuir la cantidad
function decreaseQuantity(index,event) {
    event.stopPropagation(); // Prevent dropdown from closing
    if (cart2[index].quantity > 1) {
        cart2[index].quantity--;
    } else {
        // Si la cantidad llega a 0, elimina el ítem del carrito
        cart2.splice(index, 1);
    }

    updateCart();


}

// Función para eliminar una película del carrito
function removeFromCart(index,event) {
    event.stopPropagation(); // Prevent dropdown from closing
    cart2.splice(index, 1);
    updateCart();


}

const irACarrito = ()=>{
    window.location.href = "./html/carrito.html";
}

function finalizePurchase() {
    // Store the cart in localStorage or sessionStorage
    localStorage.setItem("cart", JSON.stringify(cart2));
    // Redirect to the payment page
    const path = window.location.pathname;
    window.location.href = "./html/pago.html";
}

updateCart()
