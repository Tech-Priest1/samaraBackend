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
app.use(cors());
app.use(express.json());
// API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlCategory, 
    graphiql: true, 
  })
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server connectado na porta ${PORT}`);
});
