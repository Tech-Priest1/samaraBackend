const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    }); 
    console.log("MongoDB conectado!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;