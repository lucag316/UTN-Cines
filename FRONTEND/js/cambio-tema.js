// #################### TEMA DINAMICO #######################

// Obtén referencias a los elementos del DOM
const themeButtons = document.querySelectorAll('[data-bs-theme-value]');
const body = document.body;
const filtros = document.querySelector('.contenedor-filtros');  // Filtros
// FIJARME SI ACA VA LA BARRA DE BUSQUEDA TAMBIEN

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
    updateSearchBarTheme();  // Actualizamos el tema de la barra de búsqueda
    updateMovieProfileTheme(); // Actualizamos el tema en el perfil de la película
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
    updateSearchBarTheme();  // Actualizamos el tema de la barra de búsqueda
    updateMovieProfileTheme(); // Actualizamos el tema en el perfil de la película
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

// Función para actualizar las clases de la barra de búsqueda cuando cambia el tema
function updateSearchBarTheme() {
    const themeClass = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    
    // Obtenemos la barra de búsqueda
    const barraBusqueda = document.getElementById('barra-busqueda');
    barraBusqueda.classList.remove('light-mode', 'dark-mode');
    barraBusqueda.classList.add(themeClass);

    // Obtenemos el icono de la lupa y cambiamos su clase según el tema
    const iconContainer = barraBusqueda.querySelector('.icon-container');
    const inputSearch = barraBusqueda.querySelector('input');
    
    // Cambiamos las clases de los elementos dentro de la barra de búsqueda
    iconContainer.classList.remove('light-mode', 'dark-mode');
    iconContainer.classList.add(themeClass);
    
    inputSearch.classList.remove('light-mode', 'dark-mode');
    inputSearch.classList.add(themeClass);
}

function updateMovieProfileTheme() {
    const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';

    // Cambiar el fondo de la página, incluyendo body y html según el tema
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(themeClass);

    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(themeClass);

    // Cambiar fondo del contenedor de la película
    const movieContainer = document.querySelector('.container-movie');
    if (movieContainer) {
        movieContainer.classList.remove('light-mode', 'dark-mode');
        movieContainer.classList.add(themeClass);
    }

    // Cambiar colores de texto según el tema
    const titleText = document.querySelector('#titulo_text');
    const summaryText = document.querySelector('#resumen_text');

    if (titleText) {
        titleText.classList.remove('light-mode', 'dark-mode');
        titleText.classList.add(themeClass);
    }

    if (summaryText) {
        summaryText.classList.remove('light-mode', 'dark-mode');
        summaryText.classList.add(themeClass);
    }

    // Para otros elementos del perfil de la película
    const detailsItems = document.querySelectorAll('.details-item');
    detailsItems.forEach(item => {
        item.classList.remove('light-mode', 'dark-mode');
        item.classList.add(themeClass);
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
    mostrarPelicula(); // Asegúrate de mostrar la película después de aplicar el tema
}

// Agregar eventos a los botones del tema
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        changeTheme(button.getAttribute('data-bs-theme-value'));
    });
});

// Inicializa el tema cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initTheme);
