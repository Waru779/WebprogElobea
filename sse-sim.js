function startSimulation() {
    let counter = 0;
    const interval = setInterval(() => {
      const div = document.getElementById("messages");
      const time = new Date().toLocaleTimeString();
      const message = `Érkezett üzenet #${++counter} – ${time}`;
      const p = document.createElement("p");
      p.textContent = message;
      div.appendChild(p);
  
      if (counter >= 10) clearInterval(interval); // 10 üzenet után leáll
    }, 1000);
  }
  