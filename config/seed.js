// scripts/seed.js
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const MONGO_URI = "mongodb://127.0.0.1:27017/meuBanco";

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Cria ou acha a categoria "Celular"
  let celularCategory = await Category.findOne({ nome: "Celular" });
  if (!celularCategory) {
    celularCategory = await Category.create({ nome: "Celular" });
  }

  const products = [
    {
      nome: "Asus ROG Phone 9 Pro",
      descricao: "O smartphone Asus ROG Phone 9 Pro é a versão mais poderosa...",
      preco: 6920,
      categoria: celularCategory._id,
      estoque: 10,
      imageName: "rogphone9pro.jpg", 
    },
    {
      nome: "Samsung Galaxy S24 Ultra",
      descricao: "O smartphone Galaxy S24 Ultra é celular mais poderoso...",
      preco: 5310,
      categoria: celularCategory._id,
      estoque: 10,
      imageName: "galaxyS24Ultra.png",
    },
    {
      nome: "REDMAGIC 10 Pro",
      descricao: "O smartphone gamer RedMagic 10 Pro da empresa chinesa Nubia...",
      preco: 4900,
      categoria: celularCategory._id,
      estoque: 10,
      imageName: "redMagic10pro.png",
    },
    {
      nome: "Huawei Mate XT Ultimate",
      descricao: "O Huawei Mate XT Ultimate é um dos primeiros celulares dobráveis...",
      preco: 21000,
      categoria: celularCategory._id,
      estoque: 10,
      imageName: "huaweixt.png",
    },
  ];
  

  for (const product of products) {
    const exists = await Product.findOne({ nome: product.nome });
    if (!exists) {
      await Product.create(product);
      console.log(`✔ Produto inserido: ${product.nome}`);
    } else {
      console.log(`ℹ Produto já existe: ${product.nome}`);
    }
  }

  await mongoose.disconnect();
  console.log("✔ Seed finalizado.");
}

seed().catch(console.error);
