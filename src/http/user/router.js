const express = require("express");
const {
  register,
  login,
  createUser,
  readUser,
  updateUser,
  updatePassword,
} = require("./controller");
const {
  cekError,
  cekRegister,
  cekCreateUser,
  cekUpdateUser,
} = require("../../middlewares/middlewareUser/userMiddleware.js");
const verifyToken = require("../../middlewares/middlewareJWT/middlewareJWT.js");
const upload = require("../../middlewares/middlewareUser/middlewareMulter.js");

const router = express.Router();

router.post("/auth/register", cekRegister, cekError, register);
router.post("/auth/login", login);
router.post(
  "/masterdata/tambah/user",
  verifyToken(["admin"]),
  upload.single("profile"),
  cekCreateUser,
  cekError,
  createUser,
);
router.get("/masterdata/user", readUser);
router.patch(
  "/masterdata/user/update/:id",
  verifyToken(["user"]),
  upload.single("profile"),
  cekUpdateUser,
  cekError,
  updateUser,
);
router.patch("/masterdata/user/ubahPw", verifyToken(["user"]), updatePassword);
module.exports = router;
