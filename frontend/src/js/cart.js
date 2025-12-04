document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    const id = window.localStorage.getItem('id')
    const token = window.localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para ver o carrinho');
        window.location.href = 'index.html';
        return;
    }

    try {
       fetch(`http://localhost:3000/cart-item/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(resp => resp.json())
        .then(items => {
            displayCartItems(items);
            calculateTotals(items);
        })

    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
    }
}

function displayCartItems(items) {
    const container = document.querySelector('.col-lg-8');
    const staticItems = container.querySelectorAll('.card.mb-3');
    staticItems.forEach(item => item.remove());

    if (items.length === 0) {
        container.innerHTML += '<p class="text-center">Seu carrinho está vazio</p>';
        return;
    }

    fetch('http://localhost:3000/product/')

    items.forEach(item => {
        const itemHtml = `
            <div class="card bg-dark text-light mb-3 p-3">
                <div class="row align-items-center">
                    <div class="col-3 col-md-2">
                        <img src="${item.productCart_item?.image_url || 'https://via.placeholder.com/150'}" class="img-fluid rounded" alt="Imagem do produto">
                    </div>
                    <div class="col-9 col-md-4">
                        <h5 class="mb-1">${item.productCart_item?.name || 'Produto'}</h5>
                        <p class="small text-secondary">Código: ${item.product_id}</p>
                        <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeItem(${item.id})">Remover</button>
                    </div>
                    <div class="col-6 col-md-3 mt-3 mt-md-0 text-center">
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-light" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="fw-bold" id="qty-${item.id}">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-light" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 mt-3 mt-md-0 text-end">
                        <h5 class="fw-bold">R$ ${item.subtotal.toFixed(2)}</h5>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += itemHtml;
    });
}

function calculateTotals(items) {
    let subtotal = 0;
    items.forEach(item => {
        subtotal += item.subtotal;
    });

    const freight = 19.90; // fixed for now
    const total = subtotal + freight;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('frete').textContent = `R$ ${freight.toFixed(2)}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}

async function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) return;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/cart-item/${itemId}/quantity`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ quantity: newQuantity })
        });

        const data = await response.json();

        if (response.ok) {
            loadCart(); // reload cart
        } else {
            alert('Erro ao atualizar quantidade: ' + data.error);
        }
    } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
    }
}

async function removeItem(itemId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/cart-item/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();

        if (response.ok) {
            loadCart(); // reload cart
        } else {
            alert('Erro ao remover item: ' + data.error);
        }
    } catch (error) {
        console.error('Erro ao remover item:', error);
    }
}

async function finalizePurchase() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado');
        return;
    }

    try {
        // First get cart items
        const response = await fetch('http://localhost:3000/cart-item', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const items = await response.json();

        if (!response.ok || items.length === 0) {
            alert('Carrinho vazio ou erro ao carregar');
            return;
        }

        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const freight = 19.90;

        const saleData = {
            freight: freight,
            subtotal: subtotal,
            items: items.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        const saleResponse = await fetch('http://localhost:3000/sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(saleData)
        });

        const saleResult = await saleResponse.json();

        if (saleResponse.ok) {
            alert('Compra finalizada com sucesso!');
            // Clear cart or redirect
            window.location.href = 'index.html';
        } else {
            alert('Erro ao finalizar compra: ' + saleResult.error);
        }
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        alert('Erro ao finalizar compra');
    }
}

// Attach to button
document.addEventListener('DOMContentLoaded', () => {
    const finalizeBtn = document.querySelector('.btn-warning');
    if (finalizeBtn) {
        finalizeBtn.addEventListener('click', goToCheckout);
    }
});

function goToCheckout() {
    window.location.href = 'checkout.html';
}