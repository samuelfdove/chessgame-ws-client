export function getConfig() {
  let config = {orientation: document.getElementById("orientation").value, FEN: document.getElementById("FEN").value, p1random: null, p2random: null, p1computer: null, p2computer: null, p1choosepiece: null, p2choosepiece: null}
  // config["orientation"] = document.getElementById("orientation").value
  // config["FEN"] = document.getElementById("FEN").value
  if (document.getElementById("p1random").checked) {
    config["p1random"] = document.getElementById("p1randomvalue").value
  }
  if (document.getElementById("p2random").checked) {
    config["p2random"] = document.getElementById("p2randomvalue").value
  }
  if (document.getElementById("p1computer").checked) {
    config["p1computer"] = document.getElementById("p1computervalue").value
  }
  if (document.getElementById("p2computer").checked) {
    config["p2computer"] = document.getElementById("p2computervalue").value
  }
  if (document.getElementById("p1choosepiece").checked) {
    config["p1choosepiece"] = document.getElementById("p1choosepiecevalue").value
  }
  if (document.getElementById("p2choosepiece").checked) {
    config["p2choosepiece"] = document.getElementById("p2choosepiecevalue").value
  }
  return config
}