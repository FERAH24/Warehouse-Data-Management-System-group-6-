const products = [
  { sku: 'SF-191-A', name: 'Rice Bags (50kg, Jute Sack)',     supplier: 'Stem Nigeria',  zone: 'A', qty: 3869, cap: 76, status: 'In Stock',     cost: 850,    updated: 'Today, 07:45 AM' },
  { sku: 'SF-204-B', name: 'PVC Pipe Fittings 2" (Box)',      supplier: 'BioSmart',       zone: 'B', qty: 280,  cap: 38, status: 'Low Stock',    cost: 4200,   updated: 'Yesterday' },
  { sku: 'SF-115-C', name: 'Chest Freezer 200L (Units)',      supplier: 'Steam Nigeria',  zone: 'C', qty: 64,   cap: 41, status: 'In Stock',     cost: 185000, updated: '2 days ago' },
  { sku: 'SF-422-D', name: 'Generator 2.5KVA (Sumec Firman)', supplier: 'Power Nigeria',  zone: 'B', qty: 8,    cap: 6,  status: 'Out of Stock', cost: 215000, updated: '3 days ago' },
  { sku: 'SF-533-A', name: 'Cement Bags 50kg (Dangote)',      supplier: 'Dangote Intl',   zone: 'A', qty: 5359, cap: 89, status: 'In Stock',     cost: 4800,   updated: 'Today' },
  { sku: 'SF-418-B', name: 'Laptop HP ProBook 455 G9',        supplier: 'BioSystems',     zone: 'B', qty: 63,   cap: 51, status: 'In Stock',     cost: 520000, updated: 'Yesterday' },
  { sku: 'SF-729-B', name: 'GI Flanged Coupling 6" (Pcs)',    supplier: 'Steel Steel',    zone: 'B', qty: 73,   cap: 22, status: 'Low Stock',    cost: 12500,  updated: '4 days ago' },
];

const categories = [
  { label: 'Construction Materials', count: 6948, color: '#4f6ef7' },
  { label: 'Agricultural Goods',     count: 4394, color: '#06b6d4' },
  { label: 'Energy & Utilities',     count: 4348, color: '#22c55e' },
  { label: 'Industrial Hardware',    count: 4234, color: '#f97316' },
  { label: 'Power Equipment',        count: 3014, color: '#ef4444' },
  { label: 'Electronics',            count: 1178, color: '#a855f7' },
  { label: 'IT Equipment',           count: 790,  color: '#ec4899' },
];

const lowStockAlerts = [
  { name: 'Generator 2.5KVA',       sku: 'SF-422-D', qty: 8,   color: '#ef4444' },
  { name: 'GI Flanged Coupling 4"', sku: 'SF-730-B', qty: 75,  color: '#f97316' },
  { name: 'PVC Pipe Fittings 2"',   sku: 'SF-204-B', qty: 280, color: '#f97316' },
  { name: 'HP ProBook 450 G9',      sku: 'SF-418-B', qty: 63,  color: '#4f6ef7' },
  { name: 'Chest Freezer 200L',     sku: 'SF-115-C', qty: 94,  color: '#f97316' },
];

const reorderItems = [
  { name: 'Generator 3.4KVA',       qty: '58',     unit: 'units' },
  { name: 'GI Flanged Coupling 4"', qty: '168',    unit: 'pcs'   },
  { name: 'PVC Pipe Fittings 2"',   qty: '1,000+', unit: 'boxes' },
];

function getStatusBadge(status) {
  if (status === 'In Stock')     return '<span class="badge badge-green">'  + status + '</span>';
  if (status === 'Low Stock')    return '<span class="badge badge-orange">' + status + '</span>';
  if (status === 'Out of Stock') return '<span class="badge badge-red">'    + status + '</span>';
  return '<span class="badge">' + status + '</span>';
}

function capClass(pct) {
  if (pct <= 20) return 'critical';
  if (pct <= 40) return 'low';
  return '';
}

