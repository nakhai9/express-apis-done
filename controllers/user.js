const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Validation = require("../utils/validation");

const UserController = {
  //   GET: /api/usersList
  getAllUser: async (req, res) => {
    try {
      const userList = await UserModel.find({});

      if (users) {
        res.status(200).json({ userList });
      } else {
        res.status(400).json({ userList: "Not found" });
      }
    } catch (error) {
      res.json({ Error: "Something went wrong!" });
    }
  },

  //   GET: /api/users/:id
  getUserById: async (req, res) => {
    try {
      const user = await UserModel.find(req.params.id);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(400).json({ user: "Not found" });
      }
    } catch (error) {
      res.json({ Error: "Something went wrong!" });
    }
  },

  //   POST: /api/v1/users
  createUser: async (req, res) => {
    try {
      const { lastName, fullName, phoneNumber, email, password } = req.body;
      const encryptedPassword = await bcrypt.hash(password, 15);
      const newUser = {
        lastName: lastName,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        password: encryptedPassword,
      };

      const user = await UserModel.create(newUser);

      if (user) {
        res.status(200).json({ message: "Posted" });
      }
    } catch (error) {
      res.status(400).json({ Error: "Something went wrong!" });
    }
  },

  //   UPDATE: /api/v1/users/:id
  updateUser: async (req, res) => {
    try {
      const updateData = {
        lastName: req.body.lastName,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
      };

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      if (updatedUser) {
        res.json({ message: true, "Update successfully.": updateData });
      } else {
        res.json({ message: false });
      }
    } catch (error) {
      res.json({ Error: "Something went wrong!" });
    }
  },

  //   DELETE: /api/v1/users/:id
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

      if (deletedUser) {
        res.status(200).json({ message: true });
      } else {
        res.status(400).json({ message: false });
      }
    } catch (error) {
      res.json({ Error: "Something went wrong!" });
    }
  },

  // POST: /api/v1/login
  login: async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;

      // Thực hiện kiểm tra dữ liệu nhập vào của người dùng
      const { value, error } = await Validation.UserLoginSchema.validate(
        req.body
      );

      // Step 1: Check user on database
      const user = await UserModel.findOne({ phoneNumber: phoneNumber });

      if (!user) {
        res.status(400).json({ error: "Account does not exist." });
      }

      // Step 2: Compare password
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.status(404).json({ error: "Wrong password." });
      }

      if (validPassword && user) {
        // Create a payload after compare is true
        const payload = {
          id: user._id,
        };
        // Step 3: Create access token
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "180s",
        });

        res.status(200).json({
          accessToken: accessToken,
          ...payload,
        });
      } else {
        res.status(400).json({ error: "Invalid password." });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // GET: /api/v1/logout
  logout: async (req, res) => {},

  // GET: /api/v1/cart
  getAllCart: async (req, res) => {
    try {
      // Using findOne return object plain
      const user = await UserModel.findOne(req.params);

      if (user) {
        // user_id from auth
        res.status(200).json({ user_id: req.user_id, cart: user.cart });
      } else {
        res.status(200).json({ cart: [] });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // POST: /api/v1/cart/add
  addToCart: async (req, res) => {
    try {
      const user = await UserModel.findOne(req.params);

      // Input: an array with items(id, item, price)
      if (user) {
        const pushItem = await UserModel.findByIdAndUpdate(
          req.params.id,
          {
            cart: req.body,
          },
          { new: true }
        );
        res.status(200).json({ message: "Pushed to cart." });
      } else {
        res.status(400).json({ message: "Can not push to cart." });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // GET: /api/v1/cart/clean
  clearingCart: async (req, res) => {
    try {
      const isEmptyCart = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          cart: [],
        },
        { new: true }
      );
      if (isEmptyCart) {
        res.status(200).json({
          message: "Cart is empty.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserController;
