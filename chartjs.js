const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
const drawBtn = document.getElementById('drawChartBtn');
const rows = 5, cols = 5;
let selectedRow = null;

// Táblázat feltöltése számokkal
for (let i = 0; i < rows; i++) {
  const row = table.insertRow();
  for (let j = 0; j < cols; j++) {
    const cell = row.insertCell();
    cell.textContent = Math.floor(Math.random() * 91 + 10); // 10-100 közötti számok
  }

  row.addEventListener('click', function () {
    // Kijelölés vizuálisan
    for (const r of table.rows) {
      r.classList.remove('selected');
    }
    this.classList.add('selected');
    selectedRow = this;
  });
}

// Canvas dinamikus méretezése
const canvas = document.getElementById('myChart');
canvas.width = window.innerWidth * 0.9;  // A képernyő szélességének 90%-a
canvas.height = window.innerHeight * 0.4;  // A képernyő magasságának 40%-a

// ChartJS alapbeállítás
const ctx = canvas.getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1.', '2.', '3.', '4.', '5.'],
    datasets: [{
      label: 'Kiválasztott sor adatai',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Gomb megnyomására frissítjük a chartot
drawBtn.addEventListener('click', function () {
  if (!selectedRow) {
    alert('Kérlek, válassz ki egy sort a táblázatból!');
    return;
  }

  const data = Array.from(selectedRow.cells).map(cell => parseInt(cell.textContent));
  const rowIndex = Array.from(table.rows).indexOf(selectedRow) + 1;
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].label = `Kiválasztott sor (${rowIndex}. sor)`;
  chart.update();
});
