const Cart = require("../models/cartModel");

const findCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({ usuario: userId }).populate("produtos.produto");
    return cart;
  } catch (error) {
    throw new Error("Error retrieving cart");
  }
};

module.exports = { findCartByUserId };
