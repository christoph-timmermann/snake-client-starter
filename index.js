const WIDTH = 50; // Breite des Spielfelds
const HEIGHT = 50; // Höhe des Spielfelds
const TILE_SIZE = 16; // Größe einer Kachel in Pixeln

const Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
};

const buffers = [];
const songs = [];

// Wenn der Netzwerk-Client verbunden hat
addEventListener("connect", (event) => {
  console.log(event.detail);
  login("MYROOM");
});

addEventListener("music", (event) => {
  const musicList = document.getElementById("music-list");

  XMPlayer.init();

  for (var index = 0; index < event.detail.arrayBuffer.length; index++) {
    var binary_string = window.atob(event.detail.arrayBuffer[index]);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    buffers.push(bytes.buffer);

    const song = document.createElement("button");
    musicList.appendChild(song);
    song.className = "song";
    song.innerHTML = "Song " + (index + 1);

    songs.push(song);
  }
  for (let index = 0; index < songs.length; index++) {
    songs[index].addEventListener("click", function () {
      if (XMPlayer) {
        XMPlayer.stop();
      }

      XMPlayer.load(buffers[index]);
      XMPlayer.play();
    });
  }
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

  // Canvas
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.style.backgroundColor = "lightgrey";
  ctx.canvas.width = WIDTH * TILE_SIZE;
  ctx.canvas.height = HEIGHT * TILE_SIZE;

  const pause = document.getElementById("pause");
  pause.addEventListener("click", stopMusic);
};

function stopMusic() {
  if (XMPlayer) {
    XMPlayer.pause();
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
