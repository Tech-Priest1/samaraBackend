const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const categorySchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() }, 
  nome: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
