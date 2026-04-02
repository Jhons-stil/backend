const express = require("express");
const {
  createKaryawan,
  readKaryawan,
  updateKaryawan,
  deleteKaryawan,
  cariById,
  readKaryawanProfile,
} = require("./controller");
const {
  cekCreate,
  cekId,
} = require("../../middlewares/middlewareKaryawan/middlewareKaryawan");
const { cekError } = require("../../middlewares/middlewareUser/userMiddleware");
const verifyToken = require("../../middlewares/middlewareJWT/middlewareJWT");
const {
  cekEndpoint,
} = require("../../middlewares/middlewareEndpoint/middlewareEndpoint");
const router = express.Router();

router.post(
  "/create",
  verifyToken(["admin"]),
  cekCreate,
  cekError,
  createKaryawan,
);
router.get("/", verifyToken(["admin"]), readKaryawan);
router.patch(
  "/update/:id",
  verifyToken(["admin"]),
  cekId,
  cekCreate,
  cekError,
  updateKaryawan,
);
router.delete("/delete/:id", verifyToken(["admin"]), cekId, deleteKaryawan);
router.get(
  "/profil",
  verifyToken(["admin", "user", "kabagppa", "kabagumum"]),
  readKaryawanProfile,
);
router.get("/:id", verifyToken(["admin"]), cekId, cariById);

module.exports = router;
