const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const { errorHandler, notFound } = require("./Controllers/errorHandlers.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server, io } = require("./config/socket.js");
const path = require("path");

dotenv.config();
connectDB();
const __dirname = path.resolve();
app.use(express.json()); //to accept JSON responses as we will post user data from login page

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:2703",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

// so what you're actually doing is:
// Passing a function to .find()
// That function returns true for the matching object
// .find() then returns the first object where that function returns true

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(
  PORT,
  console.log(`server listening on port ${PORT}`.yellow.bold)
);
