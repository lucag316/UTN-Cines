
// Contenedor de la grilla de peliculas
let contenedorPeliculas = document.getElementById("contenedor-peliculas");

let barraBusquedaInput = document.getElementById("barra-busqueda-input");
let todasLasPeliculas = []; // almacenamos todas las peliculas aca

// Obtener referencias a los selectores de filtro
let filtroGenero = document.getElementById("filtro-genero");
let filtroDuracion = document.getElementById("filtro-duracion");
let filtroAno = document.getElementById("filtro-ano");
let filtroRating = document.getElementById("filtro-rating");
let filtroPais = document.getElementById("filtro-pais");

// Función para mostrar las peliculas en la grilla
function mostrarPeliculas(peliculas) {
    let tarjetas = peliculas.map((pelicula, index) => {
        const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';

        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card ${themeClass}" data-index="${index}">
                    <img src="${pelicula.portada}" class="card-img-top" alt="${pelicula.titulo}">
                    <div class="card-body">
                        <h5 class="card-title ${themeClass}">${pelicula.titulo}</h5>
                    </div>
                    <div class="card-footer text-muted">
                        <p class="mb-0">
                            <span class="duracion-label ${themeClass}">Duración:</span>
                            <span class="duracion-minutos ${themeClass}">${pelicula.duracion} min</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    contenedorPeliculas.innerHTML = tarjetas;

    // Agregar el evento a cada tarjeta
    contenedorPeliculas.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            guardarPelicula(event, peliculas[card.getAttribute('data-index')]);
        });
    });
}

// Función para guardar la pelicula en localStorage y redirigir a la página de la pelicula
function guardarPelicula(event, pelicula) {
    // Evitar que el enlace predeterminado se ejecute
    event.preventDefault();

    // Guardamos la pelicula como una cadena JSON en localStorage
    localStorage.setItem('peliculaSeleccionada', JSON.stringify(pelicula));

    // Guardar el tema actual
    const temaActual = localStorage.getItem('selectedTheme') || 'auto';
    localStorage.setItem('temaActual', temaActual);

    // Redirigimos a la página de la pelicula
    window.location.href = "./html/perfil_peli2.html";  // Cambia a la URL de la página de pelicula
}

// Función para filtrar peliculas según la búsqueda
function filtrarPeliculasBusqueda() {
    let valorBusqueda = barraBusquedaInput.value.toLowerCase(); // Obtenemos el valor de búsqueda y lo pasamos a minúsculas

    let peliculasFiltradas = todasLasPeliculas.filter(pelicula => {
        return pelicula.titulo.toLowerCase().includes(valorBusqueda); // Filtramos por el título de la pelicula
    });
    mostrarPeliculas(peliculasFiltradas); // Mostramos las peliculas filtradas
}

// Función para filtrar peliculas según los filtros seleccionados
function filtrarPeliculas() {
    let generoSeleccionado = filtroGenero.value;  // Obtener el valor del filtro de género
    let duracionSeleccionada = filtroDuracion.value;  // Obtener el valor del filtro de duración
    let anoSeleccionado = filtroAno.value;  // Obtener el valor del filtro de año
    let ratingSeleccionado = filtroRating.value; // Obtener el valor del filtro de rating
    let paisSeleccionado = filtroPais.value; // Obtener el valor del filtro de país
    
    // Filtrar las peliculas según los valores de los filtros
    let peliculasFiltradas = todasLasPeliculas.filter(pelicula => {
        // Filtrar por género: si el género seleccionado es 'todos', no filtrar por género
        let generoCoincide = generoSeleccionado === "todos" || pelicula.generos.some(genero => genero.toLowerCase() === generoSeleccionado.toLowerCase());

        let anoCoincide = anoSeleccionado === "todos" || 
                        pelicula.año.toString() === anoSeleccionado ||
                        (anoSeleccionado === "mas-nueva" || anoSeleccionado === "mas-vieja");

        // Filtrar por rating
        let ratingCoincide = ratingSeleccionado === "todos" || (ratingSeleccionado === "mayor-rating" && pelicula.rating) || (ratingSeleccionado === "menor-rating" && pelicula.rating);

        // Filtrar por país
        let paisCoincide = paisSeleccionado === "todos" || pelicula.pais.toLowerCase() === paisSeleccionado.toLowerCase();
        //console.log('Pais seleccionado:', paisSeleccionado, 'Pais de la pelicula:', pelicula.pais); // Verifica ambos valores
        return generoCoincide  && anoCoincide && ratingCoincide && paisCoincide;

    });

    // Si el tiempo es "todos", no se ordena por tiempo
    if (duracionSeleccionada !== "todos") {
        // Llama a la función de ordenamiento solo si no es "todos"
        ordenarPorDuracion(peliculasFiltradas, duracionSeleccionada);
    }

    // Ordenar las películas por Año
    ordenarPorAno(peliculasFiltradas, anoSeleccionado);

    // Ordenar las películas por Rating
    ordenarPorRating(peliculasFiltradas, ratingSeleccionado);

    // Mostrar las recetas filtradas y ordenadas (si corresponde)
    mostrarPeliculas(peliculasFiltradas);
}

