self.onmessage = e => {
  const { from, to } = e.data;

  function toRad(x) {
    return x * Math.PI / 180;
  }

  const [lat1, lon1] = from;
  const [lat2, lon2] = to;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  self.postMessage(Math.round(d));
};
