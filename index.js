const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const graphqlCategory = require("../backend/models/graphqlCategory");

require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middlewares
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());

// API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use('/api/chat', require('./routes/chatRoutes'));


// GraphQL 
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlCategory, 
    graphiql: true, 
  })
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
