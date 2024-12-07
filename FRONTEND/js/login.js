// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar el formulario de login
    const loginForm = document.querySelector("form");

    // Escuchar el evento de envío del formulario
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos de entrada
        const email = loginForm.querySelector("input[type='text']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        try {
            // Enviar los datos al servidor
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, contraseña: password }),
            });

            // Verificar la respuesta del servidor
            if (response.ok) {
                const data = await response.json();

                // Guardar el nombre y email del usuario en localStorage
                localStorage.setItem("userName", data.usuario.nombre);
                localStorage.setItem("userEmail", data.usuario.email);


                alert(`¡Bienvenido, ${data.usuario.nombre}!`);
                // Redirigir al usuario a la página de inicio
                window.location.href = "http://127.0.0.1:3000/FRONTEND/html/perfil_usuario.html"; // hacer relativa y ver si cambiar.
            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText}`);
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Hubo un problema al iniciar sesión. Inténtalo más tarde.");
        }
    });
});
