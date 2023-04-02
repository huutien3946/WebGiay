const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");

dotenv.config();
const authController = {
  register: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      newUser.password = hashed;
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (err) {
      res.status(500).json("Loi server"); // search google: http request code nếu muốn biết code nghĩa là gì
    }
  },

  login: async (req, res) => {
    try {
      // Lấy thông tin đăng nhập từ body request
      const { username, password } = req.body;

      // Tìm người dùng với username
      const user = await User.findOne({ username: req.body.username });
      const validPassword = await bcrypt.compare(password, user.password);

      // Nếu không tìm thấy người dùng hoặc password không đúng, trả về lỗi
      if (!user || !validPassword) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Tạo mã JWT với thông tin người dùng
      const token = jwt.sign(
        { id: user._id, name: user.name, permission: user.permission },
        process.env.MY_SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Trả về mã JWT
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = authController;
