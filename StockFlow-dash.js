// ===== DASHBOARD PAGE JAVASCRIPT =====

// ===== DUMMY / FALLBACK DATA =====
var DUMMY_DATA = {
  cards: { totalSKUs: 124, totalUnits: 8450, lowStock: 18, critical: 5 },
  inventorySummary: [
    { zone: "Zone A", totalStock: 2100, capacity: "72%", status: "In Stock" },
    { zone: "Zone B", totalStock: 1540, capacity: "53%", status: "In Stock" },
    { zone: "Zone C", totalStock:  480, capacity: "18%", status: "Low Stock" },
    { zone: "Zone D", totalStock: 3200, capacity: "85%", status: "In Stock" },
    { zone: "Zone E", totalStock:  130, capacity:  "9%", status: "Low Stock" },
  ],
  chart: {
    incoming: [
      { month: "2025-01-01", totalIncoming: 320 },
      { month: "2025-02-01", totalIncoming: 410 },
      { month: "2025-03-01", totalIncoming: 290 },
      { month: "2025-04-01", totalIncoming: 530 },
      { month: "2025-05-01", totalIncoming: 480 },
      { month: "2025-06-01", totalIncoming: 610 },
    ],
    outgoing: [
      { month: "2025-01-01", totalOutgoing: 210 },
      { month: "2025-02-01", totalOutgoing: 380 },
      { month: "2025-03-01", totalOutgoing: 250 },
      { month: "2025-04-01", totalOutgoing: 490 },
      { month: "2025-05-01", totalOutgoing: 320 },
      { month: "2025-06-01", totalOutgoing: 570 },
    ],
  },
};

// ===== 1. FETCH REPORT DATA AND POPULATE DASHBOARD =====

var ZONE_COLORS = {
  "Zone A": "#22c55e",
  "Zone B": "#2563eb",
  "Zone C": "#ef4444",
  "Zone D": "#3b82f6",
  "Zone E": "#8b5cf6",
};

var token = localStorage.getItem("token");

fetch("https://stock-flow-k866.onrender.com/api/reports", {
  credentials: "include",
  headers: { Authorization: "Bearer " + token },
})
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    populateDashboard(data);
  })
  .catch(function () {
    // Fallback — show dummy data when API is unreachable
    populateDashboard(DUMMY_DATA);
  });

function populateDashboard(data) {
    // --- Stat Cards ---
    countUp("count1", data.cards.totalSKUs);
    countUp("count2", data.cards.totalUnits);
    countUp("count3", data.cards.lowStock);
    countUp("count4", data.cards.critical);

    // --- Inventory Table ---
    var tbody = document.getElementById("inv-tbody");
    tbody.innerHTML = "";

    data.inventorySummary.forEach(function (item) {
      var capNum = parseInt(item.capacity) || 0;
      var statusClass =
        item.status === "In Stock"
          ? "in-stock"
          : item.status === "Low Stock"
            ? "low-stock"
            : "out-stock";
      var fillColor = capNum > 60 ? "green" : capNum > 20 ? "blue" : "red";

      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td><span class="zone-pill">' +
        item.zone +
        "</span></td>" +
        "<td>" +
        item.totalStock.toLocaleString() +
        "</td>" +
        '<td><div class="cap-bar-wrap"><div class="cap-bar"><div class="cap-fill ' +
        fillColor +
        '" style="width: ' +
        capNum +
        '%"></div></div><span class="cap-pct">' +
        item.capacity +
        "</span></div></td>" +
        '<td><span class="status-pill ' +
        statusClass +
        '">' +
        item.status +
        "</span></td>";
      tbody.appendChild(tr);
    });

    // --- Zone Capacity ---
    var zoneList = document.getElementById("zone-list");
    zoneList.innerHTML = "";

    data.inventorySummary.forEach(function (item) {
      var capNum = parseInt(item.capacity) || 0;
      var color = ZONE_COLORS[item.zone] || "#6b7280";

      var div = document.createElement("div");
      div.innerHTML =
        '<div class="zone-row-top">' +
        '<div class="zone-dot" style="background: ' +
        color +
        ';"></div>' +
        '<span class="zone-name">' +
        item.zone +
        "</span>" +
        '<span class="zone-pct" style="color: ' +
        color +
        ';">' +
        item.capacity +
        "</span>" +
        "</div>" +
        '<div class="zone-slots">' +
        item.totalStock.toLocaleString() +
        " units</div>" +
        '<div class="zone-bar"><div class="zone-bar-fill" style="width: ' +
        capNum +
        "%; background: " +
        color +
        ';"></div></div>';
      zoneList.appendChild(div);
    });

    // --- Stock Movement Chart ---
    buildChart(data.chart);
}

