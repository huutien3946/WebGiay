const mongoose = require("mongoose");

// ===================== Shoe =====================
const shoeSchema = new mongoose.Schema(
  {
    shoeName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    permission: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

let Shoe = mongoose.model("Shoe", shoeSchema);
let Brand = mongoose.model("Brand", brandSchema);
let User = mongoose.model("User", userSchema);

module.exports = { Shoe, Brand, User };
