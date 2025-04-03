const { findCartByUserId } = require("../utils/cartUtils");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.createOrder = async (req, res) => {
  try {
    const { usuario } = req.body;  

    // cartUtils.js
    const cart = await findCartByUserId(usuario);

    if (!cart) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }

    // produt para orem
    const products = cart.produtos.map(item => ({
      produto: item.produto.toString(),  
      quantidade: item.quantidade,
      precoUnitario: item.produto.preco
    }));


    const total = products.reduce((total, product) => total + product.precoUnitario * product.quantidade, 0);

    const order = new Order({
      usuario: usuario,
      produtos: products,
      total
    });

    
    await order.save();

    // limpar o carrinho
    await Cart.updateOne({ usuario: usuario }, { $set: { produtos: [] } });

    res.status(201).json({ message: "Pedido criado com sucesso", order });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Erro ao criar pedido" });
  }
};
