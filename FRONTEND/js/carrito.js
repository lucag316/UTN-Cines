// Inicialización de datos desde localStorage

let cartData = JSON.parse(localStorage.getItem("cart"));
let cart = cartData && cartData.length > 0 ? cartData : [];

// Elementos del DOM
const cartDropdown = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const descPDFbtn = document.getElementById('descPDFbtn');

// Actualizar el contenido del carrito (en dropdown y en detalle)
const updateCart = () => {
    // Actualizar contador de elementos en el carrito
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Actualizar resumen del carrito (dropdown)
    cartDropdown.innerHTML = "";

    if (cart.length === 0) {
        cartDropdown.innerHTML = `<li class="dropdown-item text-center text-muted">El carrito está vacío</li>`;
        cartList.innerHTML = `<p class="text-muted">El carrito está vacío</p>`;
        cartTotal.textContent = "$0.00";
        localStorage.setItem("cart", JSON.stringify([]));
        return;
    }

    // Dropdown del carrito
    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.className = "dropdown-item d-flex justify-content-between align-items-center";

        cartItem.innerHTML = `
            <span>${item.title} (x${item.quantity})</span>
            <div>
                <button class="btn btn-sm btn-secondary me-2" onclick="decreaseQuantity(${index}, event)">-</button>
                <button class="btn btn-sm btn-primary me-2" onclick="increaseQuantity(${index}, event)">+</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index}, event)">X</button>
            </div>
        `;
        cartDropdown.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Añade un botón para finalizar la compra
    const checkoutButton = document.createElement("li");
    checkoutButton.className = "dropdown-item text-center";
    checkoutButton.innerHTML = `<button class="btn btn-success w-100" onclick="irACarrito()">Ver resumen</button>`;
    cartDropdown.appendChild(checkoutButton);

    // Guardar carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Actualizar contenido del carrito
const updateCarrito = () => {
    cartList.innerHTML = ""; // Limpiar contenido anterior
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-muted">El carrito está vacío</p>`;
        cartTotal.textContent = "$0.00";
        return;
    }

    cart.forEach((item, index) => {
        total += parseInt(item.precio) * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = "list-group-item d-flex justify-content-between align-items-center";

        cartItem.innerHTML = `
            <div>
                <h5 class="mb-1">${item.title}</h5>
                <small>$ ${item.precio} c/u</small>
            </div>
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${index},event)">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${index},event)">+</button>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index},event)">Eliminar</button>
        `;

        cartList.appendChild(cartItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Guardar carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
};


// Agregar producto al carrito
const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    updateCarrito();
    updateResumenCarrito()
};

// Incrementar cantidad
const increaseQuantity = (index, event) => {
    event.stopPropagation();
    cart[index].quantity++;
    updateCart();
    updateCarrito();
    updateResumenCarrito()
};

// Disminuir cantidad
const decreaseQuantity = (index, event) => {
    event.stopPropagation();
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
    updateCarrito();
    updateResumenCarrito()
};

// Eliminar producto del carrito
const removeFromCart = (index, event) => {
    event.stopPropagation();
    cart.splice(index, 1);
    updateCart();
    updateCarrito();
    updateResumenCarrito()

};



// Finalizar compra
const finalizePurchase = () => {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("Compra finalizada. ¡Gracias por tu compra!");
    cart = [];
    updateCart();
    updateCarrito();
    window.location.href = "./html/pago.html";
};

// Inicializar carrito
updateCart();


descPDFbtn.addEventListener('click',()=>{
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    generatePDF()
})

// Finalizar compra
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("Compra finalizada. ¡Gracias por tu compra!");

    cart = [];
    updateCart();
    updateCartSummary()
});

