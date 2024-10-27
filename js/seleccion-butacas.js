// Array para almacenar las butacas seleccionadas
let butacasSeleccionadas = [];

/**
 * Selecciona o deselecciona una butaca al hacer clic, y actualiza el resumen de compra.
 * @param {HTMLElement} element - Elemento HTML que representa la butaca seleccionada.
 */
function seleccionarButaca(element) {
    const numeroButaca = element.innerText;
    const index = butacasSeleccionadas.indexOf(numeroButaca);

    if (index === -1) { 
        // Añade la butaca a la lista si no estaba seleccionada
        butacasSeleccionadas.push(numeroButaca);
        element.classList.add("selected");
    } else { 
        // Elimina la butaca de la lista si ya estaba seleccionada
        butacasSeleccionadas.splice(index, 1);
        element.classList.remove("selected");
    }

    // Muestra las butacas seleccionadas en el resumen
    document.getElementById("resumen-butacas").innerText = butacasSeleccionadas.length > 0 
        ? butacasSeleccionadas.join(", ") 
        : "Ninguna";
}

/**
 * Redirige a la página de selección de entradas.
 */
function volverASeleccionEntradas() {
    window.location.href = 'compra-entradas.html';
}

/**
 * Redirige a la página de confirmación de compra.
 */
function continuarAPago() {
    window.location.href = 'confirmacion-compra.html';
}