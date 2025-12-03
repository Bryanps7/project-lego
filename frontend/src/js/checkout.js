document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadAddresses();
    loadCartItems();
});

async function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar o checkout');
        window.location.href = 'index.html';
        return;
    }
}

async function loadAddresses() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('http://localhost:3000/address', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const addresses = await response.json();

        if (response.ok) {
            displayAddresses(addresses);
        } else {
            console.error('Erro ao carregar endereços:', addresses.error);
        }
    } catch (error) {
        console.error('Erro ao carregar endereços:', error);
    }
}

function displayAddresses(addresses) {
    const container = document.getElementById('addresses-list');

    if (addresses.length === 0) {
        container.innerHTML = '<p class="text-muted">Nenhum endereço cadastrado. Adicione um endereço para continuar.</p>';
        return;
    }

    container.innerHTML = addresses.map(address => `
        <div class="form-check mb-3">
            <input class="form-check-input" type="radio" name="selected-address" id="address-${address.id}" value="${address.id}" ${address.is_primary ? 'checked' : ''}>
            <label class="form-check-label" for="address-${address.id}">
                <strong>${address.nickname || 'Endereço'}</strong><br>
                ${address.street}, ${address.number} ${address.complement ? '- ' + address.complement : ''}<br>
                ${address.neighborhood}, ${address.city} - ${address.state}<br>
                CEP: ${address.cep}
            </label>
        </div>
    `).join('');
}

async function loadCartItems() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch('http://localhost:3000/cart-item', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const items = await response.json();

        if (response.ok) {
            displayCheckoutItems(items);
            calculateCheckoutTotals(items);
        } else {
            alert('Erro ao carregar itens do carrinho: ' + items.error);
            window.location.href = 'cart.html';
        }
    } catch (error) {
        console.error('Erro ao carregar itens do carrinho:', error);
    }
}

function displayCheckoutItems(items) {
    const container = document.getElementById('checkout-items');

    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">Carrinho vazio</p>';
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
                <img src="${item.productCart_item?.image_url || 'https://via.placeholder.com/50'}" class="img-fluid rounded me-3" style="width: 50px; height: 50px;" alt="Produto">
                <div>
                    <h6 class="mb-0">${item.productCart_item?.name || 'Produto'}</h6>
                    <small class="text-muted">Qtd: ${item.quantity}</small>
                </div>
            </div>
            <span>R$ ${item.subtotal.toFixed(2)}</span>
        </div>
    `).join('');
}

function calculateCheckoutTotals(items) {
    let subtotal = 0;
    items.forEach(item => {
        subtotal += item.subtotal;
    });

    const freight = 19.90;
    const total = subtotal + freight;

    document.getElementById('checkout-subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('checkout-frete').textContent = `R$ ${freight.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `R$ ${total.toFixed(2)}`;
}

function showAddAddressForm() {
    document.getElementById('address-form').style.display = 'block';
}

function hideAddAddressForm() {
    document.getElementById('address-form').style.display = 'none';
    document.getElementById('new-address-form').reset();
}

// Handle address form submission
document.getElementById('new-address-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return;

    const addressData = {
        cep: document.getElementById('cep').value,
        street: document.getElementById('street').value,
        number: parseInt(document.getElementById('number').value),
        complement: document.getElementById('complement').value,
        neighborhood: document.getElementById('neighborhood').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        nickname: document.getElementById('nickname').value,
        country: 'Brasil'
    };

    try {
        const response = await fetch('http://localhost:3000/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(addressData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Endereço adicionado com sucesso!');
            hideAddAddressForm();
            loadAddresses();
        } else {
            alert('Erro ao adicionar endereço: ' + result.error);
        }
    } catch (error) {
        console.error('Erro ao adicionar endereço:', error);
        alert('Erro ao adicionar endereço');
    }
});

async function finalizePurchase() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado');
        return;
    }

    // Get selected address
    const selectedAddress = document.querySelector('input[name="selected-address"]:checked');
    if (!selectedAddress) {
        alert('Selecione um endereço de entrega');
        return;
    }

    // Get selected payment method
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedPayment) {
        alert('Selecione um método de pagamento');
        return;
    }

    try {
        // First get cart items
        const cartResponse = await fetch('http://localhost:3000/cart-item', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const items = await cartResponse.json();

        if (!cartResponse.ok || items.length === 0) {
            alert('Carrinho vazio ou erro ao carregar');
            return;
        }

        const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
        const freight = 19.90;

        const saleData = {
            freight: freight,
            subtotal: subtotal,
            total: subtotal + freight,
            address_id: parseInt(selectedAddress.value),
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
            // Create payment
            const paymentData = {
                sale_id: saleResult.sale.id,
                method: selectedPayment.value,
                amount: saleResult.sale.total,
                status: 'pending'
            };

            const paymentResponse = await fetch('http://localhost:3000/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(paymentData)
            });

            const paymentResult = await paymentResponse.json();

            if (paymentResponse.ok) {
                alert('Compra finalizada com sucesso! Você será redirecionado para a página de confirmação.');
                // Clear cart by removing items
                await clearCart(token);
                window.location.href = 'index.html';
            } else {
                alert('Compra criada, mas erro no pagamento: ' + paymentResult.error);
            }
        } else {
            alert('Erro ao finalizar compra: ' + saleResult.error);
        }
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        alert('Erro ao finalizar compra');
    }
}

async function clearCart(token) {
    try {
        const response = await fetch('http://localhost:3000/cart-item', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const items = await response.json();

        if (response.ok) {
            // Delete each item
            for (const item of items) {
                await fetch(`http://localhost:3000/cart-item/${item.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
            }
        }
    } catch (error) {
        console.error('Erro ao limpar carrinho:', error);
    }
}