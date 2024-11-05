
// Selecciona los elementos donde quieres mostrar los datos en la página de confirmación
const resumenPelicula = document.getElementById("resumen-pelicula");
const resumenLugar = document.getElementById("resumen-lugar");
const resumenFecha = document.getElementById("resumen-fecha");
const resumenFormato = document.getElementById("resumen-formato");
const resumenHorario = document.getElementById("resumen-horario");
const resumenCantidad = document.getElementById("resumen-cantidad");
const resumenPromocion = document.getElementById("resumen-promocion");
const resumenButacas = document.getElementById("resumen-butacas");
const resumenTotal = document.getElementById("resumen-total");

// Cargar el resumen de compra desde localStorage al iniciar la página
function cargarResumenCompra() {
    resumenPelicula.textContent = localStorage.getItem('tituloPelicula') || "----------"; // Nombre de la película
    resumenLugar.textContent = localStorage.getItem('lugar') || "----------"; // Lugar
    resumenFecha.textContent = localStorage.getItem('fecha') || "----------"; // Fecha
    resumenFormato.textContent = localStorage.getItem('formato') || "----------"; // Formato
    resumenHorario.textContent = localStorage.getItem('horario') || "----------"; // Horario
    resumenCantidad.textContent = localStorage.getItem('cantidad') || 0; // Cantidad
    resumenPromocion.textContent = localStorage.getItem('promocion') || "Sin Promoción"; // Promoción
    resumenButacas.textContent = JSON.parse(localStorage.getItem('butacas')).join(", ") || "----------"; // butacas
    resumenTotal.textContent = localStorage.getItem('total') || 0; // Total
}

// Función para volver a la eleccion de butacas
function volverAEleccionButacas() {
    window.location.href = "eleccion-butacas.html"; 
}

// Cargar el resumen de compra al cargar la página
document.addEventListener("DOMContentLoaded", cargarResumenCompra);

