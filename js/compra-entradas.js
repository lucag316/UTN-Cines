
// Asigna los elementos del DOM a variables para su uso posterior
const resumenPelicula = document.getElementById("resumen-pelicula");
const resumenLugar = document.getElementById("resumen-lugar");
const resumenFecha = document.getElementById("resumen-fecha");
const resumenFormato = document.getElementById("resumen-formato");
const resumenHorario = document.getElementById("resumen-horario");
const resumenCantidad = document.getElementById("resumen-cantidad");
const resumenPromocion = document.getElementById("resumen-promocion");
const resumenTotal = document.getElementById("resumen-total");



/*
// Función para calcular el total según la cantidad y promoción
function calcularTotal(cantidad, promocion) {
    const precioEntrada = 100; // Corrige el nombre de la variable aquí
    let total = cantidad * precioEntrada;

    // Aplicar promoción 2x1
    if (promocion === "promo1") {
        total = Math.ceil(cantidad / 2) * precioEntrada; // Aplica 2x1
    }

    return total;
}*/


// Función para actualizar el resumen
function actualizarResumen() {
    // Obtener valores de los campos del formulario
    const peliculaSeleccionada = "Nombre de la Película"; // Cambia esto según la película seleccionada
    const lugarSeleccionado = document.getElementById("lugar").value;
    const fechaSeleccionada = document.getElementById("fecha").value;
    const formatoSeleccionado = document.getElementById("formato").value;
    const horarioSeleccionado = document.getElementById("horario").value;
    const cantidadPersonas = parseInt(document.getElementById("personas").value) || 0;
    const promocionSeleccionada = document.getElementById("promocion").value;

    // Actualizar el resumen
    resumenPelicula.textContent = peliculaSeleccionada;
    resumenLugar.textContent = lugarSeleccionado !== "Elige una sede" ? lugarSeleccionado : "----------";
    resumenFecha.textContent = fechaSeleccionada || "----------";
    resumenFormato.textContent = formatoSeleccionado !== "Selecciona el formato" ? formatoSeleccionado : "----------";
    resumenHorario.textContent = horarioSeleccionado !== "Selecciona el horario" ? horarioSeleccionado : "----------";
    resumenCantidad.textContent = cantidadPersonas;

    // Actualizar promoción en el resumen
    if (promocionSeleccionada === "ninguna") {
        resumenPromocion.textContent = "Sin Promoción";
    } else if (promocionSeleccionada === "Elige una promoción") {
        resumenPromocion.textContent = "----------"; // Cambia esto a "----------" si no hay promoción seleccionada
    } else {
        resumenPromocion.textContent = promocionSeleccionada;
    }
    /*
    // Calcular total
    let total = calcularTotal(cantidadPersonas, promocionSeleccionada);
    resumenTotal.textContent = total.toFixed(2);*/
}




// Asignar eventos a los campos del formulario
document.getElementById("lugar").addEventListener("change", actualizarResumen);
document.getElementById("fecha").addEventListener("change", actualizarResumen);
document.getElementById("formato").addEventListener("change", actualizarResumen);
document.getElementById("horario").addEventListener("change", actualizarResumen);
document.getElementById("personas").addEventListener("input", actualizarResumen);
document.getElementById("promocion").addEventListener("change", actualizarResumen);

// Al cargar la página, llenar el resumen inicial
document.addEventListener("DOMContentLoaded", function() {
    actualizarResumen(); // Llama a la función al cargar la página para mostrar los datos iniciales
});

// Función para guardar los datos de compra en localStorage
function guardarDatosLocalStorage() {
    // Guardar en localStorage
    /*localStorage.setItem("pelicula", peliculaSeleccionada); // Cambiado a usar la variable correcta*/
    localStorage.setItem("lugar", document.getElementById("lugar").value);
    localStorage.setItem("fecha", document.getElementById("fecha").value);
    localStorage.setItem("formato", document.getElementById("formato").value);
    localStorage.setItem("horario", document.getElementById("horario").value);
    localStorage.setItem("cantidad", document.getElementById("personas").value);
    localStorage.setItem("promocion", document.getElementById("promocion").value);

    // Console logs para verificar que los datos se guardaron
    console.log("Datos guardados en localStorage:");
    console.log("Lugar:", document.getElementById("lugar").value);
    console.log("Fecha:", document.getElementById("fecha").value);

}

// Llama a la función de guardar en localStorage cada vez que se actualiza el resumen
const inputs = document.querySelectorAll('.input-general, .select-general');
inputs.forEach(input => {
    input.addEventListener('change', guardarDatosLocalStorage);
});


// Función para volver al perfil de la película
function volverAPerfilPelicula() {
    window.location.href = "perfil_peli.html"; 
}

// Función para continuar a la elección de asientos
function continuarASeleccionButacas() {
    guardarDatosLocalStorage(); // Guardar datos al continuar
    window.location.href = "eleccion-butacas.html"; // Redirigir a la página de selección de butacas
}

// Asignar el evento click al botón continuar
document.getElementById("btn-continuar").addEventListener("click", continuarASeleccionButacas);