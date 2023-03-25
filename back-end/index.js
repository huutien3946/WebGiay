const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const giayRoute = require("./routes/giay");
const brandRoute = require("./routes/brand");

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

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
  res.status(200).send("test server");
});

//Routes
app.use("/giay", giayRoute);
app.use("/brand", brandRoute);

app.listen(8000, () => {
  console.log("Server running in port 8000 !");
});