function renderTable(data) {
  var tbody = document.getElementById('table-body');
  var showingText = document.getElementById('showing-text');

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:28px;color:#7b8db0">No products found.</td></tr>';
    showingText.textContent = 'No products found';
    return;
  }

  var html = '';
  data.forEach(function(p) {
    html += '<tr onclick="openDetail(\'' + p.sku + '\')">';
    html += '<td><span class="sku">' + p.sku + '</span></td>';
    html += '<td><div class="product-name">' + p.name + '</div><div class="product-supplier">' + p.supplier + '</div></td>';
    html += '<td style="color:#7b8db0;font-size:12px">' + p.supplier + '</td>';
    html += '<td><span class="zone-tag">Zone ' + p.zone + '</span></td>';
    html += '<td style="font-weight:600;font-family:monospace">' + p.qty.toLocaleString() + '</td>';
    html += '<td><div class="cap-wrap"><div class="cap-bar"><div class="cap-fill ' + capClass(p.cap) + '" style="width:' + p.cap + '%"></div></div><div class="cap-pct">' + p.cap + '%</div></div></td>';
    html += '<td>' + getStatusBadge(p.status) + '</td>';
    html += '</tr>';
  });

  tbody.innerHTML = html;
  showingText.textContent = 'Showing 1–' + data.length + ' of 4,821 products';
}

function renderChart() {
  var container = document.getElementById('chart-rows');
  var max = categories[0].count;
  var html = '';

  categories.forEach(function(cat) {
    var widthPct = (cat.count / max * 100).toFixed(1);
    html += '<div class="chart-row">';
    html += '<span class="chart-label">' + cat.label + '</span>';
    html += '<div class="chart-track"><div class="chart-fill" style="width:' + widthPct + '%;background:' + cat.color + '"></div></div>';
    html += '<span class="chart-count">' + cat.count.toLocaleString() + '</span>';
    html += '</div>';
  });

  container.innerHTML = html;
}

function renderAlerts() {
  var lowHtml = '';
  lowStockAlerts.forEach(function(item) {
    lowHtml += '<div class="alert-item">';
    lowHtml += '<div><p class="alert-name">' + item.name + '</p><p class="alert-sku">' + item.sku + '</p></div>';
    lowHtml += '<span class="alert-qty" style="color:' + item.color + '">' + item.qty + '</span>';
    lowHtml += '</div>';
  });
  document.getElementById('low-alerts').innerHTML = lowHtml;

  var reorderHtml = '';
  reorderItems.forEach(function(item) {
    reorderHtml += '<div class="alert-item">';
    reorderHtml += '<div><p class="alert-name">' + item.name + '</p><p class="alert-sku">Reorder suggested</p></div>';
    reorderHtml += '<div style="text-align:right"><p class="alert-qty" style="color:#f97316">' + item.qty + '</p><p class="alert-unit">' + item.unit + '</p></div>';
    reorderHtml += '</div>';
  });
  document.getElementById('reorder-alerts').innerHTML = reorderHtml;
}

