let currentIndex = 0; // Índice actual del carrusel

function moveCarousel(carouselId, direction) {
    const carouselTrack = document.querySelector(`#${carouselId} .carousel-track`);
    const items = carouselTrack.children; // Obtiene los elementos del carrusel
    const itemWidth = items[0].clientWidth + 40; // Ancho del elemento + margen

    if (direction === 'left') {
        // Desplazarse a la izquierda
        currentIndex = Math.max(currentIndex - 1, 0); // Asegura que no se mueva fuera del rango
    } else if (direction === 'right') {
        // Desplazarse a la derecha
        currentIndex = Math.min(currentIndex + 1, items.length - 3); // Limita a la cantidad de elementos - 3
    }

    // Aplica la transformación para desplazar el carrusel
    carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}