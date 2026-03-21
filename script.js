const suppliers = [
  {
    name: "Aztec Materials",
    contact: "Maria Castillo",
    address: "Lagos, Nigeria",
    status: "Active",
    delivery: "96%"
  },
  {
    name: "BlueNet Logistics",
    contact: "David Okafor",
    address: "Abuja, Nigeria",
    status: "Pending",
    delivery: "82%"
  },
  {
    name: "GreenSource Farms",
    contact: "Ngozi Adeyemi",
    address: "Ibadan, Nigeria",
    status: "Active",
    delivery: "93%"
  },
  {
    name: "PrimaTech Resources",
    contact: "Emeka Nwosu",
    address: "Port Harcourt",
    status: "Inactive",
    delivery: "61%"
  }
];

const table = document.getElementById("supplierTable");

function displaySuppliers(data) {
  table.innerHTML = "";

  data.forEach((supplier, index) => {
    let statusClass = "";

    if (supplier.status === "Active") statusClass = "active-status";
    if (supplier.status === "Pending") statusClass = "pending-status";
    if (supplier.status === "Inactive") statusClass = "inactive-status";

    const row = `
      <tr>
        <td>${supplier.name}</td>
        <td>${supplier.contact}</td>
        <td>${supplier.address}</td>
        <td><span class="status ${statusClass}">${supplier.status}</span></td>
        <td>${supplier.delivery}</td>
        <td>
          <button onclick="viewSupplier(${index})"><i class='bx bx-show'></i></button>
          <button onclick="editSupplier(${index})"><i class='bx bx-edit'></i></button>
        </td>
      </tr>
    `;

    table.innerHTML += row;
  });
}
displaySuppliers(suppliers);


function viewSupplier(index) {
  alert("Viewing " + suppliers[index].name);
}

function editSupplier(index) {
  alert("Editing " + suppliers[index].name);
}








/* Search */
document.getElementById("search").addEventListener("keyup", function() {
  const value = this.value.toLowerCase();

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(value) ||
    s.contact.toLowerCase().includes(value)
  );

  displaySuppliers(filtered);
});