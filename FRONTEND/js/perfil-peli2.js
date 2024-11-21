 /**
 * Función para mostrar la pelicula seleccionada en la página.
 * Obtiene la pelicula desde localStorage y actualiza el contenido del HTML.
 */
function mostrarPelicula () {
    // Obtener la pelicula guardada en localStorage
    const peliculaJSON = localStorage.getItem('peliculaSeleccionada');

    // Si no hay pelicula seleccionada, mostramos un mensaje de error y retornamos
    if (!peliculaJSON) {
        console.error("No se encontró la pelicula seleccionada");
        return; // Salimos de la función si no hay pelicula
    }

    // Convertimos la cadena JSON de vuelta a un objeto de pelicula
    const pelicula = JSON.parse(peliculaJSON);
    console.log(pelicula); 
    // Obtener el contenedor del encabezado y del main donde se mostrará la pelicula
    const mainPelicula = document.querySelector('.main-pelicula');

    
    // Actualizar el contenido del main
    mainPelicula.innerHTML = `
    <div class="container-movie">
            <!-- Contenedor de la portada y sus detalles (lado izquierdo)-->
            <div class="left-section">
                <img id="img_perfil_peli" class="portada" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="portada_img">
                
                <div class="details">
                    <div class="details-item">
                        <h3>Género:</h3><p id="genero_text">${pelicula.genero}</p>
                    </div>
                    <div class="details-item">
                        <h3>Duración:</h3><p id="duracion_text">${pelicula.duracion} min</p>
                    </div>
                    <div class="details-item">
                        <h3>Reparto:</h3><p id="reparto_text">${pelicula.reparto.join(', ')}</p>
                    </div>
                    <div class="details-item">
                        <h3>Director:</h3><p id="director_text">${pelicula.director}</p>
                    </div>
                    <div class="details-item">
                        <h3>Año:</h3><p id="año_text">${pelicula.año}</p>
                    </div>
                </div>
            </div>

            <!-- Contenedor del trailer, título y resumen (lado derecho)-->
            <div class="right-section">
                <div class="trailer">
                    <iframe id="iframe_perfil_peli" width="700" height="350" src="https://www.youtube.com/embed/${pelicula.trailer_key}" frameborder="0" allowfullscreen></iframe>
                </div>

                <h2 id="titulo_text">${pelicula.titulo}</h2>

                <div class="summary">
                    <p id="resumen_text">${pelicula.resumen}</p>
                </div>

                <!-- Botón de comprar -->
                <div class="container-buy-button">
                    <button class="btn-buy" onclick="irACompraEntradas()">Comprar</button>
                </div>
            </div>
        </div>
    `;

    
}

// Llama a la función mostrarReceta cuando la página se cargue
document.addEventListener("DOMContentLoaded", mostrarPelicula);
