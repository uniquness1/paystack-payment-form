let itemCountSelect = document.getElementById('item-count');
itemCountSelect.addEventListener("change", updateTotalAmount);

function updateTotalAmount() {
    let selectedCount = parseInt(itemCountSelect.value);
    let fixedAmount = 100000;
    let totalAmount = fixedAmount * selectedCount;

    document.getElementById("total").textContent = totalAmount.toFixed(2);
    document.getElementById("amount").value = totalAmount.toFixed(2);
}
updateTotalAmount();
let paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack(e) {
    e.preventDefault();
    let email = document.getElementById("email-address").value;
    let totalAmount = Math.round(parseFloat(document.getElementById("amount").value) * 100);
    let firstname = document.getElementById("first-name").value;
    let lastname = document.getElementById("last-name").value;
    let phone = document.getElementById("phone-number").value
    if (email && firstname && lastname && phone && !isNaN(totalAmount)) {
        let handler = PaystackPop.setup({
            key: 'PAYSTACK_API_KEY',
            email: email,
            amount: totalAmount,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            ref: '' + Math.floor((Math.random() * 1000000000) + 1),
            onClose: function () {
                alert('Window closed.');
            },
            callback: function (response) {
                let message = 'Payment complete! Reference: ' + response.reference;
                alert(message);
                document.getElementById("first-name").value = "";
                document.getElementById("last-name").value = "";
                document.getElementById("email-address").value = "";
                document.getElementById("phone-number").value = "";
                document.getElementById("item-count").value = "1";
                document.getElementById("total").textContent = "";
            }
        });
        handler.openIframe();
    } else {
        alert('All fields are required');
    }
}