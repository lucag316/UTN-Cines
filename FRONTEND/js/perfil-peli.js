
// Función para ir a la página de compra de entradas
function irACompraEntradas() {
    const tituloPelicula = document.getElementById("titulo_text").textContent;
    
    localStorage.setItem("tituloPelicula", tituloPelicula); // Guardo el nombre de la película en localStorage

    window.location.href = "compra-entradas.html"; // Redirigir a la página de compra
}