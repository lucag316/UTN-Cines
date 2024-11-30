
// Selecciona los elementos donde quieres mostrar los datos
const resumenPelicula = document.getElementById("resumen-pelicula");
const resumenLugar = document.getElementById("resumen-lugar");
const resumenFecha = document.getElementById("resumen-fecha");
const resumenFormato = document.getElementById("resumen-formato");
const resumenHorario = document.getElementById("resumen-horario");
const resumenCantidad = document.getElementById("resumen-cantidad");
const resumenPromocion = document.getElementById("resumen-promocion");
const resumenTotal = document.getElementById("resumen-total");

// Array para almacenar las butacas seleccionadas
let butacasSeleccionadas = [];

/**
 * Selecciona o deselecciona una butaca al hacer clic, y actualiza el resumen de compra.
 * @param {HTMLElement} element - Elemento HTML que representa la butaca seleccionada.
 */
function seleccionarButaca(element) {
    const numeroButaca = element.innerText;
    const index = butacasSeleccionadas.indexOf(numeroButaca);
    const cantidadPersonas = parseInt(localStorage.getItem('cantidad'), 10) || 0; // Carga la cantidad de personas

    if (index === -1) { 
        // Verifica si la cantidad seleccionada no excede la cantidad de personas
        if (butacasSeleccionadas.length < cantidadPersonas) {
            // Añade la butaca a la lista si no estaba seleccionada
            butacasSeleccionadas.push(numeroButaca);
            element.classList.add("selected");
        } else {
            alert(`Solo puedes seleccionar ${cantidadPersonas} butaca(s).`);
        }
    } else { 
        // Elimina la butaca de la lista si ya estaba seleccionada
        butacasSeleccionadas.splice(index, 1);
        element.classList.remove("selected");
    }

    // Muestra las butacas seleccionadas en el resumen
    document.getElementById("resumen-butacas").innerText = butacasSeleccionadas.length > 0 
        ? butacasSeleccionadas.join(", ") 
        : "Ninguna";
    
    // Guardar las butacas seleccionadas en localStorage
    localStorage.setItem('butacas', JSON.stringify(butacasSeleccionadas));
}

/**
 * Selecciona aleatoriamente las butacas restantes si no se seleccionaron todas.
 */
function seleccionarButacasAleatorias() {
    const cantidadPersonas = parseInt(localStorage.getItem('cantidad'), 10) || 0; // Carga la cantidad de personas
    const butacasTotales = Array.from({ length: 10 }, (_, i) => (i + 1).toString()); // Suponiendo 10 butacas disponibles
    const butacasDisponibles = butacasTotales.filter(butaca => !butacasSeleccionadas.includes(butaca));

    // Verifica si es necesario seleccionar aleatoriamente
    if (butacasSeleccionadas.length < cantidadPersonas) {
        const cantidadRestante = cantidadPersonas - butacasSeleccionadas.length;
        
        // Selecciona aleatoriamente las butacas restantes
        for (let i = 0; i < cantidadRestante; i++) {
            const randomIndex = Math.floor(Math.random() * butacasDisponibles.length);
            const butacaAleatoria = butacasDisponibles[randomIndex];
            
            if (butacaAleatoria) {
                butacasSeleccionadas.push(butacaAleatoria);
                butacasDisponibles.splice(randomIndex, 1); // Elimina la butaca seleccionada de la lista
            }
        }
        
        // Actualiza el resumen de butacas
        document.getElementById("resumen-butacas").innerText = butacasSeleccionadas.join(", ");
        localStorage.setItem('butacas', JSON.stringify(butacasSeleccionadas)); // Guarda en localStorage
    }
}

// Cargar el resumen de compra desde localStorage al iniciar la página
function cargarResumenCompra() {
    resumenPelicula.textContent = localStorage.getItem('tituloPelicula') || "----------"; // Asegúrate de cargar el nombre de la película
    resumenLugar.textContent = localStorage.getItem('lugar') || "----------";
    resumenFecha.textContent = localStorage.getItem('fecha') || "----------";
    resumenFormato.textContent = localStorage.getItem('formato') || "----------";
    resumenHorario.textContent = localStorage.getItem('horario') || "----------";
    resumenCantidad.textContent = localStorage.getItem('cantidad') || "0";
    resumenPromocion.textContent = localStorage.getItem('promocion') || "Sin Promoción";
    resumenTotal.textContent = localStorage.getItem('total') || "0.00";
    
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
    seleccionarButacasAleatorias(); // Llama a la función antes de redirigir
    window.location.href = 'confirmacion-compra.html';
}

// Cargar el resumen de compra al cargar la página
document.addEventListener("DOMContentLoaded", cargarResumenCompra);
