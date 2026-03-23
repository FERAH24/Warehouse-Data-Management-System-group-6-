// ========== TAB SWITCHING ==========
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ========== SIDEBAR NAV ==========
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ========== PAGINATION ==========
const pageBtns = document.querySelectorAll('.page-btn');
pageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pageBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ========== SEARCH FOCUS ==========
const searchBox = document.querySelector('.search-box');
if (searchBox) {
  searchBox.addEventListener('click', () => {
    searchBox.style.borderColor = '#3b6ef8';
    searchBox.style.boxShadow = '0 0 0 2px rgba(59,110,248,0.12)';
  });
  document.addEventListener('click', e => {
    if (!searchBox.contains(e.target)) {
      searchBox.style.borderColor = '';
      searchBox.style.boxShadow = '';
    }
  });
}

// ========== EXPORT BUTTON HOVER ==========
const exportBtns = document.querySelectorAll('.btn-export');
exportBtns.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.borderColor = '#3b6ef8';
    btn.style.color = '#3b6ef8';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.borderColor = '';
    btn.style.color = '';
  });
});

// ========== TABLE ROW HIGHLIGHT ==========
const tableRows = document.querySelectorAll('table tbody tr');
tableRows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.background = '#f5f8ff';
    row.style.cursor = 'pointer';
  });
  row.addEventListener('mouseleave', () => {
    row.style.background = '';
  });
});