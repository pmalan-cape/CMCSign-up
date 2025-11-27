
console.log('✅ script.js loaded');

const products = [
  { id: 'membership', name: 'Main Membership', price: 360.00, img: 'assets/membership.png', max: 1 },
  { id: 'shirt',      name: 'Fam, Junior, Pensioner', price: 245.00, img: 'assets/shirt.png' },
  { id: 'cap',        name: 'Up Country',        price: 180.00, img: 'assets/cap.png' },
  { id: 'race',       name: 'ASA', price: 190.00, img: 'assets/race.png' },
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
      assets/${p.id}.png
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
    const qty = parseInt(qtyEl?.value || '0', 10);
    total += qty * p.price;
  });
  return total;
}

function updateSummary() {
  const total = calculateTotal();
  console.log('✅ Updating summary, total:', total);
  const totalEl = document.getElementById('totalAmount');
  if (totalEl) totalEl.textContent = formatRand(total);
}

function attachListeners() {
  console.log('✅ Attaching listeners...');
  products.forEach(p => {
    const qtyEl = document.getElementById(`qty-${p.id}`);
    if (qtyEl) {
      qtyEl.addEventListener('input', updateSummary);
      qtyEl.addEventListener('change', updateSummary);
    } else {
      console.warn(`⚠️ Quantity input for ${p.id} not found yet`);
    }
  });
}

function proceedToPayment() {
  console.log('✅ Proceed button clicked');
  const total = calculateTotal();
  console.log('✅ Calculated total:', total);

  if (total <= 0) {
    alert('Please choose at least one product.');
    return;
  }

  const referenceEl = document.getElementById('reference');
  const reference = referenceEl?.value.trim() || 'MembershipBlackFriday';
  const baseUrl = 'https://pay.yoco.com/cape-multisport-club';

  // If Yoco needs cents: const amount = (total * 100).toFixed(0);
  const amount = total.toFixed(2);
  const url = `${baseUrl}?amount=${encodeURIComponent(amount)}&reference=${encodeURIComponent(reference)}`;
  console.log('✅ Redirecting to:', url);

  // Use assign() in case CSP dislikes location.href
  window.location.assign(url);
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('✅ DOM ready, initializing...');
    renderProducts();
    attachListeners();
    updateSummary();

    const btn = document.getElementById('payBtn');
    console.log('✅ Button found?', !!btn);
    if (btn) btn.addEventListener('click', proceedToPayment);
  } catch (err) {
    console.error('❌ Initialization error:', err);
  }
});
