

let currentPage = 1;
// URL base para la API de películas populares
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=f59f2a7d0dcf9beeeca9c90394385a92&language=es-ES&page=";


// Función para hacer una solicitud a la API y obtener las películas
async function fetchMovies(page = 1) {
    try {
        const response = await fetch(`${API_URL}${page}`);
        const data = await response.json();
        displayMovies(data.results);
        console.log(`Actual page: ${data.page}\nTotal pages:${data.total_pages}`)
        setupPagination(data.page, data.total_pages);
    } catch (error) {
        console.error("Error al obtener películas:", error);
    }
}

// Función para mostrar las películas en el HTML
function displayMovies(movies) {
    const container = document.getElementById('peliculas_container');
    container.innerHTML = ''; // Limpiar el contenido anterior

    movies.forEach(movie => {
        const movieCard = `
            <div class="col-6 col-md-3 mb-4">
                <a href="#" class="text-decoration-none">
                    <div class="card">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                        </div>
                    </div>
                </a>
            </div>
        `;
        container.innerHTML += movieCard;
    });
}

// Función para crear la paginación
function setupPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Limpiar la paginación anterior

    // Botón anterior
    const prevButton = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage === 1 ? 0 : currentPage - 1}">Anterior</a>
        </li>
    `;
    paginationContainer.innerHTML += prevButton;

    const numberButton = `
    <li class="page-item ">
        <a class="page-link" href="#" data-page="${currentPage}">${currentPage}</a>
    </li>
    `;
    paginationContainer.innerHTML += numberButton;


    // // Botón siguiente
    const nextButton = `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">Siguiente</a>
        </li>
    `;
    paginationContainer.innerHTML += nextButton;

    // Añadir manejadores de eventos a los botones
    document.querySelectorAll('.page-link').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute('data-page'));
            if (!isNaN(page)) {
                fetchMovies(page);
            }
        });
    });
}

// Obtener las películas de la primera página al cargar la página
fetchMovies();
