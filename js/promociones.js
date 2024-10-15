function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth; // Ancho de cada item
    const gap = 20; // Margen entre los items
    const totalWidth = (itemWidth + gap) * 2; // Ancho total de dos items con margen

    // Obtener la posición actual del track
    const currentTransform = getComputedStyle(track).transform;
    const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);

    let currentTranslateX = 0; // Posición inicial

    // Si hay un valor de transformación, extraer el valor de la posición X
    if (matrixValues) {
        currentTranslateX = parseFloat(matrixValues[1].split(', ')[4]);
    }

    if (direction === 'left') {
        track.style.transform = `translateX(${currentTranslateX + totalWidth}px)`;
    } else if (direction === 'right') {
        track.style.transform = `translateX(${currentTranslateX - totalWidth}px)`;
    }
}