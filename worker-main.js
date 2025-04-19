let worker;

function startWorker() {
  if (window.Worker) {
    worker = new Worker("worker.js");
    document.getElementById("output").textContent = "Számolás folyamatban...";
    
    worker.onmessage = (e) => {
      document.getElementById("output").textContent = e.data;
    };
  } else {
    alert("A böngésződ nem támogatja a Web Workereket.");
  }
}
