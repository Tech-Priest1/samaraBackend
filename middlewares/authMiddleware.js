import { verify } from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Acesso negado" });

  try {
    const decoded = verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

