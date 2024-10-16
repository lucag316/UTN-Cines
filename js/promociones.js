function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth; // Ancho de cada item
    const gap = 20; // Margen entre los items
    const totalWidth = itemWidth + gap; // Ancho total de un item con margen

    const itemsToScroll = 2; // Número de ítems a avanzar por clic
    const itemsVisible = 4;  // Número de ítems visibles
    const totalItems = items.length; // Total de ítems en el carrusel

    // Obtener la posición actual del track
    const currentTransform = getComputedStyle(track).transform;
    const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
    
    let currentTranslateX = 0; // Posición inicial
    
    // Si hay un valor de transformación, extraer el valor de la posición X
    if (matrixValues) {
        currentTranslateX = parseFloat(matrixValues[1].split(', ')[4]);
    }

    // Calcula el máximo desplazamiento hacia la izquierda (no permitir mover más allá del primer item)
    const maxScrollLeft = 0;

    // Calcula el máximo desplazamiento hacia la derecha (no permitir mover más allá del último item visible)
    const maxScrollRight = -(totalWidth * (totalItems - itemsVisible)); // Calcula el límite derecho

    if (direction === 'left') {
        // Mover hacia la izquierda, pero limitar el desplazamiento si ya estamos en el borde
        if (currentTranslateX < maxScrollLeft) {
            track.style.transform = `translateX(${Math.min(currentTranslateX + totalWidth * itemsToScroll, maxScrollLeft)}px)`;
        }
    } else if (direction === 'right') {
        // Mover hacia la derecha, pero limitar el desplazamiento si ya estamos en el borde
        if (currentTranslateX > maxScrollRight) {
            track.style.transform = `translateX(${Math.max(currentTranslateX - totalWidth * itemsToScroll, maxScrollRight)}px)`;
        }
    }
}