

let currentPage = 1;
// URL base para la API de películas populares
const API_KEY = "f59f2a7d0dcf9beeeca9c90394385a92";
const BASE_URL ="https://api.themoviedb.org/3";
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=f59f2a7d0dcf9beeeca9c90394385a92&language=es-ES&page=";

const container = document.getElementById('peliculas_container');
const select_genero = document.querySelector("#select_genero");


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

    container.innerHTML = ''; // Limpiar el contenido anterior

    movies.forEach(movie => {
        const movieCard = `
            <div class="col-6 col-md-3 mb-4">
                <a href="../html/perfil_peli.html?id=${movie.id}" class="text-decoration-none">
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

const obtenerGeneros = async()=>{
    const res = await fetch("../datos.json");
    const datos = await res.json();
    console.log(datos)
    return datos
}


// Obtener las películas de la primera página al cargar la página
document.addEventListener("DOMContentLoaded",async (event)=>{
    try {
        fetchMovies();
    } catch (error) {
        console.log("Error al intentar conseguir las peliculas")
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////           PERFIL PELICULAS ///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const apiKey = 'f59f2a7d0dcf9beeeca9c90394385a92';
const language = 'es-ES';

const main_tag = document.getElementById("perfil_peliculas-load")

const img_perfil_peli = document.getElementById("img_perfil_peli");
const iframe_pefil_peli = document.getElementById("iframe_perfil_peli");

const titulo_text_tag = document.getElementById("titulo_text")
const genero_text_tag = document.getElementById("genero_text")
const duracion_text_tag = document.getElementById("duracion_text")
const reparto_text_tag = document.getElementById("reparto_text")
const director_text_tag = document.getElementById("director_text")
const año_text_tag = document.getElementById("año_text")
const resumen_text_tag = document.getElementById("resumen_text")

// Función para obtener detalles de una película
async function getMovieDetails(movieId) {
    // Obtener detalles de la película (duración)
    const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`);
    const details = await detailsResponse.json();

    // Convertir el array de géneros en una lista de nombres
    const genres = details.genres.map(genre => genre.name).join(', ');

    // Obtener el reparto y el director
    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=${language}`);
    const credits = await creditsResponse.json();
    const director = credits.crew.find(member => member.job === 'Director');
    const cast = credits.cast.slice(0, 5).map(actor => actor.name); // Tomar los primeros 5 actores

    // Obtener un video (tráiler)
    const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=${language}`);
    const videos = await videosResponse.json();
    const trailer = videos.results.find(video => video.type === 'Trailer');

    // Mostrar resultados
    console.log("ID:", details.id)
    console.log("Título:", details.title);
    console.log("Duración:", details.runtime, "minutos");
    console.log("Director:", director ? director.name : "No disponible");
    console.log("Reparto:", cast.join(", "));
    console.log("Tráiler:", trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "No disponible");

    
    titulo_text_tag.textContent = details.title;
    genero_text_tag.textContent = genres;
    duracion_text_tag.textContent = details.runtime + " min";
    reparto_text_tag.textContent = cast;
    director_text_tag.textContent = director.name;
    año_text_tag.textContent = details.release_date
    resumen_text_tag.textContent = details.overview

    img_perfil_peli.src = `https://image.tmdb.org/t/p/w500${details.poster_path}`
    iframe_pefil_peli.src = `https://www.youtube.com/embed/${trailer.key}`;
}

// Función para obtener el ID de la película de la URL
function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


document.addEventListener("DOMContentLoaded",(event)=>{
    try {
        const id_peli = getMovieIdFromUrl();

        getMovieDetails(id_peli);
    } catch (error) {
        console.log("Error al intentar conseguir la pelicula")
    }
}) 










