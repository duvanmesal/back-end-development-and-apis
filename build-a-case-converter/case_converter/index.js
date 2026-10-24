function getUpperCase(str) {
  return str.toUpperCase();
}

function getLowerCase(str) {
  return str.toLowerCase();
}

function getSentenceCase(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() +
    str.slice(1).toLowerCase();
}

function getProperCase(str) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase
};