// Inicializar carrito
updateCarrito();
// Actualizar el resumen de compra
const updateCartSummary = () => {
    const cartSummary = document.getElementById('cartSummary');
    cartSummary.innerHTML = ""; // Limpia el contenido anterior

    if (cart.length === 0) {
        cartSummary.innerHTML = `<li class="list-group-item text-muted">El carrito está vacío</li>`;
        cartTotal.textContent = "$0.00";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.precio * item.quantity;
        total += itemTotal;

        const summaryItem = document.createElement('li');
        summaryItem.className = "list-group-item d-flex justify-content-between align-items-center";

        summaryItem.innerHTML = `
            <div>
                <strong>${item.title}</strong> <br>
                <span>$${item.precio} x ${item.quantity}</span>
            </div>
            <span class="text-end">$${itemTotal.toFixed(2)}</span>
        `;

        cartSummary.appendChild(summaryItem);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
};

// Modifica las funciones para llamar también a `updateCartSummary`
const updateResumenCarrito = () => {
    cartList.innerHTML = "";
    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-muted">El carrito está vacío</p>`;
        updateCartSummary(); // Actualizar también el resumen
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = "list-group-item d-flex justify-content-between align-items-center";

        cartItem.innerHTML = `
            <div>
                <h5 class="mb-1">${item.title}</h5>
                <small>$${item.precio} c/u</small>
            </div>
            <div class="btn-group">
                <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${index},event)">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${index},event)">+</button>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index},event)">Eliminar</button>
        `;

        cartList.appendChild(cartItem);
    });

    updateCartSummary(); // Actualizar el resumen
};

// Agrega esta llamada donde sea necesario
updateCartSummary();
updateResumenCarrito()



function generatePDF() {
    // Recuperar el carrito del localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("El carrito está vacío. No hay nada para descargar.");
        return;
    }

    // Crear el contenido del PDF con imágenes convertidas
    const createPDFContent = async () => {
        const pdfContent = document.createElement("div");
        pdfContent.innerHTML = `
            <h1 style="text-align: center;">Resumen de Compra</h1>
            <ul style="list-style: none; padding: 0; font-family: Arial, sans-serif;">`;

        for (const item of cart) {
           

            pdfContent.innerHTML += `
                <li style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding: 10px 0;">
                    <div style="flex: 1;">
                        <strong>${item.title}</strong> (x${item.quantity})
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <span> ${item.quantity} x $${item.precio} = </span>
                        <span>$${(item.precio * item.quantity).toFixed(2)}</span>
                    </div>
                   
                </li>`;
        }

        pdfContent.innerHTML += `
            </ul>
            <hr>
            <h3 style="text-align: right;">Total: $${cart
                .reduce((sum, item) => sum + item.precio * item.quantity, 0)
                .toFixed(2)}</h3>
            <p style="text-align: center;">Gracias por tu compra.</p>`;

        return pdfContent;
    };

    // Generar y descargar el PDF
    createPDFContent().then((pdfContent) => {
        const options = {
            margin: 1,
            filename: "Resumen_de_Compra.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf().set(options).from(pdfContent).save();
    });
}
















function generatePDF2() {
    // Recuperar el carrito del localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("El carrito está vacío. No hay nada para descargar.");
        return;
    }

    // Crear un contenedor temporal para el contenido del PDF
    const pdfContent = document.createElement("div");
    pdfContent.innerHTML = `
        <h1>UTN CINES</h1>
        <h1>Resumen de Compra</h1>
        <ul style="list-style: none; padding: 0;">
            ${cart
                .map(
                    (item) => `
                <li style="margin-bottom: 10px; display: flex; justify-content: space-between; border-bottom: 1px solid #ccc; padding: 5px 0;">
                    <span>${item.title} (x${item.quantity})</span>
                    <span>$${(item.precio * item.quantity).toFixed(2)}</span>
                    <img src="${item.img}" style="width: 50px; height: 50px; object-fit: cover; margin-left: 10px;" />
                </li>
            `
                )
                .join("")}
        </ul>
        <hr>
        <h3>Total: $${cart.reduce((sum, item) => sum + item.precio * item.quantity, 0).toFixed(2)}</h3>
        <p>¡Muchas gracias por tu compra!</p>
        <p>¡Qué lo disfrutes!!</p>
    `;

    // Configuración del PDF
    const options = {
        margin: 1,
        filename: "Resumen_de_Compra.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generar el PDF y descargarlo
    html2pdf().set(options).from(pdfContent).save();
}
