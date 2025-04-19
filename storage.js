function saveData() {
    const input = document.getElementById("input").value;
    localStorage.setItem("data", input);
    document.getElementById("output").textContent = "Elmentve: " + input;
  }
  window.onload = () => {
    const stored = localStorage.getItem("data");
    if (stored) document.getElementById("output").textContent = "Előző adat: " + stored;
  };