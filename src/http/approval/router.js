const express = require("express");
const { createApprov, updateApprov, deleteApprov } = require("./controller");
const verifyToken = require("../../middlewares/middlewareJWT/middlewareJWT");
const cekApprov = require("../../middlewares/middlewareApproval/middlewareApproval");
const { cekError } = require("../../middlewares/middlewareUser/userMiddleware");

const router = express.Router();

router.post(
  "/create",
  verifyToken(["kabagppa", "kabagumum"]),
  cekApprov,
  cekError,
  createApprov,
);

router.patch(
  "/update/:id",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  cekApprov,
  cekError,
  updateApprov,
);
router.delete(
  "/delete/:id",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  deleteApprov,
);
module.exports = router;
