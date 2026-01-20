import express from "express";
import {
  hapusData,
  getId,
  getUser,
  tambahData,
  updateData,
} from "../controller/userController.js";
import { cekId, cekInput } from "../middleware/userMiddleware.js";

const router = express.Router();

// ini bagian method HTTP
router.get("/", getUser);
router.get("/cari/:id", cekId, getId);
router.post("/tambah", cekInput, tambahData);
router.delete("/hapus/:id", cekId, hapusData);
router.patch("/update/:id", cekId, cekInput, updateData);

export default router;
