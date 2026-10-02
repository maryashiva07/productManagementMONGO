const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const shopRoutes = require("./routes/shopRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", shopRoutes);

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// MONGODB

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });
