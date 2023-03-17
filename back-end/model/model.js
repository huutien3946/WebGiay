const mongoose = require("mongoose");

const giaySchema = new mongoose.Schema({
  tenGiay: {
    type: String,
    required: true,
  },
  moTa: {
    type: String,
  },
  thuongHieu: {
    type: String,
    required: true,
  },
});

let Giay = mongoose.model("Giay", giaySchema);

module.exports = { Giay };
