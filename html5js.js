function saveName() {
    const name = document.getElementById('nameInput').value;
    localStorage.setItem('name', name);
    document.getElementById('output').textContent = `Mentve: ${name}`;
  }

  // Betöltéskor kiolvassa
  window.onload = () => {
    const stored = localStorage.getItem('name');
    if (stored) document.getElementById('output').textContent = `Korábbi érték: ${stored}`;
  };

  let worker;
    function startWorker() {
      if (window.Worker) {
        worker = new Worker("worker.js");
        worker.onmessage = e => {
          document.getElementById("result").textContent = `Eredmény: ${e.data}`;
        };
      }
    }