// ===== 2. BUILD THE CHART BARS =====

function buildChart(chartData) {
  var barsContainer = document.getElementById("chart-bars");
  var labelsContainer = document.getElementById("chart-labels");
  barsContainer.innerHTML = "";
  labelsContainer.innerHTML = "";

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Build lookup maps: monthIndex -> value
  var inMap = {};
  var outMap = {};
  var allMonths = {};

  chartData.incoming.forEach(function (d) {
    var m = new Date(d.month).getMonth();
    inMap[m] = Number(d.totalIncoming);
    allMonths[m] = true;
  });
  chartData.outgoing.forEach(function (d) {
    var m = new Date(d.month).getMonth();
    outMap[m] = Number(d.totalOutgoing);
    allMonths[m] = true;
  });

  var keys = Object.keys(allMonths)
    .map(Number)
    .sort(function (a, b) {
      return a - b;
    });

  // Find max value for scaling
  var maxVal = 1;
  keys.forEach(function (m) {
    var inc = inMap[m] || 0;
    var out = outMap[m] || 0;
    if (inc > maxVal) maxVal = inc;
    if (out > maxVal) maxVal = out;
  });

  keys.forEach(function (m) {
    var incPct = Math.round(((inMap[m] || 0) / maxVal) * 100);
    var outPct = Math.round(((outMap[m] || 0) / maxVal) * 100);

    var col = document.createElement("div");
    col.className = "chart-col";

    var barIn = document.createElement("div");
    barIn.className = "bar incoming";
    barIn.style.height = incPct + "%";

    var barOut = document.createElement("div");
    barOut.className = "bar outgoing";
    barOut.style.height = outPct + "%";

    col.appendChild(barIn);
    col.appendChild(barOut);
    barsContainer.appendChild(col);

    var label = document.createElement("div");
    label.className = "chart-day";
    label.textContent = months[m];
    labelsContainer.appendChild(label);
  });
}

// ===== 2. ANIMATE THE STAT NUMBERS =====

function countUp(elementId, target) {
  var el = document.getElementById(elementId);
  var current = 0;
  var step = Math.ceil(target / 40); // how much to add each time

  var timer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString();
  }, 30);
}

// ===== 3. SIDEBAR ACTIVE LINK =====

var menuLinks = document.querySelectorAll(".sidebar-menu li");

for (var j = 0; j < menuLinks.length; j++) {
  menuLinks[j].addEventListener("click", function () {
    // Remove active from all
    for (var k = 0; k < menuLinks.length; k++) {
      menuLinks[k].classList.remove("active");
    }
    // Add active to clicked one
    this.classList.add("active");
  });
}

// ===== 4. TOAST FUNCTION =====

function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

// ===== 5. BUTTON CLICKS =====

document.getElementById("search-btn").addEventListener("click", function () {
  showToast("Search feature coming soon!");
});

document.getElementById("bell-btn").addEventListener("click", function () {
  showToast("You have 3 new notifications.");
});

document.getElementById("quick-btn").addEventListener("click", function () {
  showToast("Quick Actions coming soon!");
});

document.getElementById("shipment-btn").addEventListener("click", function () {
  showToast("New Shipment form coming soon!");
});

document.getElementById("export-btn").addEventListener("click", function () {
  showToast("Exporting data...");
});

document.getElementById("view-all-btn").addEventListener("click", function () {
  showToast("Loading full inventory...");
});

document.getElementById("map-btn").addEventListener("click", function () {
  showToast("Map view coming soon!");
});

document.getElementById("activity-btn").addEventListener("click", function () {
  showToast("Loading full activity log...");
});

// ===== 6. PERIOD BUTTON (chart) =====

var periods = ["This Week", "This Month", "Last 30 Days", "This Year"];
var currentPeriod = 0;

document.getElementById("period-btn").addEventListener("click", function () {
  currentPeriod = currentPeriod + 1;
  if (currentPeriod >= periods.length) {
    currentPeriod = 0;
  }
  document.getElementById("period-text").textContent = periods[currentPeriod];
  showToast("Showing: " + periods[currentPeriod]);
});

// ===== 7. TABLE ROW CLICK =====

var tableRows = document.querySelectorAll(".inv-table tbody tr");

for (var r = 0; r < tableRows.length; r++) {
  tableRows[r].addEventListener("click", function () {
    var productName = this.cells[1].textContent;
    showToast("Viewing: " + productName);
  });
}
