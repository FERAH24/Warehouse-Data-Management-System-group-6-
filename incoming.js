const deliveries = [
  {
    product: "Wireless Headphones X200",
    quantity: 120,
    supplier: "TechSolutions Ltd",
    deliveryDate: "2023-03-11",
    status: "approved",
    warehouseLocation: "Zone A - Bay 2",
    refNumber: "A-9 985512 0043",
    notes: "Received in good condition",
  },
  {
    product: "USB-C Hub Pro",
    quantity: 60,
    supplier: "Global Parts Co.",
    deliveryDate: "2023-03-12",
    status: "pending",
    warehouseLocation: "Zone B - Bay 5",
    refNumber: "B-7 552319 1918",
    notes: "",
  },
  {
    product: "Laptop 1500 Aluminum",
    quantity: 200,
    supplier: "SwiftLogistics NTS",
    deliveryDate: "2023-03-23",
    status: "approved",
    warehouseLocation: "Zone C - Bay 9",
    refNumber: "C-3 796128 7865",
    notes: "Urgent delivery",
  },
  {
    product: "Mechanical Keyboard",
    quantity: 18,
    supplier: "TechSolutions Ltd",
    deliveryDate: "2023-03-25",
    status: "awaiting",
    warehouseLocation: "Zone A - Bay 1",
    refNumber: "D-1 985512 0043",
    notes: "Needs quality inspection",
  }
];

const deliveryTbody = document.getElementById('delivery-tbody');
const deliverySearch = document.getElementById('delivery-search');
const filterBtn = document.getElementById('filter-btn');
const deliveryDetail = document.getElementById('delivery-detail');
const form = document.getElementById('incoming-form');
const clearBtn = document.getElementById('clear-btn');

let filteredDeliveries = [...deliveries];
let selectedDeliveryIndex = null;

function formatDate(dStr) {
  const d = new Date(dStr);
  if (isNaN(d)) return dStr;
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderDeliveryTable() {
  deliveryTbody.innerHTML = "";
  filteredDeliveries.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.tabIndex = 0;
    tr.dataset.index = i;

    // Create cells explicitly and add data-label attribute for accessibility & responsive
    const tdProduct = document.createElement('td');
    tdProduct.textContent = item.product;
    tdProduct.setAttribute('data-label', 'Product');

    const tdQuantity = document.createElement('td');
    tdQuantity.textContent = item.quantity;
    tdQuantity.setAttribute('data-label', 'Quantity');

    const tdSupplier = document.createElement('td');
    tdSupplier.textContent = item.supplier;
    tdSupplier.setAttribute('data-label', 'Supplier');

    const tdDeliveryDate = document.createElement('td');
    tdDeliveryDate.textContent = formatDate(item.deliveryDate);
    tdDeliveryDate.setAttribute('data-label', 'Delivery Date');

    const tdStatus = document.createElement('td');
    tdStatus.setAttribute('data-label', 'Status');
    const spanStatus = document.createElement('span');
    spanStatus.textContent = capitalize(item.status);
    spanStatus.classList.add('status-tag');
    if(item.status === 'approved') spanStatus.classList.add('status-approved');
    else if(item.status === 'pending') spanStatus.classList.add('status-pending');
    else if(item.status === 'awaiting') spanStatus.classList.add('status-awaiting');
    tdStatus.appendChild(spanStatus);

    tr.appendChild(tdProduct);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdSupplier);
    tr.appendChild(tdDeliveryDate);
    tr.appendChild(tdStatus);

    tr.addEventListener('click', () => {
      selectedDeliveryIndex = i;
      renderDeliveryDetail(i);
      highlightSelectedRow();
    });

    tr.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        tr.click();
      }
    });

    deliveryTbody.appendChild(tr);
  });

  if (filteredDeliveries.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5;
    td.style.textAlign = 'center';
    td.textContent = "No deliveries match your criteria.";
    tr.appendChild(td);
    deliveryTbody.appendChild(tr);
    deliveryDetail.textContent = "Select a delivery entry to view details.";
  }
  highlightSelectedRow();
}

function highlightSelectedRow() {
  const rows = deliveryTbody.querySelectorAll('tr');
  rows.forEach(row => {
    row.style.backgroundColor = '';
    row.setAttribute('aria-selected', 'false');
  });
  if (selectedDeliveryIndex !== null) {
    const selectedRow = deliveryTbody.querySelector('tr[data-index="${selectedDeliveryIndex}"]');
    if (selectedRow) {
      selectedRow.style.backgroundColor = '#dbeafe';
      selectedRow.setAttribute('aria-selected', 'true');
      selectedRow.focus();
    }
  }
}

function renderDeliveryDetail(index) {
  const item = filteredDeliveries[index];
  if (!item) {
    deliveryDetail.textContent = "Select a delivery entry to view details.";
    return;
  }
  deliveryDetail.innerHTML = `
    <div><strong>Product:</strong> ${item.product}</div>
    <div><strong>Quantity:</strong> ${item.quantity}</div>
    <div><strong>Supplier:</strong> ${item.supplier}</div>
    <div><strong>Delivery Date:</strong> ${formatDate(item.deliveryDate)}</div>
    <div><strong>Status:</strong> ${capitalize(item.status)}</div>
    <div><strong>Warehouse Location:</strong> ${item.warehouseLocation}</div>
    <div><strong>Reference / PO Number:</strong> ${item.refNumber}</div>
    ${item.notes ? <div><strong>Notes:</strong> ${item.notes}</div> : ''}
  `;
}

renderDeliveryTable();

deliverySearch.addEventListener('input', () => {
  const term = deliverySearch.value.trim().toLowerCase();
  filteredDeliveries = deliveries.filter(d =>
    d.product.toLowerCase().includes(term) ||
    d.supplier.toLowerCase().includes(term) ||
    d.refNumber.toLowerCase().includes(term)
  );
  selectedDeliveryIndex = null;
  renderDeliveryTable();
});

filterBtn.addEventListener('click', () => {
  alert('Filter functionality to be implemented.');
});

clearBtn.addEventListener('click', () => {
  form.reset();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const product = form.querySelector("#product-select").value;
  const supplier = form.querySelector("#supplier-input").value.trim();
  const date = form.querySelector("#delivery-date-input").value;
  const quantity = form.querySelector("#quantity-received-input").value;
  const location = form.querySelector("#warehouse-location-input").value.trim();
  const ref = form.querySelector("#reference-input").value.trim();
  const notes = form.querySelector("#notes-input").value.trim();

  if (!product || !supplier || !date || !quantity || !location || !ref) {
    alert("Please complete all required fields.");
    return;
  }

  deliveries.push({
    product,
    quantity: Number(quantity),
    supplier,
    deliveryDate: date,
    status: "pending",
    warehouseLocation: location,
    refNumber: ref,
    notes
  });

  alert("Entry saved successfully!");
  form.reset();
  filteredDeliveries = [...deliveries];
  selectedDeliveryIndex = null;
  renderDeliveryTable();

  // Update summary counts:
  document.getElementById('total-items').textContent = deliveries.length;
  document.getElementById('approved-count').textContent = deliveries.filter(d => d.status === 'approved').length;
  document.getElementById('pending-count').textContent = deliveries.filter(d => d.status === 'pending').length;
});