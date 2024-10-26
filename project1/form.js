document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9#+]/g, '');
});

document.getElementById('name').addEventListener('input', function (e) {
    if (this.value.length === 1 && this.value === ' ') {
        this.value = '';
    }
    this.value = this.value.replace(/[0-9]/g, '');
});

document.getElementById('address').addEventListener('input', function (e) {
    if (this.value.length === 1 && this.value === ' ') {
        this.value = ''; 
    }
});

window.onload = function() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};
    const subtotal = parseFloat(localStorage.getItem('subtotal') || '0.00');

    const mealChosenContainer = document.getElementById('mealChosen');
    const itemLines = Object.entries(selectedItems).map(([item, details]) => {
        return `${item} (x${details.quantity}, PHP ${details.totalPrice.toFixed(2)})`;
    });
    mealChosenContainer.value = itemLines.join('\n');

    const subtotalElement = document.getElementById('subtotal');
    if (subtotalElement) {
        subtotalElement.value = `PHP ${subtotal.toFixed(2)}`;
    } else {
        console.error('Element with ID "subtotal" not found in the document.');
    }

    const deliveryFee = 52; // Set a static delivery fee
    document.getElementById('deliveryFee').value = `PHP ${deliveryFee.toFixed(2)}`;
    updateTotal(subtotal, deliveryFee); // Calculate the initial total
};

// Function to calculate the total amount
function updateTotal(subtotal, deliveryFee) {
    const total = subtotal + deliveryFee;
    document.getElementById('total').value = `PHP ${total.toFixed(2)}`;
}

document.querySelectorAll('input[name="additionalMeal"]').forEach((input) => {
    input.addEventListener('change', function() {
        if (this.value === 'yes') {
            const customerDetails = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value
            };
            localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
            window.location.href = "category.html";
        }
    });
});

document.getElementById('changeMeal').addEventListener('click', function() {
    const mealChosen = document.getElementById('mealChosen').value;
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};

    if (mealChosen) {
        if (!selectedItems[mealChosen]) {
            selectedItems[mealChosen] = { quantity: 1, totalPrice: parseFloat(document.getElementById('subtotal').value.replace('PHP ', '')) || 0 };
        } else {
            selectedItems[mealChosen].quantity += 1;
            selectedItems[mealChosen].totalPrice += parseFloat(document.getElementById('subtotal').value.replace('PHP ', ''));
        }
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }
    window.location.href = "category.html";
});

// Function to update totals when items are selected
function updateTotals() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};
    let newSubtotal = 0;

    for (const item in selectedItems) {
        newSubtotal += selectedItems[item].totalPrice;
    }

    localStorage.setItem('subtotal', newSubtotal.toFixed(2));
    const deliveryFee = 52; // Re-define delivery fee here to recalculate
    document.getElementById('subtotal').value = `PHP ${newSubtotal.toFixed(2)}`;
    updateTotal(newSubtotal, deliveryFee); // Update total after recalculating subtotal
}

// Call updateTotals to set initial values based on stored items
updateTotals();

window.addEventListener('beforeunload', updateTotals);

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (name === '') {
        alert('Please enter your name.');
        return; 
    }

    if (phone === '') {
        alert('Please enter your phone number.');
        return; 
    }

    if (address === '') {
        alert('Please enter your address.');
        return; 
    }

    if (paymentMethod === 'Select payment method') {
        alert('Please select a payment method.');
        return; 
    }

    window.location.href = "lastPage.html";
});