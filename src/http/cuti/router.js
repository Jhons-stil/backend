const express = require("express");
const { createCuti, updateKaryawan, deleteCuti } = require("./controller");
const verifyToken = require("../../middlewares/middlewareJWT/middlewareJWT");
const cekCreate = require("../../middlewares/middlewareCuti/middlewareCuti");
const { cekError } = require("../../middlewares/middlewareUser/userMiddleware");

const router = express.Router();

router.post("/create", verifyToken(["user"]), cekCreate, cekError, createCuti);
router.patch(
  "/update/:id",
  verifyToken(["user"]),
  cekCreate,
  cekError,
  updateKaryawan,
);
router.delete("/delete/:id", verifyToken(["user"]), deleteCuti);
module.exports = router;
