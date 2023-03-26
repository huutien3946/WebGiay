const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const productRoute = require("./routes/product.routes");
const brandRoute = require("./routes/brand.routes");
const sizeRoute = require("./routes/size.routes");
const ordeRoute = require("./routes/order.routes");
const ordeDetailRoute = require("./routes/orderdetail.routes");
const userRoute = require("./routes/user.routes");

dotenv.config();

// CONECT DATABASE (MONGODB)

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conected to Database !!!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// mongoose.connect(process.env.MONGODB_URL, () => {
//   console.log("Connected to MongoDB successful");
// });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
  res.status(200).send("test server");
});

//Routes
app.use("/product", productRoute);
app.use("/brand", brandRoute);
app.use("/size", sizeRoute);
app.use("/order", ordeRoute);
app.use("/orderDetail", ordeDetailRoute);
app.use("/user", userRoute);

app.listen(8000, () => {
  console.log("Server running in port 8000 !");
});
