// Inicialización de datos desde localStorage

let cartData = JSON.parse(localStorage.getItem("cart"));
let cart = cartData && cartData.length > 0 ? cartData : [];

// Elementos del DOM
const cartDropdown = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');


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

    // Agregar botón de finalizar compra
    const finalizeButton = document.createElement("li");
    finalizeButton.className = "dropdown-item text-center";
    finalizeButton.innerHTML = `<button class="btn btn-success w-100" onclick="finalizePurchase()">Finalizar compra</button>`;
    cartDropdown.appendChild(finalizeButton);

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
        total += item.price * item.quantity;

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
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
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
};

// Incrementar cantidad
const increaseQuantity = (index, event) => {
    event.stopPropagation();
    cart[index].quantity++;
    updateCart();
    updateCarrito();
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
};

// Eliminar producto del carrito
const removeFromCart = (index, event) => {
    event.stopPropagation();
    cart.splice(index, 1);
    updateCart();
    updateCarrito();

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




// Finalizar compra
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    alert("Compra finalizada. ¡Gracias por tu compra!");
    cart = [];
    updateCart();
});

// Inicializar carrito
updateCarrito();
