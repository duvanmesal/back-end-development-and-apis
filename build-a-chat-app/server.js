
import http from "http";
import fs from "fs";
import { WebSocketServer } from "ws";

const PORT = 3001;

// HTTP server
const server = http.createServer((req, res) => {
  fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error loading page");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(data);
  });
});

// WebSocket server
const wss = new WebSocketServer({ server });

// Broadcast a message to all connected clients
function broadcast(message) {
  const data = JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
}

// Handle new WebSocket connections
wss.on("connection", (socket, req) => {
  // Get username from URL
  const username = new URL(
    req.url,
    "http://localhost"
  ).searchParams.get("username");

  console.log(`${username} connected`);

  // Broadcast user joined message
  broadcast({
    type: "system",
    text: `${username} joined`,
  });

  // Handle incoming chat messages
  socket.on("message", (data) => {
    try {
      const { username, text } = JSON.parse(
        data.toString()
      );

      // Broadcast to all connected clients
      broadcast({
        type: "chat",
        username,
        text,
      });
    } catch (err) {
      console.error("Error parsing message:", err.message);
    }
  });

  // Handle disconnection
  socket.on("close", () => {
    console.log(`${username} disconnected`);

    // Notify remaining clients
    broadcast({
      type: "system",
      text: `${username} left`,
    });
  });

  // Handle socket errors
  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(
    "Chat server running at http://localhost:3001"
  );
});
