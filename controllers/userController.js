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
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ message: error.message || "Erro no servidor" });
  }
};
exports.getUsers = async (req, res) => {
  try {
    console.log("Fetching users...");
    const users = await User.find({}, "_id nome email"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
  }
};
exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Acesso negado" });

    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    if (decoded.id !== id) return res.status(403).json({ message: "Acesso não autorizado" });

    const updateFields = { nome, email };

    if (senha) {
      updateFields.senha = await bcrypt.hash(senha, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Acesso negado" });
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    if (decoded.id !== id) return res.status(403).json({ message: "Acesso não autorizado" });
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
  }
};

// Add this new controller method
exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-senha');
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
  }
};
