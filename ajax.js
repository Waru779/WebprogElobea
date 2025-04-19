const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "N15T6Lalmaka123";

function create() {
  const name = get("name");
  const height = get("height");
  const weight = get("weight");

  if (!name || !height || !weight) return alert("Minden mező kötelező!");

  const data = { op: "create", code: CODE, name, height, weight };
  sendRequest(data, "Create sikeres");
}

function read() {
  const data = { op: "read", code: CODE };
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data)
  })
    .then(res => res.json())
    .then(showData)
    .catch(err => show("Hiba történt: " + err));
}

function update() {
  const id = get("id");
  const name = get("name");
  const height = get("height");
  const weight = get("weight");

  if (!id || !name || !height || !weight) return alert("Minden mező kötelező!");

  const data = { op: "update", code: CODE, id, name, height, weight };
  sendRequest(data, "Update sikeres");
}

function del() {
  const id = get("id");
  if (!id) return alert("ID megadása kötelező!");
  const data = { op: "delete", code: CODE, id };
  sendRequest(data, "Delete sikeres");
}

function sendRequest(data, successMsg) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data)
  })
    .then(res => res.json())
    .then(res => show(successMsg + ": " + JSON.stringify(res)))
    .catch(err => show("Hiba történt: " + err));
}

function showData(json) {
    let str = `Rekordok száma: ${json.rowCount}\n\n`;
  
    const heights = [];
  
    json.list.forEach(item => {
      str += `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}\n`;
      const h = parseFloat(item.height);
      if (!isNaN(h)) heights.push(h);
    });
  
    if (heights.length > 0) {
      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);
  
      str += `\n➤ Magasság összeg: ${sum}`;
      str += `\n➤ Átlag: ${avg}`;
      str += `\n➤ Legnagyobb érték: ${max}`;
    } else {
      str += `\n❗ Nincsenek értékelhető magasság adatok.`;
    }
  
    show(str);
  }

function get(id) {
  return document.getElementById(id).value.trim();
}

function show(text) {
  document.getElementById("output").textContent = text;
}
