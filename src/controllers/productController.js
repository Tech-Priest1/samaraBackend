const Product = require('../models/productModel');
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, estoque } = req.body;

   
    const product = new Product({ nome, descricao, preco, categoria, estoque });

    await product.save();
    res.status(201).json({ message: "Produto criado com sucesso", product });
  } catch (error) {
    res.status(500).json({ error: error.message || "Erro ao criar produto" });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar produtos" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
     const { id } = req.params;
    
        const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto deletado com sucesso', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
