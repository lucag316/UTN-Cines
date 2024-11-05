// Asignar los elementos del DOM a variables para su uso posterior
const lugarInput = document.getElementById("lugar");
const fechaInput = document.getElementById("fecha");
const formatoInput = document.getElementById("formato");
const horarioInput = document.getElementById("horario");
const personasInput = document.getElementById("personas");
const promocionInput = document.getElementById("promocion");
const btnContinuar = document.getElementById("btn-continuar");

// Asignar elementos del resumen
const resumenPelicula = document.getElementById("resumen-pelicula");
const resumenLugar = document.getElementById("resumen-lugar");
const resumenFecha = document.getElementById("resumen-fecha");
const resumenFormato = document.getElementById("resumen-formato");
const resumenHorario = document.getElementById("resumen-horario");
const resumenCantidad = document.getElementById("resumen-cantidad");
const resumenPromocion = document.getElementById("resumen-promocion");
const resumenTotal = document.getElementById("resumen-total");

// Precios de las entradas según el formato
const precios = {
    "2D": 1000,
    "3D": 2000,
    "4D": 3000,
    "XD": 2500
};

// Función para habilitar los campos del formulario progresivamente
function habilitarCampos() {
    // Habilitar el campo de fecha si se seleccionó una sede
    fechaInput.disabled = lugarInput.value === "Elige una sede";
    formatoInput.disabled = !fechaInput.value;
    horarioInput.disabled = formatoInput.value === "Selecciona el formato";
    personasInput.disabled = horarioInput.value === "Selecciona el horario";
    promocionInput.disabled = !personasInput.value;

    // Verificar si todos los campos están completos para habilitar el botón de continuar
    btnContinuar.disabled = !(
        lugarInput.value !== "Elige una sede" &&
        fechaInput.value &&
        formatoInput.value !== "Selecciona el formato" &&
        horarioInput.value !== "Selecciona el horario" &&
        personasInput.value &&
        promocionInput.value !== "Elige una promoción"
    );
}


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

    const precio = precios[formatoSeleccionado] || 0; // Obtener el precio o 0 si no hay formato seleccionado

    // Calcular el total
    const total = precio * cantidadPersonas;

    // Actualizar el resumen
    resumenPelicula.textContent = peliculaSeleccionada;
    resumenLugar.textContent = lugarSeleccionado !== "Elige una sede" ? lugarSeleccionado : "----------";
    resumenFecha.textContent = fechaSeleccionada || "----------";
    resumenFormato.textContent = formatoSeleccionado !== "Selecciona el formato" ? formatoSeleccionado : "----------";
    resumenHorario.textContent = horarioSeleccionado !== "Selecciona el horario" ? horarioSeleccionado : "----------";
    resumenCantidad.textContent = cantidadPersonas;
    resumenTotal.textContent = total.toFixed(2);
    
    // Actualizar promoción en el resumen
    if (promocionSeleccionada === "ninguna") {
        resumenPromocion.textContent = "Sin Promoción";
    } else if (promocionSeleccionada === "Elige una promoción") {
        resumenPromocion.textContent = "----------"; // Cambia esto a "----------" si no hay promoción seleccionada
    } else {
        resumenPromocion.textContent = promocionSeleccionada;
    }
}

// Función para guardar los datos de compra en localStorage
function guardarDatosLocalStorage() {
    localStorage.setItem("lugar", lugarInput.value);
    localStorage.setItem("fecha", fechaInput.value);
    localStorage.setItem("formato", formatoInput.value);
    localStorage.setItem("horario", horarioInput.value);
    localStorage.setItem("cantidad", personasInput.value);
    localStorage.setItem("promocion", promocionInput.value);
    localStorage.setItem("total", resumenTotal.textContent); // Guarda el total

    // Console logs para verificar que los datos se guardaron
    console.log("Datos guardados en localStorage:");
    console.log("Total:", resumenTotal.textContent);
}

// Función para establecer la fecha mínima
function establecerFechaMinima() {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular la fecha de mañana
    const fechaDeMañana = new Date(fechaActual);
    fechaDeMañana.setDate(fechaDeMañana.getDate() + 1);

    // Formatear la fecha en el formato YYYY-MM-DD
    const opciones = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const fechaFormateada = fechaDeMañana.toLocaleDateString('en-CA', opciones);

    // Establecer la fecha mínima en el campo de fecha
    const fechaInput = document.getElementById('fecha'); // Asegúrate de que el ID coincide
    fechaInput.setAttribute('min', fechaFormateada);
}

// Función para volver al perfil de la película
function volverAPerfilPelicula() {
    window.location.href = "perfil_peli.html"; 
}

// Función para continuar a la elección de asientos
function continuarASeleccionButacas() {
    guardarDatosLocalStorage(); // Guardar datos al continuar
    window.location.href = "eleccion-butacas.html"; // Redirigir a la página de selección de butacas
}


// Agregar eventos a los campos del formulario
const inputs = [lugarInput, fechaInput, formatoInput, horarioInput, personasInput, promocionInput];
inputs.forEach(input => {
    input.addEventListener('change', () => {
        habilitarCampos(); // Habilitar campos según las selecciones
        actualizarResumen(); // Actualizar el resumen de la compra
        guardarDatosLocalStorage(); // Guardar los datos en localStorage
    });
});

// Al cargar la página, establecer estados iniciales, llenar el resumen, establecer fecha minima
document.addEventListener("DOMContentLoaded", () => {
    establecerFechaMinima();
    habilitarCampos(); // Establecer los estados iniciales
    actualizarResumen(); // Llenar el resumen inicial
    btnContinuar.disabled = true; // Deshabilitar el botón inicialmente
});


// Asignar el evento click al botón continuar
btnContinuar.addEventListener("click", continuarASeleccionButacas);




/*
// Función para habilitar los campos progresivamente y verificar si el botón puede habilitarse
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

     // Verificar si todos los campos están completos para habilitar el botón
    if (
        lugarInput.value !== "Elige una sede" &&
        fechaInput.value &&
        formatoInput.value !== "Selecciona el formato" &&
        horarioInput.value !== "Selecciona el horario" &&
        personasInput.value &&
        promocionInput.value !== "Elige una promoción"
    ) {
        btnContinuar.disabled = false;
    } else {
        btnContinuar.disabled = true;
    }
}*/