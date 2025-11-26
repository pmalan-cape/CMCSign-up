console.log('✅ script.js loaded');
const products = [
  { id: 'membership', name: 'Membership', price: 500.00, img: 'assets/membership.png', max: 1 },
  { id: 'shirt', name: 'Club Shirt', price: 200.00, img: 'assets/shirt.png' },
  { id: 'cap', name: 'Cap', price: 150.00, img: 'assets/cap.png' },
  { id: 'race', name: 'Race Entry', price: 100.00, img: 'assets/race.png' },
];

function formatRand(value) {
  return `R ${value.toFixed(2)}`;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="card-content">
        <div class="card-title">${p.name}</div>
        <div class="price">${formatRand(p.price)}</div>
        <div class="quantity-row">
          <label for="qty-${p.id}">Quantity:</label>
          <input type="number" id="qty-${p.id}" min="0" ${p.max ? `max="${p.max}"` : ''} step="1" value="0" />
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function calculateTotal() {
  let total = 0;
  products.forEach(p => {
    const qtyEl = document.getElementById(`qty-${p.id}`);
    const qty = parseInt(qtyEl.value || '0', 10);
    total += qty * p.price;
  });
  return total;
}

function updateSummary() {
  const total = calculateTotal();
  document.getElementById('totalAmount').textContent = formatRand(total);

  const list = document.getElementById('selectedList');
  list.innerHTML = '';
  products.forEach(p => {
    const qty = parseInt(document.getElementById(`qty-${p.id}`).value || '0', 10);
    if (qty > 0) {
      const li = document.createElement('li');
      li.textContent = `${qty} × ${p.name} — ${formatRand(qty * p.price)}`;
      list.appendChild(li);
    }
  });
}

function attachListeners() {
  products.forEach(p => {
    const qtyEl = document.getElementById(`qty-${p.id}`);
    qtyEl.addEventListener('input', updateSummary);
    qtyEl.addEventListener('change', updateSummary);
  });
}

function proceedToPayment() {
   console.log('✅ Proceed button clicked');
  const total = calculateTotal();
  if (total <= 0) {
    alert('Please choose at least one product.');
    return;
  }
  const referenceEl = document.getElementById('reference');
  const reference = referenceEl.value.trim() || 'MembershipBlackFriday';
  const baseUrl = 'https://pay.yoco.com/cape-multisport-club';
  // If Yoco expects cents, change to (total*100).toFixed(0). For now we pass rand with 2 decimals.
  const amount = total.toFixed(2);
  const url = `${baseUrl}?amount=${encodeURIComponent(amount)}&reference=${encodeURIComponent(reference)}`;
  console.log('✅ Redirecting to:', url);
  window.location.href = url;
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready, initializing...');
  renderProducts();
  attachListeners();
  updateSummary();
  
  const btn = document.getElementById('payBtn');
  console.log('✅ Button found?', !!btn);
  btn.addEventListener('click', proceedToPayment);

  document.getElementById('payBtn').addEventListener('click', proceedToPayment);
});
