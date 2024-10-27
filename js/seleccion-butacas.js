// Array para almacenar las butacas seleccionadas
let butacasSeleccionadas = [];

function seleccionarButaca(element) {
    const numeroButaca = element.innerText;
    // Verificar si la butaca ya está seleccionada
    const index = butacasSeleccionadas.indexOf(numeroButaca);
    
    if (index === -1) { 
        // Selecciona la butaca si no está en la lista
        butacasSeleccionadas.push(numeroButaca);
        element.classList.add("selected");
    } else { 
        // Deselecciona la butaca si ya estaba seleccionada
        butacasSeleccionadas.splice(index, 1);
        element.classList.remove("selected");
    }

    // Actualiza el resumen de butacas seleccionadas
    document.getElementById("resumen-butacas").innerText = butacasSeleccionadas.length > 0 
        ? butacasSeleccionadas.join(", ") 
        : "Ninguna";
}

// Función para volver a la selección de entradas
function volverASeleccionEntradas() {
    window.location.href = 'compra-entradas.html'; // Cambiar a la ruta correcta
}

// Función para continuar al pago
function continuarAPago() {
    // Aquí puedes agregar la lógica para pasar a la página de pago
    window.location.href = 'confirmar-compra.html'; // Cambiar a la ruta correcta
}