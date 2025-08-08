function ramdon() {
  const idrand = Math.floor(Math.random() * 253425);
  const data = idrand.toString().padStart(0, 6);
  return data;
}

module.exports = { ramdon };
