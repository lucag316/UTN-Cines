
const API_BASE_URL = "http://localhost:5000"; // Cambia esto a la URL base de tu API
const columna_btn = document.getElementById('columna_btns');
let createMovieModal;
let movies = [];

// Función para obtener las películas junto con sus géneros
async function fetchMovies() {
    try {
        movies = await getPeliculas()
        displayMovies(movies);
    } catch (error) {
        console.error("Error al obtener las películas:", error);
    }
}

async function getPeliculas() {
    if (movies.length === 0){
        const res = await fetch(`${API_BASE_URL}/AllPelis/admin`);
        const resJson = await res.json();
        return resJson;
    }
    return movies
}

// Función para mostrar las películas en la tabla
function displayMovies(movies) {
    const tableBody = document.getElementById('movies-table-body');
    tableBody.innerHTML = ''; // Limpiar el contenido anterior

    console.log(movies)
    movies.forEach(movie => {

        const genres = movie.generos.map(genero => genero.nombre).join(", "); // Lista de géneros
        const row = `
            <tr>
                <td>${movie.id}</td>
                <td>${movie.titulo}</td>
                <td>${genres || 'N/A'}</td>
                <td>${movie.eliminado ? "True" : "False"}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editMovie(${movie.id})">Actualizar</button>
                    ${
                        movie.eliminado ? `
                         <button class="btn btn-primary btn-sm" onclick="reviveMovie(${movie.id})">Revivir</button>
                        `
                        :
                        `
                        <button class="btn btn-danger btn-sm" onclick="deleteMovie(${movie.id})">Eliminar</button>
                        `
                    }
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
                            <!-- Campo oculto para el ID de la película -->
                            <input type="hidden" id="id_pelicula" name="id_pelicula" />

                            <div class="mb-3">
                                <label for="titulo" class="form-label">Título</label>
                                <input type="text" class="form-control" id="titulo" name="titulo" required>
                            </div>
                            <div class="mb-3">
                                <label for="duracion" class="form-label">Duración (minutos)</label>
                                <input type="number" class="form-control" id="duracion" name="duracion" required>
                            </div>
                            <div class="mb-3">
                                <label for="clasificacion" class="form-label">Clasificación(Ej:G, PG, PG-13, R y NC-17)</label>
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
                                <label for="img_url" class="form-label">URL de Imagen (sino pones una URL, hay una por default)</label>
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
    document.getElementById('createMovieModalLabel').textContent = 'Crear Película';

    // Prellena los campos del formulario
    document.getElementById('titulo').value = '';
    document.getElementById('duracion').value = '';
    document.getElementById('clasificacion').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('pais').value = '';
    document.getElementById('img_url').value = '';
    document.getElementById('trailer_url').value = '';
    document.getElementById('rating').value =  '';
    document.getElementById('precio').value = '';

    const generosList = document.getElementById('selectedGenerosList');
    generosList.innerHTML = ""

    const repartoList = document.getElementById('selectedRepartoList');
    repartoList.innerHTML = ""

    populateGeneros(); // Cargar los géneros en el formulario
    populateReparto()
    createMovieModal = new bootstrap.Modal(document.getElementById('createMovieModal'));
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
            const response = await fetch(`${API_BASE_URL}/AllGeneros`);
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
    const generoId = selectedOption.value;
    const generoNombre = selectedOption.textContent;

    // Verificar si el género ya está en el array
    if (selectedGeneros.some(g => g.id === generoId) || selectedGeneros.some(g => g.nombre === generoNombre)) {
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
            const response = await fetch(`${API_BASE_URL}/AllReparto`);
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
    const repartoId = selectedOption.value;
    const repartoNombre = selectedOption.textContent.split(",")[0];
    const repartoRol = selectedOption.textContent.split(",")[1];

    // Verificar si el género ya está en el array
    if (selectedReparto.some(r => r.id === repartoId) || selectedReparto.some(r => r.nombre_completo === selectedOption.textContent.split(",")[0]) ) {
        alert("Este reparto ya ha sido seleccionado.");
        return;
    }

    // Agregar género al array
    selectedReparto.push({ id: repartoId, nombre: repartoNombre, rol: repartoRol, nombre_completo: selectedOption.textContent.split(",")[0] });

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
        listItem.textContent = `${reparto.nombre_completo} (${reparto.rol})`;
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


    try {
        const response = await fetch(`${API_BASE_URL}/pelicula`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });

        if (response.ok) {
            alert("Película creada exitosamente.");
            createMovieModal.dispose();
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
async function editMovie(id) {
    try {
        console.log("hoola")

        // Obtén los datos de la película por ID
        const response = await fetch(`${API_BASE_URL}/pelicula/${id}`);
        const movie = await response.json();
        // Abre el formulario
        showCreateMovieForm();

        const generosList = document.getElementById('selectedGenerosList');
        generosList.innerHTML = ""
    
        const repartoList = document.getElementById('selectedRepartoList');
        repartoList.innerHTML = ""

        selectedGeneros = []
        selectedReparto = []

        console.log("hoola")
        console.log(movie)

        // Cambia el título del modal
        document.getElementById('createMovieModalLabel').textContent = 'Editar Película';

        // Prellena los campos del formulario
        document.getElementById('id_pelicula').value = movie.id_pelicula; // Establece el ID
        document.getElementById('titulo').value = movie.titulo || '';
        document.getElementById('duracion').value = movie.duracion || '';
        document.getElementById('clasificacion').value = movie.clasificacion || '';
        document.getElementById('descripcion').value = movie.descripcion || '';
        document.getElementById('anio').value = movie.anio || '';
        document.getElementById('pais').value = movie.pais || '';
        document.getElementById('img_url').value = movie.img_url || '';
        document.getElementById('trailer_url').value = movie.trailer || '';
        document.getElementById('rating').value = movie.rating || '';
        document.getElementById('precio').value = movie.precio || '';

        movie.generos.forEach((g)=>{
            selectedGeneros.push({ id: g.id_genero, nombre: g.nombre })
        })
        updateSelectedGenerosList()

        movie.reparto.forEach((r)=>{
            selectedReparto.push({ id: r.id_persona, nombre: r.nombre, rol: r.rol,nombre_completo:r.nombre+" "+r.apellido })
        })
        updateSelectedRepartoList()

        // Cambia la función del botón "Crear" por una de actualización
        const submitButton = document.querySelector('.modal-footer .btn-primary');
        submitButton.textContent = 'Actualizar';
        submitButton.onclick = () => submitEditMovie(id);

    } catch (error) {
        console.error('Error al cargar los datos de la película:', error);
    }
}

async function submitEditMovie(id) {
    try {

        const form = document.getElementById('createMovieForm');
        const formData = new FormData(form);
        // Convierte el formulario a JSON
        const updatedMovie = Object.fromEntries(formData);
        updatedMovie.generos = selectedGeneros
        updatedMovie.reparto = selectedReparto

        // Envía la solicitud al backend
        const response = await fetch(`${API_BASE_URL}/pelicula/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la película');
        }

        // Cierra el modal y actualiza la lista de películas
        const modal = bootstrap.Modal.getInstance(document.getElementById('createMovieModal'));
        modal.hide();
        //loadMovies(); // Función que actualiza la lista de películas

    } catch (error) {
        console.error('Error al actualizar la película:', error);
    }
}


async function deleteMovie(movieId) {
    if (confirm("¿Estás seguro de que deseas eliminar esta película?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/pelicula/${movieId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Película eliminada exitosamente.");
                movies = []
                fetchMovies(); // Actualizar la lista
            } else {
                alert("Error al eliminar la película.");
            }
        } catch (error) {
            console.error("Error al eliminar la película:", error);
        }
    }
}

async function reviveMovie(movieId) {
    if (confirm("¿Estás seguro de que deseas revivir esta película?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/pelicula/revive/${movieId}`, {
                method: "PUT"
            });
            if (response.ok) {
                alert("Película actualizada exitosamente.");
                movies = []
                fetchMovies(); // Actualizar la lista
            } else {
                alert("Error al actualizar la película.");
            }
        } catch (error) {
            console.error("Error al actualizar la película:", error);
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