function openDetail(sku) {
  var product = products.find(function(p) { return p.sku === sku; });
  if (!product) return;

  var html = '';
  html += '<p style="font-size:14px;font-weight:700;margin-bottom:4px">' + product.name + '</p>';
  html += '<p style="font-size:12px;color:#7b8db0;margin-bottom:10px">' + product.sku + ' &middot; Zone ' + product.zone + '</p>';
  html += getStatusBadge(product.status);
  html += '<div class="detail-stats">';
  html += '<div class="d-stat"><div class="d-stat-label">Qty Available</div><div class="d-stat-value">' + product.qty.toLocaleString() + '</div><div class="d-stat-sub">units</div></div>';
  html += '<div class="d-stat"><div class="d-stat-label">Capacity Used</div><div class="d-stat-value">' + product.cap + '%</div><div class="d-stat-sub">of storage</div></div>';
  html += '</div>';
  html += '<div class="detail-cap-label"><span>Warehouse capacity</span><span>' + product.cap + '%</span></div>';
  html += '<div class="detail-cap-track"><div class="detail-cap-fill" style="width:' + product.cap + '%"></div></div>';
  html += '<div class="detail-row"><span class="lbl">Supplier</span><span class="val">' + product.supplier + '</span></div>';
  html += '<div class="detail-row"><span class="lbl">Unit Cost</span><span class="val">&#8358;' + product.cost.toLocaleString() + '</span></div>';
  html += '<div class="detail-row"><span class="lbl">Last Updated</span><span class="val">' + product.updated + '</span></div>';

  document.getElementById('detail-body').innerHTML = html;
  document.getElementById('detail-panel').classList.add('open');
  document.getElementById('overlay').classList.add('open');

  document.querySelectorAll('#table-body tr').forEach(function(row) {
    row.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}

function closeDetail() {
  document.getElementById('detail-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.querySelectorAll('#table-body tr').forEach(function(row) {
    row.classList.remove('selected');
  });
}

document.getElementById('search-input').addEventListener('input', function() {
  var q = this.value.toLowerCase();
  var filtered = products.filter(function(p) {
    return p.name.toLowerCase().includes(q) ||
           p.sku.toLowerCase().includes(q)  ||
           p.supplier.toLowerCase().includes(q);
  });
  renderTable(filtered);
});

function filterByTab(btn, type) {
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  if (type === 'all')      renderTable(products);
  if (type === 'low')      renderTable(products.filter(function(p) { return p.status === 'Low Stock'; }));
  if (type === 'critical') renderTable(products.filter(function(p) { return p.status === 'Out of Stock'; }));
}

function filterByZone(zone) {
  if (zone === 'All Zones') { renderTable(products); return; }
  renderTable(products.filter(function(p) { return 'Zone ' + p.zone === zone; }));
}

function filterByStatus(status) {
  if (status === 'All Status') { renderTable(products); return; }
  renderTable(products.filter(function(p) { return p.status === status; }));
}

function setNav(e, el) {
  e.preventDefault();
  document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
  el.classList.add('active');
}

renderTable(products);
renderChart();
renderAlerts();


















// const products = [
//   { sku: 'SF-191-A', name: 'Rice Bags (50kg, Jute Sack)',     supplier: 'Stem Nigeria',  zone: 'A', qty: 3869, cap: 76, status: 'In Stock',     cost: 850,    updated: 'Today, 07:45 AM' },
//   { sku: 'SF-204-B', name: 'PVC Pipe Fittings 2" (Box)',      supplier: 'BioSmart',       zone: 'B', qty: 280,  cap: 38, status: 'Low Stock',    cost: 4200,   updated: 'Yesterday' },
//   { sku: 'SF-115-C', name: 'Chest Freezer 200L (Units)',      supplier: 'Steam Nigeria',  zone: 'C', qty: 64,   cap: 41, status: 'In Stock',     cost: 185000, updated: '2 days ago' },
//   { sku: 'SF-422-D', name: 'Generator 2.5KVA (Sumec Firman)', supplier: 'Power Nigeria',  zone: 'B', qty: 8,    cap: 6,  status: 'Out of Stock', cost: 215000, updated: '3 days ago' },
//   { sku: 'SF-533-A', name: 'Cement Bags 50kg (Dangote)',      supplier: 'Dangote Intl',   zone: 'A', qty: 5359, cap: 89, status: 'In Stock',     cost: 4800,   updated: 'Today' },
//   { sku: 'SF-418-B', name: 'Laptop HP ProBook 455 G9',        supplier: 'BioSystems',     zone: 'B', qty: 63,   cap: 51, status: 'In Stock',     cost: 520000, updated: 'Yesterday' },
//   { sku: 'SF-729-B', name: 'GI Flanged Coupling 6" (Pcs)',    supplier: 'Steel Steel',    zone: 'B', qty: 73,   cap: 22, status: 'Low Stock',    cost: 12500,  updated: '4 days ago' },
// ];

// const categories = [
//   { label: 'Construction Materials', count: 6948, color: '#4f6ef7' },
//   { label: 'Agricultural Goods',     count: 4394, color: '#06b6d4' },
//   { label: 'Energy & Utilities',     count: 4348, color: '#22c55e' },
//   { label: 'Industrial Hardware',    count: 4234, color: '#f97316' },
//   { label: 'Power Equipment',        count: 3014, color: '#ef4444' },
//   { label: 'Electronics',            count: 1178, color: '#a855f7' },
//   { label: 'IT Equipment',           count: 790,  color: '#ec4899' },
// ];

// const lowStockAlerts = [
//   { name: 'Generator 2.5KVA',       sku: 'SF-422-D', qty: 8,   color: '#ef4444' },
//   { name: 'GI Flanged Coupling 4"', sku: 'SF-730-B', qty: 75,  color: '#f97316' },
//   { name: 'PVC Pipe Fittings 2"',   sku: 'SF-204-B', qty: 280, color: '#f97316' },
//   { name: 'HP ProBook 450 G9',      sku: 'SF-418-B', qty: 63,  color: '#4f6ef7' },
//   { name: 'Chest Freezer 200L',     sku: 'SF-115-C', qty: 94,  color: '#f97316' },
// ];

// const reorderItems = [
//   { name: 'Generator 3.4KVA',       qty: '58',     unit: 'units' },
//   { name: 'GI Flanged Coupling 4"', qty: '168',    unit: 'pcs'   },
//   { name: 'PVC Pipe Fittings 2"',   qty: '1,000+', unit: 'boxes' },
// ];

// // helper functions

// function getStatusBadge(status) {
//   if (status === 'In Stock')     return '<span class="badge badge-green">'  + status + '</span>';
//   if (status === 'Low Stock')    return '<span class="badge badge-orange">' + status + '</span>';
//   if (status === 'Out of Stock') return '<span class="badge badge-red">'    + status + '</span>';
//   return '<span class="badge">' + status + '</span>';
// }

// function capClass(pct) {
//   if (pct <= 20) return 'critical';
//   if (pct <= 40) return 'low';
//   return '';
// }

// // table

// function renderTable(data) {
//   var tbody       = document.getElementById('table-body');
//   var showingText = document.getElementById('showing-text');

//   if (data.length === 0) {
//     tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:30px;color:#7b8db0">No products found.</td></tr>';
//     showingText.textContent = 'No products found';
//     return;
//   }

//   var html = '';

//   data.forEach(function(p) {
//     html += '<tr onclick="openDetail(\'' + p.sku + '\')">';
//     html +=   '<td><span class="sku">' + p.sku + '</span></td>';
//     html +=   '<td>';
//     html +=     '<div class="product-name">' + p.name + '</div>';
//     html +=     '<div class="product-supplier">' + p.supplier + '</div>';
//     html +=   '</td>';
//     html +=   '<td style="color:#7b8db0;font-size:12px">' + p.supplier + '</td>';
//     html +=   '<td><span class="zone-tag">Zone ' + p.zone + '</span></td>';
//     html +=   '<td style="font-weight:600;font-family:monospace">' + p.qty.toLocaleString() + '</td>';
//     html +=   '<td>';
//     html +=     '<div class="cap-wrap">';
//     html +=       '<div class="cap-bar">';
//     html +=         '<div class="cap-fill ' + capClass(p.cap) + '" style="width:' + p.cap + '%"></div>';
//     html +=       '</div>';
//     html +=       '<div class="cap-pct">' + p.cap + '%</div>';
//     html +=     '</div>';
//     html +=   '</td>';
//     html +=   '<td>' + getStatusBadge(p.status) + '</td>';
//     html += '</tr>';
//   });

//   tbody.innerHTML = html;
//   showingText.textContent = 'Showing 1–' + data.length + ' of 4,821 products';
// }


// function renderChart() {
//   var container = document.getElementById('chart-rows');
//   var max       = categories[0].count;
//   var html      = '';

//   categories.forEach(function(cat) {
//     var widthPct = (cat.count / max * 100).toFixed(1);
//     html += '<div class="chart-row">';
//     html +=   '<span class="chart-label">' + cat.label + '</span>';
//     html +=   '<div class="chart-track">';
//     html +=     '<div class="chart-fill" style="width:' + widthPct + '%;background:' + cat.color + '"></div>';
//     html +=   '</div>';
//     html +=   '<span class="chart-count">' + cat.count.toLocaleString() + '</span>';
//     html += '</div>';
//   });

//   container.innerHTML = html;
// }

// function renderAlerts() {
//   var lowHtml = '';
//   lowStockAlerts.forEach(function(item) {
//     lowHtml += '<div class="alert-item">';
//     lowHtml +=   '<div>';
//     lowHtml +=     '<p class="alert-name">' + item.name + '</p>';
//     lowHtml +=     '<p class="alert-sku">'  + item.sku  + '</p>';
//     lowHtml +=   '</div>';
//     lowHtml +=   '<span class="alert-qty" style="color:' + item.color + '">' + item.qty + '</span>';
//     lowHtml += '</div>';
//   });
//   document.getElementById('low-alerts').innerHTML = lowHtml;

//   var reorderHtml = '';
//   reorderItems.forEach(function(item) {
//     reorderHtml += '<div class="alert-item">';
//     reorderHtml +=   '<div>';
//     reorderHtml +=     '<p class="alert-name">' + item.name + '</p>';
//     reorderHtml +=     '<p class="alert-sku">Reorder suggested</p>';
//     reorderHtml +=   '</div>';
//     reorderHtml +=   '<div style="text-align:right">';
//     reorderHtml +=     '<p class="alert-qty" style="color:#f97316">' + item.qty + '</p>';
//     reorderHtml +=     '<p class="alert-unit">' + item.unit + '</p>';
//     reorderHtml +=   '</div>';
//     reorderHtml += '</div>';
//   });
//   document.getElementById('reorder-alerts').innerHTML = reorderHtml;
// }

// function openDetail(sku) {
//   var product = products.find(function(p) { return p.sku === sku; });
//   if (!product) return;

//   var html = '';
//   html += '<p style="font-size:14px;font-weight:700;margin-bottom:4px">' + product.name + '</p>';
//   html += '<p style="font-size:12px;color:#7b8db0;margin-bottom:10px">' + product.sku + ' &middot; Zone ' + product.zone + '</p>';
//   html += getStatusBadge(product.status);

//   html += '<div class="detail-stats">';
//   html +=   '<div class="d-stat">';
//   html +=     '<div class="d-stat-label">Qty Available</div>';
//   html +=     '<div class="d-stat-value">' + product.qty.toLocaleString() + '</div>';
//   html +=     '<div class="d-stat-sub">units</div>';
//   html +=   '</div>';
//   html +=   '<div class="d-stat">';
//   html +=     '<div class="d-stat-label">Capacity Used</div>';
//   html +=     '<div class="d-stat-value">' + product.cap + '%</div>';
//   html +=     '<div class="d-stat-sub">of storage</div>';
//   html +=   '</div>';
//   html += '</div>';

//   html += '<div class="detail-cap-label">';
//   html +=   '<span>Warehouse capacity</span>';
//   html +=   '<span>' + product.cap + '%</span>';
//   html += '</div>';
//   html += '<div class="detail-cap-track">';
//   html +=   '<div class="detail-cap-fill" style="width:' + product.cap + '%"></div>';
//   html += '</div>';

//   html += '<div class="detail-row"><span class="lbl">Supplier</span><span class="val">' + product.supplier + '</span></div>';
//   html += '<div class="detail-row"><span class="lbl">Unit Cost</span><span class="val">&#8358;' + product.cost.toLocaleString() + '</span></div>';
//   html += '<div class="detail-row"><span class="lbl">Last Updated</span><span class="val">' + product.updated + '</span></div>';

//   document.getElementById('detail-body').innerHTML = html;
//   document.getElementById('detail-panel').classList.add('open');
//   document.getElementById('overlay').classList.add('open');
// }

// function closeDetail() {
//   document.getElementById('detail-panel').classList.remove('open');
//   document.getElementById('overlay').classList.remove('open');
//   document.querySelectorAll('#table-body tr').forEach(function(row) {
//     row.classList.remove('selected');
//   });
// }
// document.getElementById('search-input').addEventListener('input', function() {
//   var q = this.value.toLowerCase();
//   var filtered = products.filter(function(p) {
//     return p.name.toLowerCase().includes(q)     ||
//            p.sku.toLowerCase().includes(q)      ||
//            p.supplier.toLowerCase().includes(q);
//   });
//   renderTable(filtered);
// });

// function filterByTab(btn, type) {
//   document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
//   btn.classList.add('active');
//   if (type === 'all')      renderTable(products);
//   if (type === 'low')      renderTable(products.filter(function(p) { return p.status === 'Low Stock'; }));
//   if (type === 'critical') renderTable(products.filter(function(p) { return p.status === 'Out of Stock'; }));
// }

// function filterByZone(zone) {
//   if (zone === 'All Zones') { renderTable(products); return; }
//   var letter = zone.replace('Zone ', '');
//   renderTable(products.filter(function(p) { return p.zone === letter; }));
// }

// function filterByStatus(status) {
//   if (status === 'All Status') { renderTable(products); return; }
//   renderTable(products.filter(function(p) { return p.status === status; }));
// }

// function setNav(e, el) {
//   e.preventDefault();
//   document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
//   el.classList.add('active');
// }

// renderTable(products);
// renderChart();
// renderAlerts();