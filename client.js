const url = "ws://localhost:8080";
const connection = new WebSocket(url);

connection.addEventListener('open', (event) => {
    console.log("connected", event)
});

connection.addEventListener('message', (event) => {
    console.log("message", event.data)

    connection.send("réponse du client");
});

