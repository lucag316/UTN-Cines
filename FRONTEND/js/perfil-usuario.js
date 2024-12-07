/* Simulación de usuario autenticado
const user = {
    name: "Juan Pérezzzz",
    email: "juan.perez@gmail.com",
};

// Función para actualizar los datos del usuario en el DOM
function mostrarDatosUsuario() {
    const userNameElement = document.getElementById("user-name");
    const userEmailElement = document.getElementById("user-email");

    if (userNameElement && userEmailElement) {
        userNameElement.textContent = user.name;
        userEmailElement.textContent = user.email;
    }
}

// Ejecutar la función al cargar el DOM
document.addEventListener("DOMContentLoaded", mostrarDatosUsuario); */
