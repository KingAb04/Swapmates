 function openModal() {
    document.getElementById('buy-token-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('buy-token-modal').classList.add('hidden');
}

function togglePaymentFields() {
    const paymentMethod = document.getElementById('payment-method').value;
    document.getElementById('gcash-fields').classList.toggle('hidden', paymentMethod !== 'gcash');
    document.getElementById('credit-card-fields').classList.toggle('hidden', paymentMethod !== 'credit-card');
}

function purchaseTokens() {
    const amount = document.getElementById('token-amount').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (amount > 0) {
        // Handle the purchase logic here (e.g., API call to process payment)
        alert(`Purchased ${amount} tokens via ${paymentMethod}.`);
        closeModal();
    } else {
        alert('Please enter a valid amount of tokens.');
    }
}
document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('search-results');
    
    // For demonstration, simply display the search query
    resultsDiv.innerHTML = `<p>Searching for: <strong>${query}</strong></p>`;
    
    // Here you could implement actual search logic against your data
});
