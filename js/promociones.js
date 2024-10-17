let currentIndex = 0;

function moveCarousel(carouselId, direction) {
    const carouselTrack = document.querySelector(`#${carouselId} .carousel-track`);
    const items = carouselTrack.children;
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth;

    if (direction === 'left') {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
    } else {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    }

    carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}