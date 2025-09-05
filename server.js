const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Change this to your frontend URL
    methods: ["GET", "POST"]
  }
});

// Setup serial port
const port = new SerialPort({
  path: "COM3", // Change this if your Arduino is on a different port
  baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

let devices = {
  device_1: { name: "Sensor 1", temperature: 0, humidity: 0, status: "ON" }
};

// Listen to serial data from Arduino
parser.on("data", (data) => {
  try {
    const json = JSON.parse(data);
    devices.device_1.temperature = json.current;
    devices.device_1.humidity = json.voltage; // just using voltage as placeholder for humidity
    io.emit("message", JSON.stringify(devices));
    console.log("Data sent to frontend:", devices);
  } catch (err) {
    console.error("Failed to parse:", data);
  }
});

// Socket setup
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("message", JSON.stringify(devices));

  socket.on("message", (data) => {
    const parsed = JSON.parse(data);
    if (devices[parsed.deviceId]) {
      devices[parsed.deviceId].status = parsed.status;
      io.emit("message", JSON.stringify(devices));
    }
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
