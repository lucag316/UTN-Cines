// URL base para la API de películas populares
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=f59f2a7d0dcf9beeeca9c90394385a92&language=es-ES&page=1";

// Función para hacer una solicitud a la API y obtener las películas
async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error al obtener películas:", error);
    }
}

// Función para mostrar las películas en el HTML
function displayMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; // Limpiar el contenido anterior

    movies.forEach(movie => {
        const movieCard = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top card_img" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.release_date}</p>
                        <button class="btn btn-primary" onclick="editMovie(${movie.id})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteMovie(${movie.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += movieCard;
    });
}

// Funciones placeholder para editar y eliminar películas
function editMovie(movieId) {
    alert(`Editar película con ID: ${movieId}`);
}

function deleteMovie(movieId) {
    alert(`Eliminar película con ID: ${movieId}`);
}

// Obtener las películas al cargar la página
fetchMovies();
