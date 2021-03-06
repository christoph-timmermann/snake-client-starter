const WIDTH = 50; // Breite des Spielfelds
const HEIGHT = 50; // Höhe des Spielfelds
const TILE_SIZE = 16; // Größe einer Kachel in Pixeln

const Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};

// Wenn der Netzwerk-Client verbunden hat
addEventListener("connect", (event) => {
  console.log(event.detail);
  login("MYROOM");
});

addEventListener("music", (event) => {
  var binary_string = window.atob(event.detail.arrayBuffer);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  XMPlayer.init();
  XMPlayer.load(bytes.buffer);
});

// Wenn sich der Zustand des Spiels ändert
addEventListener("update", (event) => {
  console.log(event.detail);
  setDirection(Direction.DOWN);
});

let ctx;
// Wenn die Webseite fertig geladen wurde
window.onload = () => {
  // Mit Name verbinden
  init("Spieler");
  const musicButton = document.getElementById("music");
  musicButton.addEventListener("click", playMusic);

  const musicStopButton = document.getElementById("music-stop");
  musicStopButton.addEventListener("click", stopMusic);

  // Canvas
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.style.backgroundColor = "lightgrey";
  ctx.canvas.width = WIDTH * TILE_SIZE;
  ctx.canvas.height = HEIGHT * TILE_SIZE;
};

function playMusic() {
  XMPlayer.play();
}

function stopMusic() {
  XMPlayer.pause();
}

// Funktionen zum Zeichnen
function fillTile(x, y, color) {
  ctx.beginPath();
  ctx.rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
