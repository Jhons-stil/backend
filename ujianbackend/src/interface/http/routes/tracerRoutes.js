import express from "express";
import {
  carTracer,
  createTracer,
  deleteTracer,
  getbyOrder,
  getDashboard,
  getDataTracer,
  getId,
  getPersen,
  getStatistik,
  getStatus,
  updateTracer,
} from "../controller/tracerController.js";
import {
  cekDataDuplikat,
  cekDuplikat,
  cekId,
  cekInput,
  cekKey,
  cekStatusKey,
  cekText,
} from "../middleware/tracerMiddleware.js";

const router = express.Router();

router.get("/cari/:id", cekId, getId);
router.get("/", getDataTracer);
router.post("/tambah", cekInput, cekText, cekDuplikat, createTracer);
router.delete("/hapus/:id", cekId, deleteTracer);
router.patch(
  "/ubah/:id",
  cekId,
  cekInput,
  cekText,
  cekDataDuplikat,
  updateTracer
);
router.get("/search", cekKey, carTracer);
router.get("/status", cekStatusKey, getStatus);
router.get("/sort", getbyOrder);
router.get("/statistik", getStatistik);
router.get("/dashboard", getDashboard);
router.get("/statistik/presentase", getPersen);
export default router;
