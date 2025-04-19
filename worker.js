onmessage = function () {
  let count = 0;
  for (let i = 0; i < 1e8; i++) {
    count += i;
  }
  postMessage("Számolás kész! Eredmény: " + count.toLocaleString());
};
