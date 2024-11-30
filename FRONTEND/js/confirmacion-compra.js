
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

const btnConfirmar = document.getElementById("btn-confirmar");

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

// Función para verificar si todos los campos están llenos
function verificarCampos() {
    const email = document.getElementById("email").value.trim();
    const nombreTitular = document.getElementById("nombre-titular").value.trim();
    const dniTitular = document.getElementById("dni-titular").value.trim();
    const numeroTarjeta = document.getElementById("numero-tarjeta").value.trim();
    const codigoSeguridad = document.getElementById("codigo-seguridad").value.trim();
    const mesVencimiento = document.getElementById("mes-vencimiento").value.trim();
    const anioVencimiento = document.getElementById("anio-vencimiento").value.trim();
    const medioPago = document.getElementById("medio-pago").value;
    const terminos = document.getElementById("confirmacion-terminos").checked;

    // Habilita o deshabilita el botón según el estado de los campos
    if (email && nombreTitular && dniTitular && numeroTarjeta && codigoSeguridad && 
        mesVencimiento && anioVencimiento && medioPago && terminos) {
        btnConfirmar.disabled = false; // Habilita el botón
    } else {
        btnConfirmar.disabled = true; // Deshabilita el botón
    }
}

// Función para volver a la eleccion de butacas
function volverAEleccionButacas() {
    window.location.href = "eleccion-butacas.html"; 
}

// Agregar event listeners a los campos del formulario
document.getElementById("email").addEventListener("input", verificarCampos);
document.getElementById("nombre-titular").addEventListener("input", verificarCampos);
document.getElementById("dni-titular").addEventListener("input", verificarCampos);
document.getElementById("numero-tarjeta").addEventListener("input", verificarCampos);
document.getElementById("codigo-seguridad").addEventListener("input", verificarCampos);
document.getElementById("mes-vencimiento").addEventListener("input", verificarCampos);
document.getElementById("anio-vencimiento").addEventListener("input", verificarCampos);
document.getElementById("medio-pago").addEventListener("change", verificarCampos);
document.getElementById("confirmacion-terminos").addEventListener("change", verificarCampos);

// Inicializa el estado del botón al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    btnConfirmar.disabled = true; // Deshabilita el botón al inicio
    cargarResumenCompra(); // Cargar el resumen de compra
});