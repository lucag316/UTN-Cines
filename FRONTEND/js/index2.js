
// Contenedor de la grilla de peliculas
let contenedorPeliculas = document.getElementById("contenedor-peliculas");

let barraBusquedaInput = document.getElementById("barra-busqueda-input");
let todasLasPeliculas = []; // almacenamos todas las peliculas aca

// Obtener referencias a los selectores de filtro
let filtroGenero = document.getElementById("filtro-genero");
let filtroClasificacion = document.getElementById("filtro-clasificacion");
let filtroDuracion = document.getElementById("filtro-duracion");

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
                        <p class="mb-0"><span class="duracion-label ${themeClass}">Duración:</span> ${pelicula.duracion} min</p>
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
    let clasificacionSeleccionada = filtroClasificacion.value;  // Obtener el valor del filtro de clasificación
    let duracionSeleccionada = filtroDuracion.value;  // Obtener el valor del filtro de duración
    
    // Filtrar las peliculas según los valores de los filtros
    let peliculasFiltradas = todasLasPeliculas.filter(pelicula => {
        let generoCoincide = generoSeleccionado === "todos" || pelicula.genero.toLowerCase() === generoSeleccionado;
        let clasificacionCoincide = clasificacionSeleccionada === "todos" || pelicula.clasificacion.toLowerCase() === clasificacionSeleccionada;

        return generoCoincide && clasificacionCoincide;

    });

    // Si el tiempo es "todos", no se ordena por tiempo
    if (duracionSeleccionada !== "todos") {
        // Llama a la función de ordenamiento solo si no es "todos"
        ordenarPorDuracion(peliculasFiltradas, duracionSeleccionada);
    }

    // Mostrar las recetas filtradas y ordenadas (si corresponde)
    mostrarPeliculas(peliculasFiltradas);
}

// Función para ordenar las recetas por tiempo
function ordenarPorDuracion(peliculas, duracionSeleccionada) {
    if (duracionSeleccionada === "mayor-tiempo") {
        peliculas.sort((a, b) => b.duracion - a.duracion); // Ordenar de mayor a menor tiempo
    } else if (duracionSeleccionada === "menor-tiempo") {
        peliculas.sort((a, b) => a.duracion - b.duracion); // Ordenar de menor a mayor tiempo
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
filtroClasificacion.addEventListener("change", filtrarPeliculas);
filtroDuracion.addEventListener("change", filtrarPeliculas);

// Agregamos el evento keyup a la barra de búsqueda
barraBusquedaInput.addEventListener("keyup", filtrarPeliculasBusqueda);

// Llamamos a la función init cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", init);











// #################### TEMA DINAMICO #######################

// Obtén referencias a los elementos del DOM
const themeButtons = document.querySelectorAll('[data-bs-theme-value]');
const body = document.body;
const filtros = document.querySelector('.contenedor-filtros');  // Filtros

// Función para cambiar el tema
function changeTheme(theme) {
    body.classList.toggle('dark-mode', theme === 'dark');
    body.classList.toggle('light-mode', theme === 'light');

    if (theme === 'auto') {
        setAutoTheme();
    }

    localStorage.setItem('selectedTheme', theme);
    updateCardTheme();
    updateThemeIcon(theme);
    updateFiltersTheme();  // Actualizamos el tema de los filtros
}

// Detectar cambios en las preferencias del sistema para el modo automático
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('selectedTheme') === 'auto') {
        setAutoTheme();
    }
});

// Función para manejar el modo automático
function setAutoTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.classList.toggle('dark-mode', prefersDarkScheme);
    body.classList.toggle('light-mode', !prefersDarkScheme);
    updateCardTheme();
    updateFiltersTheme();  // Actualizamos el tema de los filtros
}

// Función para actualizar las clases de las tarjetas cuando cambia el tema
function updateCardTheme() {
    const cards = document.querySelectorAll('.card');
    const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    
    cards.forEach(card => {
        card.classList.remove('light-mode', 'dark-mode'); // Elimina clases anteriores
        card.classList.add(themeClass); // Añade la clase correspondiente al nuevo tema

        // Actualizar el color de texto y otros elementos dentro de la tarjeta
        const cardTitle = card.querySelector('.card-title');
        const duracionLabel = card.querySelector('.duracion-label');

        // Asegurarse de que las clases de los elementos también cambien
        if (cardTitle) {
            cardTitle.classList.remove('light-mode', 'dark-mode');
            cardTitle.classList.add(themeClass);
        }

        if (duracionLabel) {
            duracionLabel.classList.remove('light-mode', 'dark-mode');
            duracionLabel.classList.add(themeClass);
        }
    });
}

// Función para actualizar las clases de los filtros cuando cambia el tema
function updateFiltersTheme() {
    const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    
    filtros.classList.remove('light-mode', 'dark-mode');
    filtros.classList.add(themeClass);

    // Cambiar las clases de los elementos dentro de los filtros
    const filterLabels = document.querySelectorAll('.contenedor-filtro-label');
    const filterSelectors = document.querySelectorAll('.selector-filtro');

    filterLabels.forEach(label => {
        label.classList.remove('light-mode', 'dark-mode');
        label.classList.add(themeClass);
    });

    filterSelectors.forEach(selector => {
        selector.classList.remove('light-mode', 'dark-mode');
        selector.classList.add(themeClass);
    });
}

// Función para actualizar el icono activo en el menú
function updateThemeIcon(selectedTheme) {
    themeButtons.forEach(button => {
        const isActive = button.getAttribute('data-bs-theme-value') === selectedTheme;
        button.setAttribute('aria-pressed', isActive);
        const checkIcon = button.querySelector('.check-icon');
        checkIcon.classList.toggle('d-none', !isActive);
    });
}

// Inicialización del tema al cargar la página
function initTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'auto';
    changeTheme(savedTheme);
}

// Agregar eventos a los botones del tema
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        changeTheme(button.getAttribute('data-bs-theme-value'));
    });
});

// Inicializa el tema cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initTheme);



// Inicializar tema al cargar la página
/*
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'auto';
    changeTheme(savedTheme);
});*/
























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