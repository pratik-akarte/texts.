const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes")
const { errorHandler, notFound } = require("./Controllers/errorHandlers");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); //to accept JSON responses as we will post user data from login page

app.use(cookieParser());

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

app.get("/api/chats/:id", (req, res) => {
  const singleChat = chats.find((c) => c?._id === req?.params?.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server listening on port ${PORT}`.yellow.bold));
