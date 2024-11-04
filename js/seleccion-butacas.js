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

// Al cargar la página, actualizar el resumen con datos de localStorage
window.onload = function() {
    const pelicula = localStorage.getItem("pelicula");
    const lugar = localStorage.getItem("lugar");
    const fecha = localStorage.getItem("fecha");
    const formato = localStorage.getItem("formato");
    const horario = localStorage.getItem("horario");
    const cantidad = localStorage.getItem("cantidad");
    const promocion = localStorage.getItem("promocion");

    // Mostrar datos en el resumen
    if (pelicula) {
        resumenPelicula.textContent = pelicula;
    }
    if (lugar) {
        resumenLugar.textContent = lugar !== "Elige una sede" ? lugar : "----------";
    }
    if (fecha) {
        resumenFecha.textContent = fecha || "----------";
    }
    if (formato) {
        resumenFormato.textContent = formato !== "Selecciona el formato" ? formato : "----------";
    }
    if (horario) {
        resumenHorario.textContent = horario !== "Selecciona el horario" ? horario : "----------";
    }
    if (cantidad) {
        resumenCantidad.textContent = cantidad || "0";
    }
    
    // Actualizar promoción en el resumen
    if (promocion) {
        if (promocion === "ninguna") {
            resumenPromocion.textContent = "Sin Promoción";
        } else {
            resumenPromocion.textContent = promocion;
        }
    }
    
    // Calcular y mostrar total
    let total = calcularTotal(cantidad, promocion);
    resumenTotal.textContent = total.toFixed(2);
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
function continuarAConfirmacionCompra() {
    window.location.href = 'confirmacion-compra.html';
}