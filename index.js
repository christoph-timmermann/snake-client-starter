import { init, login, setDirection } from "./network.js";

const WIDTH = 50; // Breite des Spielfelds
const HEIGHT = 50; // Höhe des Spielfelds
const TILE_SIZE = 16; // Größe einer Kachel in Pixeln

const Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

// Wenn der Netzwerk-Client verbunden hat
addEventListener("connect", event => {
  login("MYROOM");
});

// Wenn sich der Zustand des Spiels ändert
addEventListener("update", event => {});

let ctx;
let initialized = false;
// Wenn die Webseite fertig geladen wurde
function gameInit() {
  initialized = true;

  // Mit Name verbinden
  init("Spieler");

  // Canvas
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  ctx.canvas.width = WIDTH * TILE_SIZE;
  ctx.canvas.height = HEIGHT * TILE_SIZE;
}

checkLoaded;
function checkLoaded() {
  if (document.getElementById("canvas") && !initialized) {
    gameInit();
  } else {
    setTimeout(checkLoaded, 15);
  }
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
