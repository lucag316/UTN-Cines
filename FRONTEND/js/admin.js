
const API_BASE_URL = "http://localhost:5000"; // Cambia esto a la URL base de tu API

let movies = [];

// Función para obtener las películas junto con sus géneros
async function fetchMovies() {
    try {
        console.log("hola")
        movies = await getPeliculas()
        console.log("hola")
        displayMovies(movies);
    } catch (error) {
        console.error("Error al obtener las películas:", error);
    }
}

async function getPeliculas() {
    if (movies.length === 0){
        const res = await fetch("http://localhost:5000/AllPelis");
        const resJson = await res.json();
        return resJson;
    }
    
}

// Función para mostrar las películas en la tabla
function displayMovies(movies) {
    const tableBody = document.getElementById('movies-table-body');
    tableBody.innerHTML = ''; // Limpiar el contenido anterior

    movies.forEach(movie => {
        console.log(movie)
        const genres = movie.generos.map(genero => genero.nombre).join(", "); // Lista de géneros
        const row = `
            <tr>
                <td>${movie.id}</td>
                <td>${movie.titulo}</td>
                <td>${genres || 'N/A'}</td>
                <td>${movie.eliminado || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editMovie(${movie.id})">Actualizar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMovie(${movie.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Función para listar promociones (placeholder)
function listPromotions() {
    alert("Funcionalidad para listar promociones aún no implementada.");
}

let arrGeneros = [];
let selectedGeneros = []; // Array para almacenar los géneros seleccionados

let arrReparto = [];
let selectedReparto = [];// Array para almacenar el reparto seleccionado

// Función para mostrar el pop-up para crear una película
function showCreateMovieForm() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
        <div class="modal fade" id="createMovieModal" tabindex="-1" aria-labelledby="createMovieModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createMovieModalLabel">Crear Nueva Película</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="createMovieForm">
                            <div class="mb-3">
                                <label for="titulo" class="form-label">Título</label>
                                <input type="text" class="form-control" id="titulo" name="titulo" required>
                            </div>
                            <div class="mb-3">
                                <label for="duracion" class="form-label">Duración (minutos)</label>
                                <input type="number" class="form-control" id="duracion" name="duracion" required>
                            </div>
                            <div class="mb-3">
                                <label for="clasificacion" class="form-label">Clasificación</label>
                                <input type="text" class="form-control" id="clasificacion" name="clasificacion">
                            </div>
                            <div class="mb-3">
                                <label for="descripcion" class="form-label">Descripción</label>
                                <textarea class="form-control" id="descripcion" name="descripcion"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="anio" class="form-label">Año</label>
                                <input type="number" class="form-control" id="anio" name="anio" required>
                            </div>
                            <div class="mb-3">
                                <label for="pais" class="form-label">País</label>
                                <input type="text" class="form-control" id="pais" name="pais">
                            </div>
                            <div class="mb-3">
                                <label for="img_url" class="form-label">URL de Imagen</label>
                                <input type="url" class="form-control" id="img_url" name="img_url">
                            </div>
                            <div class="mb-3">
                                <label for="trailer_url" class="form-label">URL del Trailer</label>
                                <input type="url" class="form-control" id="trailer_url" name="trailer_url">
                            </div>
                            <div class="mb-3">
                                <label for="rating" class="form-label">Rating</label>
                                <input type="number" class="form-control" id="rating" name="rating" step="0.1">
                            </div>
                            <div class="mb-3">
                                <label for="precio" class="form-label">Precio</label>
                                <input type="number" class="form-control" id="precio" name="precio" required>
                            </div>
                            <div class="mb-3">
                                <label for="generos" class="form-label">Géneros</label>
                                <select class="form-control" id="generos" name="generos" multiple required>
                                    <!-- Opciones dinámicas -->
                                </select>
                                <button onclick="addGenero(event)">Agregar</button>
                                <ul class="list-group mt-2" id="selectedGenerosList"></ul>

                            </div>
                            <div class="mb-3">
                                <label for="reparto" class="form-label">Reparto</label>
                                <select id="repartoContainer"></select>
                        
                                <button onclick="addReparto(event)">Agregar</button>
                                <ul class="list-group mt-2" id="selectedRepartoList"></ul>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="submitCreateMovie()">Crear</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);
    populateGeneros(); // Cargar los géneros en el formulario
    populateReparto()
    const createMovieModal = new bootstrap.Modal(document.getElementById('createMovieModal'));
    createMovieModal.show();
}

// Función para agregar un miembro del reparto al formulario
function addReparto() {
    const repartoContainer = document.getElementById('repartoContainer');
    const repartoItem = document.createElement('div');
    repartoItem.className = 'mb-3 reparto-item';
    repartoItem.innerHTML = `
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="Nombre" name="reparto_nombre[]" required>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Apellido" name="reparto_apellido[]" required>
            </div>
            <div class="col">
                <select class="form-control" name="reparto_rol[]" required>
                    <option value="Actor">Actor</option>
                    <option value="Actriz">Actriz</option>
                    <option value="Director">Director</option>
                </select>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Personaje" name="reparto_personaje[]">
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-danger" onclick="removeReparto(this)">Eliminar</button>
            </div>
        </div>
    `;
    repartoContainer.appendChild(repartoItem);
}

// Función para cargar los géneros dinámicamente
async function populateGeneros() {
    const select = document.getElementById('generos');
    try {
        if(arrGeneros.length === 0){
            const response = await fetch(`http://localhost:5000/AllGeneros`);
            arrGeneros = await response.json();
        }
        arrGeneros.forEach(genero => {
            const option = document.createElement('option');
            option.value = genero.id_genero;
            option.textContent = genero.nombre;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar géneros:", error);
    }
}
// Función para agregar un género al array
function addGenero(e) {
    e.preventDefault()
    const select = document.getElementById('generos');
    const selectedOption = select.options[select.selectedIndex];
    console.log(selectedOption)
    const generoId = selectedOption.value;
    const generoNombre = selectedOption.textContent;

    // Verificar si el género ya está en el array
    if (selectedGeneros.some(g => g.id === generoId)) {
        alert("Este género ya ha sido seleccionado.");
        return;
    }

    // Agregar género al array
    selectedGeneros.push({ id: generoId, nombre: generoNombre });

    // Actualizar la lista visual
    updateSelectedGenerosList();
}

// Función para actualizar la lista visual de géneros seleccionados
function updateSelectedGenerosList() {
    const list = document.getElementById('selectedGenerosList');
    list.innerHTML = ''; // Limpiar la lista

    selectedGeneros.forEach((genero, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.textContent = genero.nombre;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeGenero(index);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}

// Función para eliminar un género del array
function removeGenero(index) {
    selectedGeneros.splice(index, 1);
    updateSelectedGenerosList();
}



// Función para cargar los géneros dinámicamente
async function populateReparto() {
    const select = document.getElementById('repartoContainer');
    try {
        if(arrReparto.length === 0){
            const response = await fetch(`http://localhost:5000/AllReparto`);
            arrReparto = await response.json();
        }
        arrReparto.forEach(reparto => {
            const option = document.createElement('option');
            option.value = reparto.id_persona;
            option.textContent = reparto.nombre_completo + "," + reparto.rol;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar géneros:", error);
    }
}
// Función para agregar una persona al reparto con un rol
function addReparto(e) {
    e.preventDefault()
    const select = document.getElementById('repartoContainer');
    const selectedOption = select.options[select.selectedIndex];
    console.log(selectedOption)
    const repartoId = selectedOption.value;
    const repartoNombre = selectedOption.textContent.split(",")[0];
    const repartoRol = selectedOption.textContent.split(",")[1];

    // Verificar si el género ya está en el array
    if (selectedReparto.some(r => r.id === repartoId)) {
        alert("Este género ya ha sido seleccionado.");
        return;
    }

    // Agregar género al array
    selectedReparto.push({ id: repartoId, nombre: repartoNombre, rol: repartoRol });

    // Actualizar la lista visual
    updateSelectedRepartoList();
}

// Función para actualizar la lista visual del reparto seleccionado
function updateSelectedRepartoList() {
    const list2 = document.getElementById('selectedRepartoList');
    list2.innerHTML = ''; // Limpiar la lista

    selectedReparto.forEach((reparto, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.textContent = `${reparto.nombre} (${reparto.rol})`;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeReparto(index);
        listItem.appendChild(deleteButton);
        list2.appendChild(listItem);
    });
}

// Función para eliminar una persona del reparto
function removeReparto(index) {
    selectedReparto.splice(index, 1);
    updateSelectedRepartoList();
}



// Función para enviar los datos del formulario
async function submitCreateMovie() {
    const form = document.getElementById('createMovieForm');
    const formData = new FormData(form);

    // Recolectar géneros y otros datos del formulario
    const movieData = Object.fromEntries(formData.entries());
    movieData.generos = selectedGeneros; // Agregar el array de géneros seleccionados
    movieData.reparto = selectedReparto;
    console.log(movieData)


    try {
        const response = await fetch(`${API_BASE_URL}/peliculas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });

        if (response.ok) {
            alert("Película creada exitosamente.");
            form.reset();
            document.getElementById('createMovieModal').remove();
            fetchMovies(); // Actualizar la lista de películas
        } else {
            alert("Error al crear la película.");
        }
    } catch (error) {
        console.error("Error al crear la película:", error);
        alert("Ocurrió un error inesperado.");
    }
}

// Asignar el evento al botón de crear película
document.getElementById('createMovieButton').addEventListener('click', showCreateMovieForm);



// Función para crear una promoción (placeholder)
async function createPromotion() {
    alert("Funcionalidad para crear una promoción aún no implementada.");
}

// Funciones placeholder para editar y eliminar películas
function editMovie(movieId) {
    alert(`Editar película con ID: ${movieId}`);
}

async function deleteMovie(movieId) {
    if (confirm("¿Estás seguro de que deseas eliminar esta película?")) {
        try {
            console.log(movieId)
            const response = await fetch(`${API_BASE_URL}/pelicula/${movieId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Película eliminada exitosamente.");
                fetchMovies(); // Actualizar la lista
            } else {
                alert("Error al eliminar la película.");
            }
        } catch (error) {
            console.error("Error al eliminar la película:", error);
        }
    }
}

// Obtener las películas al cargar la página
fetchMovies();

// Eventos para los botones
document.getElementById('listMoviesButton').addEventListener('click', fetchMovies);
document.getElementById('listPromotionsButton').addEventListener('click', listPromotions);
document.getElementById('createMovieButton').addEventListener('click', showCreateMovieForm);
document.getElementById('createPromotionButton').addEventListener('click', createPromotion);
document.getElementById('addGeneroButton').addEventListener('click', addGenero);
