

// Asigna los elementos del DOM a variables para su uso posterior
const lugarInput = document.getElementById("lugar");
const fechaInput = document.getElementById("fecha");
const formatoInput = document.getElementById("formato");
const horarioInput = document.getElementById("horario");
const personasInput = document.getElementById("personas");
const promocionInput = document.getElementById("promocion");

// Función para habilitar los campos progresivamente
function habilitarCampos() {
    // Revisa cada campo y habilita el siguiente si el anterior está completo

    // Habilita el campo de fecha si ya se seleccionó una sede
    if (lugarInput.value !== "Elige una sede") { // si dice la opcion predeterminada es porque no se selcciono nada
        fechaInput.disabled = false;
    } else {
        fechaInput.disabled = true;
        formatoInput.disabled = true;
        horarioInput.disabled = true;
        personasInput.disabled = true;
        promocionInput.disabled = true;
    }
    
    // Habilita el campo de formato si la fecha está seleccionada
    if (fechaInput.value) {
        formatoInput.disabled = false;
    } else {
        formatoInput.disabled = true;
        horarioInput.disabled = true;
        personasInput.disabled = true;
        promocionInput.disabled = true;
    }

    // Habilita el campo de horario si el formato está seleccionado
    if (formatoInput.value !== "Selecciona el formato") {
        horarioInput.disabled = false;
    } else {
        horarioInput.disabled = true;
        personasInput.disabled = true;
        promocionInput.disabled = true;
    }

    // Habilita el campo de cantidad de personas si el horario está seleccionado
    if (horarioInput.value !== "Selecciona el horario") {
        personasInput.disabled = false;
    } else {
        personasInput.disabled = true;
        promocionInput.disabled = true;
    }

    // Habilita el campo de promoción si la cantidad de personas está ingresada
    if (personasInput.value) {
        promocionInput.disabled = false;
    } else {
        promocionInput.disabled = true;
    }
}

// Agrega el evento `change` a cada campo para activar el siguiente campo al cambiar
lugarInput.addEventListener('change', habilitarCampos);
fechaInput.addEventListener('change', habilitarCampos);
formatoInput.addEventListener('change', habilitarCampos);
horarioInput.addEventListener('change', habilitarCampos);
personasInput.addEventListener('change', habilitarCampos);

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
    const peliculaSeleccionada = localStorage.getItem("tituloPelicula") || "----------"; // cargo el nombre de la pelicula
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
const inputs = document.querySelectorAll('#lugar, #fecha, #formato, #horario, #personas, #promocion');
inputs.forEach(input => {
    input.addEventListener('change', actualizarResumen);
});

// Al cargar la página, llenar el resumen inicial
document.addEventListener("DOMContentLoaded", actualizarResumen);

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

// Llama a habilitarCampos al cargar la página para establecer los estados iniciales
document.addEventListener("DOMContentLoaded", habilitarCampos);

// Asignar el evento click al botón continuar
document.getElementById("btn-continuar").addEventListener("click", continuarASeleccionButacas);

