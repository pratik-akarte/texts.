//name.email.password.profilepic
const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,

      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
    },
  },
  { timestamps: true }
);

//Creates a Mongoose model named 'User' based on the UserModel

module.exports = mongoose.model("User", UserModel);
