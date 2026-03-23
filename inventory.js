const rowsPerPage = 3;
let currentPage = 1;

// displaying Table page
function displayTablePage(page) {
    const table = document.getElementsByClassName("data-table");
    const rows = table.querySelectorAll("tbody tr");
    const totalPages = Math.ceil(rows.length/rowsPerPage)
}

// hiding all rows
rows.forEach(row => row.style.display = 'none');

//showing the currentpage row

