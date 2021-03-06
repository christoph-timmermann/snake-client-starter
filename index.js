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

window.addEventListener("keydown", logKey);
function logKey(e) {
  if (e) {
    const press = e.keyCode;
    if (press === 38) {
      setDirection(Direction.UP);
    }
    if (press === 40) {
      setDirection(Direction.DOWN);
    }
    if (press === 37) {
      setDirection(Direction.LEFT);
    }
    if (press === 39) {
      setDirection(Direction.RIGHT);
    }
  }
}

// Wenn der Netzwerk-Client verbunden hat
addEventListener("connect", (event) => {
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
    musicList.append(song);
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
      const pause = document.getElementById("pause");
      pause.innerHTML = "Pause";
      pause.style.display = "block";
    });
  }
});

// Wenn sich der Zustand des Spiels ändert
addEventListener("update", (event) => {
  if (ctx === null) {
    return;
  }

  ctx.font = "30px Arial";
  clearCanvas();
  for (i = 0; i < event.detail.players.length; i++) {
    ctx.fillStyle = event.detail.players[i].color;
    ctx.fillText(
      event.detail.players[i].name,
      event.detail.players[i].x * TILE_SIZE,
      event.detail.players[i].y * TILE_SIZE
    );
    fillTile(
      event.detail.players[i].x,
      event.detail.players[i].y,
      event.detail.players[i].color
    );
    for (z = 0; z < event.detail.players[i].tail.length; z++) {
      fillTile(
        event.detail.players[i].tail[z].x,
        event.detail.players[i].tail[z].y,
        event.detail.players[i].color
      );
    }
  }
  fillTile(event.detail.room.apple.x, event.detail.room.apple.y, "green");
});

let ctx;
// Wenn die Webseite fertig geladen wurde
window.onload = () => {
  // Mit Name verbinden
  const user = sessionStorage.getItem("user");

  // Canvas
  const canvas = document.getElementById("canvas");
  console.log(user);
  console.log(canvas);
  if (user && canvas) {
    init(user);

    ctx = canvas.getContext("2d");

    canvas.style.backgroundColor = "lightgrey";
    ctx.canvas.width = WIDTH * TILE_SIZE;
    ctx.canvas.height = HEIGHT * TILE_SIZE;

    const pause = document.getElementById("pause");
    pause.addEventListener("click", stopMusic);
  }
};

function stopMusic() {
  if (XMPlayer) {
    const pause = document.getElementById("pause");
    if (!XMPlayer.playing) {
      XMPlayer.play();
      pause.innerHTML = "Pause";
    } else {
      XMPlayer.pause();
      pause.innerHTML = "Play";
    }
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
