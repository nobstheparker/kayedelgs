document.addEventListener("DOMContentLoaded", function () {

    const dedicationType = document.getElementById('dedicationType');
    const yesRadio = document.getElementById('yes');
    const noRadio = document.getElementById('no');

    function toggleDedicationType() {
        if (noRadio.checked) {
            dedicationType.disabled = true;
            dedicationType.selectedIndex = 0; 
        } else if (yesRadio.checked) {
            dedicationType.disabled = false;
        }
    }

    yesRadio.addEventListener('change', toggleDedicationType);
    noRadio.addEventListener('change', toggleDedicationType);

    toggleDedicationType();

    document.getElementById('first-name').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });

    document.getElementById('last-name').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');    
    });

    document.getElementById('recipientName').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');    
    });

    document.getElementById('recipientEmail').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
    });

    document.getElementById('email').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
    });

    document.getElementById('phone').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
        this.value = this.value.replace(/[^0-9]/g, ''); 
    });

    document.getElementById('address').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
    });

    document.getElementById('other-details').addEventListener('input', function (e) {
        if (this.value.length === 1 && this.value === ' ') {
            this.value = ''; 
        }
    });

    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');
        const amount = document.getElementById('amount');
        const paymentMethod = document.getElementById('paymentMethod');
        const termsCheck = document.getElementById('termsCheck');

        if (firstName.value.trim() === '') {
            alert("First Name is required and cannot contain numbers.");
            firstName.focus();
            return false;
        }

        if (lastName.value.trim() === '') {
            alert("Last Name is required and cannot contain numbers.");
            lastName.focus();
            return false;
        }

        if (email.value.trim() === '') {
            alert("Email is required.");
            email.focus();
            return false;
        }

        if (phone.value.trim() === '') {
            alert("Phone number is required.");
            phone.focus();
            return false;
        }

        if (address.value.trim() === '') {
            alert("Mailing address is required.");
            address.focus();
            return false;
        }

        if (amount.value.trim() === '' || isNaN(amount.value) || Number(amount.value) <= 0) {
            alert("A valid donation amount is required.");
            amount.focus();
            return false;
        }

        if (paymentMethod.value === 'Payment Info' || paymentMethod.value.trim() === '') {
            alert("Please select a payment method.");
            paymentMethod.focus();
            return false;
        }

        if (!termsCheck.checked) {
            alert("You must agree to the Terms and Conditions before submitting.");
            termsCheck.focus();
            return false;
        }

        window.location.href = "end.html";
        return false;

        });
        
    });