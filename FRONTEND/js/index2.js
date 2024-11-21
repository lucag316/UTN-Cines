
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
    // Inicializo una variable para almacenar el HTML de las tarjetas
    let tarjetas = "";

    // Itero sobre cada pelicula en el array de peliculas
    peliculas.forEach(pelicula => {
        // Para cada pelicula, generamos una tarjeta HTML
        tarjetas += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card">
                    <img src="${pelicula.portada}" class="card-img-top" alt="${pelicula.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.titulo}</h5>
                    </div>
                    <div class="card-footer text-muted">
                        <p class="mb-0"><span class="duracion-label">Duracion:</span> ${pelicula.duracion} min</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Insertamos las tarjetas generadas en el contenedor de peliculas en el HTML
    contenedorPeliculas.innerHTML = tarjetas;

    // Agregar el evento a cada tarjeta
    const cards = contenedorPeliculas.getElementsByClassName('card');
    Array.from(cards).forEach((card, index) => {
        card.addEventListener('click', (event) => {
            guardarPelicula(event, peliculas[index]);
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
    window.location.href = "../html/perfil_peli2.html";  // Cambia a la URL de la página de pelicula
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
    let generoSeleccionado = filtroGenero.value;
    let clasificacionSeleccionada = filtroClasificacion.value;
    let duracionSeleccionada = filtroDuracion.value;
    
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
