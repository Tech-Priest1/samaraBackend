const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const productSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() },
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  categoria: { type: String, ref: "Category" }, 
  estoque: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
