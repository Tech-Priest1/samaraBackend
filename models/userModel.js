const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const userSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },   
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
