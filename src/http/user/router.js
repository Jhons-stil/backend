const express = require("express");
const {
  register,
  login,
  createUser,
  readUser,
  updateUser,
  updatePassword,
  deleteUser,
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
  upload.single("profil"),
  cekCreateUser,
  cekError,
  createUser,
);
router.get("/masterdata/user", verifyToken(["admin"]), readUser);
router.patch(
  "/masterdata/user/update",
  verifyToken(["admin", "user", "kabagppa", "kabagumum"]),
  upload.single("profil"),
  cekUpdateUser,
  cekError,
  updateUser,
);
router.patch(
  "/masterdata/user/ubahPw",
  verifyToken(["admin", "user", "kabagppa", "kabagumum"]),
  updatePassword,
);
router.delete(
  "/masterdata/user/delete/:id",
  verifyToken(["admin", "user", "kabagppa", "kabagumum"]),
  deleteUser,
);
module.exports = router;
