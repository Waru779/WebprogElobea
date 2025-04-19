// Geolocation API
document.getElementById("get-location").onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    document.getElementById("location-result").textContent = `Koordinátáid: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  });
};

// Drag and Drop API
const places = document.querySelectorAll(".place");
const planArea = document.getElementById("plan-area");

places.forEach(place => {
  place.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", e.target.textContent);
  });
});

planArea.addEventListener("dragover", e => e.preventDefault());
planArea.addEventListener("drop", e => {
  e.preventDefault();
  const text = e.dataTransfer.getData("text/plain");
  planArea.textContent = `Terv: ${text}`;
});

// Web Storage
document.getElementById("save-plan").onclick = () => {
  localStorage.setItem("tripPlan", planArea.textContent);
};

document.getElementById("load-plan").onclick = () => {
  const plan = localStorage.getItem("tripPlan");
  document.getElementById("saved-plan").innerHTML = `<li>${plan}</li>`;
};

// Web Worker
document.getElementById("calc-distance").onclick = () => {
  const worker = new Worker("worker.js");
  worker.postMessage({ from: [47, 19], to: [48.8, 2.3] }); // Budapest -> Paris
  worker.onmessage = e => {
    document.getElementById("distance-result").textContent = `Távolság: ${e.data} km`;
  };
};

// Server-Sent Events (szimuláció setInterval-lal, mivel nincs szerver)
setTimeout(() => {
  document.getElementById("sse-message").textContent = "🎉 Új akció: 20% kedvezmény Párizsra!";
}, 3000);

// Canvas
const canvas = document.getElementById("map-canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#cce5ff";
ctx.fillRect(10, 10, 100, 50);
ctx.fillStyle = "#000";
ctx.fillText("Térkép-részlet", 15, 40);
