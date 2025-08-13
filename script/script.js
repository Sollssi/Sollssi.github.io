// ===== CARRITO DE COMPRAS =====
let cart = [];

// Actualizar contador del carrito
function updateCartCount() {
    const cartCountDesktop = document.getElementById('cartCountDesktop');
    const cartCountMobile = document.getElementById('cartCountMobile');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Actualizar ambos contadores
    if (cartCountDesktop) cartCountDesktop.textContent = totalItems;
    if (cartCountMobile) cartCountMobile.textContent = totalItems;
    
    // Actualizar clases y botón de checkout
    document.querySelectorAll('.cart-count').forEach(count => {
        count.classList.toggle('empty', totalItems === 0);
    });
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = totalItems === 0;
    }
}

// Agregar producto al carrito
function addToCart(product, buttonElement) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartCount();
    updateCartDisplay();

    // Cambiar texto del botón
    const originalText = buttonElement.textContent;
    buttonElement.textContent = "¡Artículo agregado!";
    buttonElement.disabled = true; // Evita clics repetidos durante el cambio
    setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.disabled = false;
    }, 2000);
}


// Actualizar display del carrito en el modal
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart text-center py-4">
                <div class="cart-icon-modal">
                    <img src="../imagenes/iconos/carrito-de-compras.png" alt="Carrito de compras">
                </div>
                <h4>Tu carrito está vacío</h4>
                <p class="text-muted">Agrega productos para comenzar tu compra</p>
            </div>
        `;
        cartTotal.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item ms-2" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = total.toLocaleString();
}

// Cambiar cantidad de producto
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Inicializar carrito
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.category-card[data-bg]');
    
    cards.forEach(card => {
        const bgImage = card.getAttribute('data-bg');
        card.style.backgroundImage = `url('${bgImage}')`;
    });
});

