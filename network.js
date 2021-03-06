let webSocket;

// Diese Funktion muss vor allen anderen ausgeführt werden
function init(name) {
  webSocket = new WebSocket("ws://localhost:5000");

  webSocket.onerror = (socket, event) => {
    console.error(event);
  };

  webSocket.onopen = () => {
    webSocket.send(
      JSON.stringify({ type: "connect", name: name ? name : "Unbekannt" })
    );
  };

  // Wenn eine Nachricht vom Server kommt
  webSocket.onmessage = (message) => {
    const data = JSON.parse(message.data);

    switch (data.type) {
      // Wenn die Verbindung hergestellt wird
      case "connected":
        console.log(`Connection to server successful, your id is ${data.id}.`);

        const onConnect = new CustomEvent("connect", { detail: data });
        dispatchEvent(onConnect);
        break;

      // Wenn ein Raum betreten wurde
      case "login":
        console.log(`You are now logged into room ${data.roomId}.`);
        break;

      // Wenn Spielerdaten empfangen wurden
      case "update":
        const onUpdate = new CustomEvent("update", { detail: data });
        dispatchEvent(onUpdate);
        break;
      case "music":
        const onMusic = new CustomEvent("music", { detail: data });
        dispatchEvent(onMusic);
        break;
    }
  };
}

// Mit dieser Funktion kann man sich in einen Raum anmelden
function login(roomId) {
  webSocket.send(JSON.stringify({ type: "login", roomId: roomId }));
}

// Mit dieser Funktion kann die Richtung geändert werden
function setDirection(direction) {
  webSocket.send(JSON.stringify({ type: "direction", direction: direction }));
}
