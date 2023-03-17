const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const giayRoute = require("./routes/giay");

dotenv.config();

// CONECT DATABASE (MONGODB)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("Conected to Database !!!"))
  .catch("Failed connected database");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
  res.status(200).send("test server");
});

//Routes
app.use("/giay", giayRoute);

app.listen(8000, () => {
  console.log("Server running in port 8000 !");
});
