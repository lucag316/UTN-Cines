
// #################### TEMA DINÁMICO #######################

// Obtenemos referencias a los elementos del DOM que vamos a manipular
const themeButtons = document.querySelectorAll('[data-bs-theme-value]'); // Botones para cambiar el tema
const body = document.body; // Elemento body del DOM donde vamos a cambiar las clases del tema
const filtros = document.querySelector('.contenedor-filtros'); // Contenedor de filtros para cambiar el tema también
// FIJARSE SI ACA VA LA BARRA DE BUSQUEDA TAMBIEN

// Función para cambiar el tema de la página
function changeTheme(theme) {
    // Cambiamos las clases del body según el tema seleccionado (oscuro o claro)
    body.classList.toggle('dark-mode', theme === 'dark');
    body.classList.toggle('light-mode', theme === 'light');

    // Si el tema es 'auto', ajustamos el tema automáticamente según la preferencia del sistema
    if (theme === 'auto') {
        setAutoTheme();
    }

    // Guardamos la preferencia del tema en el almacenamiento local del navegador (localStorage)
    localStorage.setItem('selectedTheme', theme);

    // Actualizamos los elementos que deben cambiar su tema
    updateCardTheme();
    updateThemeIcon(theme);
    updateFiltersTheme();  // Actualizamos el tema de los filtros
    updateSearchBarTheme();  // Actualizamos el tema de la barra de búsqueda
    updateMovieProfileTheme(); // Actualizamos el tema en el perfil de la película
}

// Detectamos si el usuario cambia su preferencia del sistema para el modo oscuro/ligero
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    // Si el tema actual es automático, ajustamos el tema según la preferencia del sistema
    if (localStorage.getItem('selectedTheme') === 'auto') {
        setAutoTheme();
    }
});

// Función que ajusta el tema automáticamente según la preferencia del sistema
function setAutoTheme() {
    // Detectamos si el sistema tiene preferencia por el modo oscuro
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Cambiamos las clases del body según la preferencia detectada
    body.classList.toggle('dark-mode', prefersDarkScheme);
    body.classList.toggle('light-mode', !prefersDarkScheme);

    // Actualizamos los elementos que deben cambiar según el tema
    updateCardTheme();
    if(filtros) {
        updateFiltersTheme();  // Actualizamos el tema de los filtros
        updateSearchBarTheme();  // Actualizamos el tema de la barra de búsqueda
        updateMovieProfileTheme(); // Actualizamos el tema en el perfil de la película
    }
}

// Función para actualizar las tarjetas de la página según el tema
function updateCardTheme() {
    // Seleccionamos todas las tarjetas en la página
    const cards = document.querySelectorAll('.card');
    // Determinamos qué clase de tema debe aplicarse (oscuro o claro)
    const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    
    // Iteramos sobre cada tarjeta y cambiamos las clases de acuerdo al tema
    cards.forEach(card => {
        card.classList.remove('light-mode', 'dark-mode'); // Eliminamos las clases anteriores
        card.classList.add(themeClass); // Añadimos la clase correspondiente al nuevo tema

        // Actualizamos el color de texto y otros elementos dentro de la tarjeta
        const cardTitle = card.querySelector('.card-title');
        const duracionLabel = card.querySelector('.duracion-label');
        const duracionMinutos = card.querySelector('.duracion-minutos');

        // Aseguramos que las clases de los elementos internos también cambien según el tema
        if (cardTitle) {
            cardTitle.classList.remove('light-mode', 'dark-mode');
            cardTitle.classList.add(themeClass);
        }

        if (duracionLabel) {
            duracionLabel.classList.remove('light-mode', 'dark-mode');
            duracionLabel.classList.add(themeClass);
        }
        if (duracionMinutos) {
            duracionMinutos.classList.remove('light-mode', 'dark-mode');
            duracionMinutos.classList.add(themeClass);
        }
    });
}


// Función para actualizar el tema de los filtros cuando cambia el tema de la página
function updateFiltersTheme() {
    const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';

    if (filtros) {
        // Cambiamos las clases del contenedor de los filtros
        filtros.classList.remove('light-mode', 'dark-mode');
        filtros.classList.add(themeClass);

        // Cambiamos las clases de los elementos dentro de los filtros
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
}


// Función para actualizar el tema de la barra de búsqueda cuando cambia el tema
function updateSearchBarTheme() {
    // Verificamos si el elemento existe en el DOM antes de intentar modificarlo
    const barraBusqueda = document.getElementById('barra-busqueda');
     if (!barraBusqueda) return; // Si no existe, terminamos la función sin hacer nada

    const themeClass = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    
    // Obtenemos el elemento de la barra de búsqueda

    barraBusqueda.classList.remove('light-mode', 'dark-mode');
    barraBusqueda.classList.add(themeClass);

    // Obtenemos el contenedor del ícono de la lupa y el input de búsqueda
    const iconContainer = barraBusqueda.querySelector('.icon-container');
    const inputSearch = barraBusqueda.querySelector('input');
    
    // Actualizamos las clases de los elementos dentro de la barra de búsqueda
    iconContainer.classList.remove('light-mode', 'dark-mode');
    iconContainer.classList.add(themeClass);
    
    inputSearch.classList.remove('light-mode', 'dark-mode');
    inputSearch.classList.add(themeClass);
}


// Función para actualizar el tema del perfil de la película (si estamos en esa página)
function updateMovieProfileTheme() {

    // Verificamos si estamos en la página de perfil de la película y si el contenedor de la película existe
    const movieContainer = document.querySelector('.container-movie');
    if (!movieContainer) return; // Si no existe, terminamos la función sin hacer nada

    const themeClass = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';

    // Cambiamos el fondo de la página, incluyendo el elemento HTML y body
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    document.documentElement.classList.add(themeClass);

    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(themeClass);

    // Cambiamos el fondo del contenedor de la película

    if (movieContainer) {
        movieContainer.classList.remove('light-mode', 'dark-mode');
        movieContainer.classList.add(themeClass);
    }

    // Cambiamos los colores de texto según el tema
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

    // Actualizamos otros elementos del perfil de la película
    const detailsItems = document.querySelectorAll('.details-item');
    detailsItems.forEach(item => {
        item.classList.remove('light-mode', 'dark-mode');
        item.classList.add(themeClass);
    });
}

// Función para actualizar el icono del tema activo en el menú
function updateThemeIcon(selectedTheme) {
    themeButtons.forEach(button => {
        // Si el botón corresponde al tema seleccionado, lo marcamos como activo
        const isActive = button.getAttribute('data-bs-theme-value') === selectedTheme;
        button.setAttribute('aria-pressed', isActive);
        
        // Mostramos el icono de check solo si el botón está activo
        const checkIcon = button.querySelector('.check-icon');
        checkIcon.classList.toggle('d-none', !isActive);
    });
}

// Inicialización del tema cuando la página se carga
function initTheme() {
    // Recuperamos el tema guardado en el almacenamiento local (si existe)
    const savedTheme = localStorage.getItem('selectedTheme') || 'auto';
    changeTheme(savedTheme);

    // Verificamos si estamos en la página de perfil de película
    if (window.location.pathname.includes("perfil_peli2")) {
        // Solo ejecutamos las funciones relacionadas al perfil si estamos en esa página
        if (typeof mostrarPelicula === 'function') {
            mostrarPelicula();
        }
    }
}

// Agregamos los eventos a los botones para cambiar el tema
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Cuando el usuario hace click, cambiamos el tema según el valor del botón
        changeTheme(button.getAttribute('data-bs-theme-value'));
    });
});

// Inicializamos el tema cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});