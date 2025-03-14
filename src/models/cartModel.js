const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() }, 
  usuario: { type: String, required: true, unique: true },
  produtos: [{
    produto: { type: String, ref: "Product", required: true }, 
    quantidade: { type: Number, required: true }
  }],
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Cart", cartSchema);
