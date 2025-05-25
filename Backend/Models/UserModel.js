//name.email.password.profilepic
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
    },
  },
  { timestamps: true }
);

UserModel.methods.matchPassword = async function (entered_pw) {
  return await bcrypt.compare(entered_pw, this.password);
};

UserModel.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next()
});

//Creates a Mongoose model named 'User' based on the UserModel

module.exports = mongoose.model("User", UserModel);
