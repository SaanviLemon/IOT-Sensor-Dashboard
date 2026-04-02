# IoT Sensor Dashboard

A full-stack real-time dashboard for monitoring and visualizing sensor data, built using React, Node.js, and Arduino.

## Overview
This project simulates a real-world data pipeline where sensor data is collected, processed, and displayed in real time. It focuses on reliable data flow, system structure, and handling inconsistent inputs.

## Features
- Real-time data updates using WebSockets (Socket.IO)
- Live visualization of sensor readings in a React dashboard
- Backend processing of incoming hardware data
- Error handling and validation for missing or inconsistent sensor inputs
- Dockerized backend for consistent deployment

## Tech Stack
- Frontend: React
- Backend: Node.js, Express
- Communication: WebSockets (Socket.IO)
- Hardware: Arduino (sensor simulation)
- Deployment: Docker

## System Architecture
Sensor Data → Node.js Backend → WebSocket Server → React Frontend

- Sensors send data via serial communication
- Backend processes and validates incoming data
- WebSocket streams updates to frontend
- Frontend renders live dashboard updates

## My Contributions
- Designed and implemented real-time data pipeline from hardware to UI
- Built backend services for processing and streaming sensor data
- Implemented validation and error handling to improve system reliability
- Structured code into modular components for scalability

## Future Improvements
- Add persistent storage (e.g., database for historical data)
- Implement authentication and user-specific dashboards
- Deploy on cloud infrastructure for remote access
