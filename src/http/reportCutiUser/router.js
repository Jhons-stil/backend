const express = require("express");
const {
  tampilUserCuti,
  cariByStatus,
  tampilUserKabag,
} = require("./controller");
const verifyToken = require("../../middlewares/middlewareJWT/middlewareJWT");

const router = express.Router();

router.get(
  "/user-cuti/:id",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  tampilUserCuti,
);
router.get(
  "/user-cuti/status/:status",
  verifyToken(["admin", "kabagppa", "kabagumum"]),
  cariByStatus,
);
router.get(
  "/user-approve/:id",
  verifyToken(["kabagppa", "kabagumum"]),
  tampilUserKabag,
);

module.exports = router;
