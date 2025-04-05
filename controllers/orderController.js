const { findCartByUserId } = require("../utils/cartUtils");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createOrder = async (req, res) => {
  try {
    const { usuario } = req.body;  

    // cartUtils.js
    const cart = await findCartByUserId(usuario);

    if (!cart) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }

    // produt para orem
    const products = await Promise.all(
      cart.produtos.map(async item => {
        const productId = item.produto._id ? item.produto._id.toString() : item.produto.toString();
        const productData = item.produto.preco ? item.produto : await Product.findById(productId);
        return {
          produto: productId,
          quantidade: item.quantidade,
          precoUnitario: productData?.preco || 0,
        };
      })
    );    

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
 // Presumo que exista



 exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ usuario: userId }).sort({ dataPedido: -1 });

    const allProductIds = orders.flatMap(order =>
      order.produtos.map(p => p.produto)
    );

    const products = await Product.find({ _id: { $in: allProductIds } });

    const productMap = {};
    for (const p of products) {
      productMap[p._id] = p;
    }

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      status: order.status,
      total: order.total , // converte total para reais
      dataPedido: order.dataPedido,
      produtos: order.produtos.map(p => {
        const productId = typeof p.produto === 'object' ? p.produto._id.toString() : p.produto.toString();
        const prod = productMap[productId];
        return {
          produto: prod
            ? {
                nome: prod.nome,
                imageUrl: prod.imageUrl || null,
                preco: prod.preco,
              }
            : {
                nome: "Produto desconhecido",
                imageUrl: null,
                preco: (p.precoUnitario || 0) 
              },
          quantidade: p.quantidade,
        };
      }),
    }));
    

    res.status(200).json(formattedOrders);
  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
    res.status(500).json({ message: err.message });
  }
};
