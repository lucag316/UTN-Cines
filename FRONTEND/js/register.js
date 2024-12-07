document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario (refrescar la página)
    
    // Capturar los datos del formulario
    const nombre = document.querySelector("input[type='text']").value;
    const email = document.querySelector("input[type='email']").value;
    const contraseña = document.querySelector("input[type='password']").value;
    const confirmar_contraseña = document.querySelector("input[type='password']").value;

    const userData = {
        nombre,
        email,
        contraseña,
        confirmar_contraseña      
    };

    try {
        // Enviar los datos al backend
        const response = await fetch('http://localhost:5000/createUser/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData) // Convertir el objeto a JSON
        });

        if (response.ok) {
            const data = await response.json();

            // Guardar el nombre y email del usuario en localStorage
            localStorage.setItem("userName", userData.nombre);
            localStorage.setItem("userEmail", userData.email);


            alert("Registro exitoso. ¡Bienvenido!");
            window.location.href = "http://127.0.0.1:3000/FRONTEND/html/perfil_usuario.html"; // Redirigir al perfil después de registrarse
        } else {
            alert("Hubo un error en el registro. Intenta nuevamente.");
        }
    } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error de conexión con el servidor.");
    }
});

// http://127.0.0.1:3000/FRONTEND/html/login.html pepe@gmail.com 12345678
// http://127.0.0.1:3000/FRONTEND/html/registrarse.html 
