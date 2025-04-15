let data = [];

document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const city = document.getElementById("city").value.trim();
  const score = parseInt(document.getElementById("score").value);
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex === "") {
    data.push({ name, age, city, score });
  } else {
    data[editIndex] = { name, age, city, score };
    document.getElementById("editIndex").value = "";
  }

  this.reset();
  renderTable();
});

function renderTable(filter = "") {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  data
    .filter(row => Object.values(row).some(val =>
      val.toString().toLowerCase().includes(filter.toLowerCase())))
    .forEach((row, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.city}</td>
        <td>${row.score}</td>
        <td>
          <button onclick="editRow(${index})">Szerkeszt</button>
          <button onclick="deleteRow(${index})">Törlés</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

function editRow(index) {
  const row = data[index];
  document.getElementById("name").value = row.name;
  document.getElementById("age").value = row.age;
  document.getElementById("city").value = row.city;
  document.getElementById("score").value = row.score;
  document.getElementById("editIndex").value = index;
}

function deleteRow(index) {
  if (confirm("Biztos törölni szeretnéd ezt a sort?")) {
    data.splice(index, 1);
    renderTable();
  }
}

document.getElementById("search").addEventListener("input", function () {
  renderTable(this.value);
});

let currentSort = { column: null, asc: true };

function sortTable(colIndex) {
  const keys = ["name", "age", "city", "score"];
  const key = keys[colIndex];

  if (currentSort.column === key) {
    currentSort.asc = !currentSort.asc;
  } else {
    currentSort = { column: key, asc: true };
  }

  data.sort((a, b) => {
    if (a[key] < b[key]) return currentSort.asc ? -1 : 1;
    if (a[key] > b[key]) return currentSort.asc ? 1 : -1;
    return 0;
  });

  renderTable();
}

