"use strict";
const express = require("express");
const router = express.Router();

const WatchController = require("../controllers/watch");
const UserController = require("../controllers/user");

const AuthMiddleware = require("../middlewares/auth");
const FileController = require("../controllers/file");

// Watch APIs
router.get("/", WatchController.sayHelloFromServer);

router.get("/api/v1/watches", WatchController.getAllWatchList);

router.get("/api/v1/categories", WatchController.getAllCategories);

router.get(
  "/api/v1/categories/:category_ids",
  WatchController.getWatchesByCategory
);

router.get("/api/v1/watches/:color", WatchController.getWatchesByColor);

router.post("/api/v1/watches", WatchController.postWatch);

router.patch("/api/v1/watches/:id", WatchController.updateWatchById);

router.delete("/api/v1/watches/:watch_ids", WatchController.deleteWatchById);

// User APIs
router.get("/api/v1/userlist", UserController.getAllUser);

router.get("/api/v1/users/:id", UserController.getUserById);

router.post("/api/v1/users", UserController.createUser);

router.patch(
  "/api/v1/users/:id",
  AuthMiddleware.isAuthorization,
  UserController.updateUser
);

router.delete(
  "/api/v1/users/:id",
  AuthMiddleware.isAuthorization,
  UserController.deleteUserById
);

router.post("/api/v1/login", UserController.login);

// Cart APIs
router.get(
  "/api/v1/cart",
  AuthMiddleware.isAuthorization,
  UserController.getAllCart
);

router.post(
  "/api/v1/cart/add",
  AuthMiddleware.isAuthorization,
  UserController.addToCart
);

router.get(
  "/api/v1/cart/clean",
  AuthMiddleware.isAuthorization,
  UserController.clearingCart
);

module.exports = router;
