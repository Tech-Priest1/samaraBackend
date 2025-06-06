const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const graphqlCategory = require("./models/graphqlCategory");

require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middlewares
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions)); // handle preflight

app.use(express.json());

// API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));



// GraphQL 
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlCategory, 
    graphiql: true, 
  })
);
const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
