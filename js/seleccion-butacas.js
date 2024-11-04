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


// Selecciona los elementos donde quieres mostrar los datos
const resumenPelicula = document.getElementById("resumen-pelicula");
const resumenLugar = document.getElementById("resumen-lugar");
const resumenFecha = document.getElementById("resumen-fecha");
const resumenFormato = document.getElementById("resumen-formato");
const resumenHorario = document.getElementById("resumen-horario");
const resumenCantidad = document.getElementById("resumen-cantidad");
const resumenPromocion = document.getElementById("resumen-promocion");
const resumenTotal = document.getElementById("resumen-total");

// Recupera los valores de localStorage y los asigna a los elementos del resumen
resumenLugar.textContent = localStorage.getItem('lugar');
resumenFecha.textContent = localStorage.getItem('fecha');
resumenFormato.textContent = localStorage.getItem('formato');
resumenHorario.textContent = localStorage.getItem('horario');
resumenCantidad.textContent = localStorage.getItem('cantidad');
resumenPromocion.textContent = localStorage.getItem('promocion');
resumenTotal.textContent = localStorage.getItem('total');

// Cargar el resumen de compra desde localStorage al iniciar la página
function cargarResumenCompra() {
    // Calcular y mostrar total
    /*let total = calcularTotal(cantidad, promocion);
    resumenTotal.textContent = total.toFixed(2);*/

    // Console logs para verificar que los datos se recuperaron
    console.log("Datos recuperados de localStorage:");
    console.log("Lugar:", resumenLugar);
    console.log("Fecha:", resumenFecha);

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

// Cargar el resumen de compra al cargar la página
document.addEventListener("DOMContentLoaded", cargarResumenCompra);
