const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const { findCartByUserId } = require("../utils/cartUtils"); 

exports.addToCart = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { usuario, produto, quantidade } = req.body;

    
    let cart = await findCartByUserId(usuario); 

    if (!cart) {
      cart = new Cart({
        _id: usuario,
        usuario,
        produtos: [{ produto, quantidade }],
        total: 0,
      });
    } else {
      const existingProduct = cart.produtos.find(p => p.produto === produto);
      if (existingProduct) {
        existingProduct.quantidade += quantidade;
      } else {
        cart.produtos.push({ produto, quantidade });
      }
    }

    // Recalculate the total
    let total = 0;
    for (const item of cart.produtos) {
      const product = await Product.findById(item.produto);
      if (product) {
        total += product.preco * item.quantidade;
      }
    }

    cart.total = total;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message || "Erro ao adicionar produto ao carrinho" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { usuario } = req.params;


    const cart = await findCartByUserId(usuario);

    if (!cart) return res.status(404).json({ message: "Carrinho vazio" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const { usuario, produto } = req.params;

    console.log("usuario:", usuario);
    console.log("produto:", produto);

    let cart = await findCartByUserId(usuario);
    console.log("cart:", cart);

    if (!cart) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }

    // Procurar o produto no carrinho
    const existingProduct = cart.produtos.find(item =>
      (item.produto._id?.toString() || item.produto.toString()) === produto
    );

    if (!existingProduct) {
      return res.status(404).json({ message: "Produto não encontrado no carrinho" });
    }

    // Reduz a quantidade ou remove completamente
    if (existingProduct.quantidade > 1) {
      existingProduct.quantidade -= 1;
    } else {
      cart.produtos = cart.produtos.filter(item =>
        (item.produto._id?.toString() || item.produto.toString()) !== produto
      );
    }

    // Recalcular o total
    let total = 0;
    for (const item of cart.produtos) {
      const productData = item.produto.preco ? item.produto : await Product.findById(item.produto._id || item.produto);
      if (productData) {
        total += productData.preco * item.quantidade;
      }
    }

    cart.total = total;
    await cart.save();

    res.status(200).json({ message: "Produto removido do carrinho", cart });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
