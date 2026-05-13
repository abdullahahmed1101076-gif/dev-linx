require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/dockerops";

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "DockerOps API is running!" });
});

// Connect to MongoDB then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
