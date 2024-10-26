let selectedItems = {};
let subtotal = 0;

function loadSelectedItems() {
    const storedItems = localStorage.getItem('selectedItems');
    if (storedItems) {
        selectedItems = JSON.parse(storedItems);
        updateSelectedItemsDisplay();
        updateSubtotal();
        toggleProceedButton();
    }
}

// Check if the page is being loaded for the first time or refreshed
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    // Clear the selected items and subtotal on refresh
    localStorage.removeItem('selectedItems');
    localStorage.removeItem('subtotal');
    selectedItems = {}; // Reset selected items for the current session
    subtotal = 0; // Reset subtotal
} else {
    // If not refreshed, load the stored items and update subtotal
    const storedSubtotal = localStorage.getItem('subtotal');
    subtotal = storedSubtotal ? parseFloat(storedSubtotal) : 0;
}

// Set up event listeners for dropdown options
document.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', function() {
        const item = this.dataset.selectedItem;
        const price = parseFloat(this.dataset.price);
        const quantity = parseInt(document.getElementById('quantity').value);

        if (item && quantity > 0) {
            updateSelectedItems(item, quantity, price);
        } else {
            alert('Please select an item and enter a valid quantity.');
        }
    });
});

function updateSelectedItems(item, quantity, price) {
    const totalPrice = quantity * price;

    if (quantity === 0) {
        delete selectedItems[item];
    } else {
        selectedItems[item] = { quantity, price, totalPrice };
    }

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    updateSelectedItemsDisplay();
    updateSubtotal();
    toggleProceedButton();
}

function updateSelectedItemsDisplay() {
    const selectedItemsDiv = document.getElementById('selected-items');
    selectedItemsDiv.innerHTML = ''; 

    Object.entries(selectedItems).forEach(([item, details]) => {
        if (details.price !== undefined && details.quantity !== undefined) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'selected-item row';
            itemDiv.innerHTML = `
                <div class="col-md-6">
                    ${item} - PHP ${details.price.toFixed(2)} each
                </div>
                <div class="quantity-control col-md-3">
                    <button class="btn btn-outline-secondary decrease-quantity" data-item="${item}">−</button>
                    <span class="quantity">${details.quantity}</span>
                    <button class="btn btn-outline-secondary increase-quantity" data-item="${item}">+</button>
                </div>
                <div class="col-md-3">
                    PHP ${(details.totalPrice || 0).toFixed(2)}
                </div>
            `;
            selectedItemsDiv.appendChild(itemDiv);
        }
    });

    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const newQuantity = selectedItems[item].quantity + 1;
            updateSelectedItems(item, newQuantity, selectedItems[item].price);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const newQuantity = selectedItems[item].quantity - 1;
            updateSelectedItems(item, newQuantity, selectedItems[item].price);
        });
    });
}

function updateSubtotal() {
    subtotal = Object.values(selectedItems).reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    document.getElementById('modal-total').textContent = `Total Amount: PHP ${subtotal.toFixed(2)}`;
    localStorage.setItem('subtotal', subtotal.toFixed(2));
}

document.getElementById('proceed-button').addEventListener('click', function() {
    if (Object.keys(selectedItems).length === 0) {
        alert('Please add an item to your order before proceeding.');
    } else {
        window.location.href = 'form.html';
    }
});

window.addEventListener('load', loadSelectedItems);