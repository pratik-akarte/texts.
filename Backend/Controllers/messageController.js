const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel.js");
const Message = require("../Models/MessageModel.js");

const getUsersForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // this line finds all users in database whose _id is not equalto ($ne) to logged in user id  as we want to see only our contacts messages
    // also -password means not including password field in response

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsers ForSidebar:" + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    //user to chat with
    const { id: userToChatId } = req.params;

    //our USERid
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    //it fetches all the function where i am sender and next person is receiver and vice versa

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:" + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image,
    });

    //  Saves the message to the MongoDB database.
    // await ensures the operation completes before moving forward.

    await newMessage.save();

    //todo : real functionality socket.io

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:" + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { getUsersForSidebar, getMessages, sendMessage };