// Función para ordenar las recetas por tiempo
function ordenarPorDuracion(peliculas, duracionSeleccionada) {
    if (duracionSeleccionada === "mayor-duracion") {
        peliculas.sort((a, b) => b.duracion - a.duracion); // Ordenar de mayor a menor duración
    } else if (duracionSeleccionada === "menor-duracion") {
        peliculas.sort((a, b) => a.duracion - b.duracion); // Ordenar de menor a mayor duración
    }
}

// Función para ordenar por Año (según la opción seleccionada)
function ordenarPorAno(peliculas, anoSeleccionado) {
    if (anoSeleccionado === "mas-nueva") {
        peliculas.sort((a, b) => b.año - a.año);  // Ordenar de más nueva a más vieja
    } else if (anoSeleccionado === "mas-vieja") {
        peliculas.sort((a, b) => a.año - b.año);  // Ordenar de más vieja a más nueva
    }
}

// Función para ordenar las películas por Rating
function ordenarPorRating(peliculas, ratingSeleccionado) {
    if (ratingSeleccionado === "mayor-rating") {
        peliculas.sort((a, b) => b.rating - a.rating); // Ordenar de mayor a menor rating
    } else if (ratingSeleccionado === "menor-rating") {
        peliculas.sort((a, b) => a.rating - b.rating); // Ordenar de menor a mayor rating
    }
}


// Función inicial para cargar y mostrar las recetas desde un archivo JSON
function init() {
    getPeliculas().then(peliculas => {
        console.log(peliculas); // Verifica si las películas se cargan correctamente
        todasLasPeliculas = peliculas; // Aquí almacenas las recetas que has obtenido
        mostrarPeliculas(todasLasPeliculas); // Llamas a mostrarRecetas para visualizar las recetas
    }).catch(error => {
        console.error("Error al cargar las peliculas:", error);
    });
}

// Agregar eventos de cambio a cada filtro
filtroGenero.addEventListener("change", filtrarPeliculas);
filtroDuracion.addEventListener("change", filtrarPeliculas);
filtroAno.addEventListener("change", filtrarPeliculas);
filtroRating.addEventListener('change', filtrarPeliculas);
filtroPais.addEventListener('change', filtrarPeliculas);

// Agregamos el evento keyup a la barra de búsqueda
barraBusquedaInput.addEventListener("keyup", filtrarPeliculasBusqueda);

// Llamamos a la función init cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", init);




// ==== Paginación ====

// Función para crear la paginación
function setupPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const prevButton = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage === 1 ? 0 : currentPage - 1}">Anterior</a>
        </li>
    `;
    paginationContainer.innerHTML += prevButton;

    const numberButton = `
        <li class="page-item">
            <a class="page-link" href="#" data-page="${currentPage}">${currentPage}</a>
        </li>
    `;
    paginationContainer.innerHTML += numberButton;

    const nextButton = `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Siguiente</a>
        </li>
    `;
    paginationContainer.innerHTML += nextButton;

    paginationContainer.querySelectorAll('.page-link').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute('data-page'));
            if (!isNaN(page)) {
                fetchMovies(page);
            }
        });
    });
}