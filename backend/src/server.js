const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join-split", (splitId) => {
    socket.join(splitId);
    console.log(`User ${socket.id} joined split ${splitId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Make io accessible to routes
app.set("io", io);

// Test routes
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Payment Splitter API is running!",
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "✅ API endpoint working!",
    timestamp: new Date(),
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

    res.json({
      status: "OK",
      timestamp: new Date(),
      database: dbStatus,
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
});

// Database connection with multiple fallback options
const connectDB = async () => {
  const connectionStrings = [
    process.env.MONGODB_URI,
    "mongodb://admin:password@localhost:27017/payment_splitter?authSource=admin",
    "mongodb://admin:password@127.0.0.1:27017/payment_splitter?authSource=admin",
    "mongodb://admin:password@db:27017/payment_splitter?authSource=admin",
  ];

  for (const connectionString of connectionStrings) {
    if (!connectionString) {
      console.log("⚠️ Skipping empty connection string");
      continue;
    }

    try {
      console.log("🔄 Attempting to connect to MongoDB...");
      console.log(
        "Connection string:",
        connectionString.replace(/password@/, "****@")
      );

      const conn = await mongoose.connect(connectionString);

      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      console.log("🔄 Trying next connection string...");
    }
  }

  console.error("❌ All connection attempts failed. Retrying in 10 seconds...");
  setTimeout(connectDB, 10000);
};

// Connect to database
connectDB();

server.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 Socket.io enabled`);
  console.log(`🔗 API available at: http://localhost:${PORT}/api`);
});
