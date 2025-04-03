const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const orderSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid() }, 
  usuario: { type: String, required: true }, 
  produtos: [{
    produto: { type: String, required: true },  
    quantidade: { type: Number, required: true },
    precoUnitario: { type: Number, required: true }
  }],
  status: { type: String, enum: ["pendente", "enviado", "entregue"], default: "pendente" },
  dataPedido: { type: Date, default: Date.now },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Order", orderSchema);
