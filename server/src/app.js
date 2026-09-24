const express = require("express");
const cors = require("cors");
const bikeRoutes = require("./routes/bikeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require('./routes/productRoutes'); 


const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MotoParts API is running",
  });
});

app.use("/api/bikes", bikeRoutes);
app.use("/api/categories", categoryRoutes); 
app.use('/api/products', productRoutes); 



module.exports = app;