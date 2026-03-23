// ===== DASHBOARD PAGE JAVASCRIPT =====


// ===== 1. BUILD THE CHART BARS =====

var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

var data = [
  { incoming: 68, outgoing: 42 },
  { incoming: 52, outgoing: 58 },
  { incoming: 78, outgoing: 48 },
  { incoming: 63, outgoing: 72 },
  { incoming: 88, outgoing: 52 },
  { incoming: 47, outgoing: 38 },
  { incoming: 73, outgoing: 62 }
];

var barsContainer  = document.getElementById('chart-bars');
var labelsContainer = document.getElementById('chart-labels');

for (var i = 0; i < days.length; i++) {

  // Create a column div for each day
  var col = document.createElement('div');
  col.className = 'chart-col';

  // Incoming bar
  var barIn = document.createElement('div');
  barIn.className = 'bar incoming';
  barIn.style.height = data[i].incoming + '%';

  // Outgoing bar
  var barOut = document.createElement('div');
  barOut.className = 'bar outgoing';
  barOut.style.height = data[i].outgoing + '%';

  col.appendChild(barIn);
  col.appendChild(barOut);
  barsContainer.appendChild(col);

  // Create label for each day
  var label = document.createElement('div');
  label.className = 'chart-day';
  label.textContent = days[i];
  labelsContainer.appendChild(label);
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

countUp('count1', 4821);
countUp('count2', 128940);
countUp('count3', 12);
countUp('count4', 34);


// ===== 3. SIDEBAR ACTIVE LINK =====

var menuLinks = document.querySelectorAll('.sidebar-menu li');

for (var j = 0; j < menuLinks.length; j++) {
  menuLinks[j].addEventListener('click', function () {
    // Remove active from all
    for (var k = 0; k < menuLinks.length; k++) {
      menuLinks[k].classList.remove('active');
    }
    // Add active to clicked one
    this.classList.add('active');
  });
}


// ===== 4. TOAST FUNCTION =====

function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}


// ===== 5. BUTTON CLICKS =====

document.getElementById('search-btn').addEventListener('click', function () {
  showToast('Search feature coming soon!');
});

document.getElementById('bell-btn').addEventListener('click', function () {
  showToast('You have 3 new notifications.');
});

document.getElementById('quick-btn').addEventListener('click', function () {
  showToast('Quick Actions coming soon!');
});

document.getElementById('shipment-btn').addEventListener('click', function () {
  showToast('New Shipment form coming soon!');
});

document.getElementById('export-btn').addEventListener('click', function () {
  showToast('Exporting data...');
});

document.getElementById('view-all-btn').addEventListener('click', function () {
  showToast('Loading full inventory...');
});

document.getElementById('map-btn').addEventListener('click', function () {
  showToast('Map view coming soon!');
});

document.getElementById('activity-btn').addEventListener('click', function () {
  showToast('Loading full activity log...');
});


// ===== 6. PERIOD BUTTON (chart) =====

var periods = ['This Week', 'This Month', 'Last 30 Days', 'This Year'];
var currentPeriod = 0;

document.getElementById('period-btn').addEventListener('click', function () {
  currentPeriod = currentPeriod + 1;
  if (currentPeriod >= periods.length) {
    currentPeriod = 0;
  }
  document.getElementById('period-text').textContent = periods[currentPeriod];
  showToast('Showing: ' + periods[currentPeriod]);
});


// ===== 7. TABLE ROW CLICK =====

var tableRows = document.querySelectorAll('.inv-table tbody tr');

for (var r = 0; r < tableRows.length; r++) {
  tableRows[r].addEventListener('click', function () {
    var productName = this.cells[1].textContent;
    showToast('Viewing: ' + productName);
  });
}
