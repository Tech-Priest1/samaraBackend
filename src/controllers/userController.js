const User = require("../models/userModel"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(senha, 10);

    user = new User({ nome, email, senha: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ message: error.message || "Erro no servidor" });
}
};

exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(senha, user.senha)))
      return res.status(401).json({ message: "Credenciais inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ message: error.message || "Erro no servidor" });
}
};

exports.getUsers = async (req, res) => {
  try { console.log("Fetching users...")
    const users = await User.find({}, "_id nome email"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
  }
};


