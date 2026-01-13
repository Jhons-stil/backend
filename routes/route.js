import express from "express";
import {
  getAllPeserta,
  getAllAcara,
  postAcara,
  updateAcara,
  delAcara,
  joinAcara,
  acaraDetail,
} from "../contrtollers/controller.js";
import {
  cekAcaraDetail,
  cekDeleteAcara,
  cekJoinAcara,
  cekPostAcara,
  cekUpdateAcara,
} from "../middleware/cekAkses.js";

const route = express.Router();

route.get("/peserta", getAllPeserta);
route.get("/acara", getAllAcara);
route.post("/post/acara", cekPostAcara, postAcara);
route.patch("/update/acara/:id", cekUpdateAcara, updateAcara);
route.delete("/hapus/acara/:id", cekDeleteAcara, delAcara);
route.post("/join/acara/:id", cekJoinAcara, joinAcara);
route.get("/acara/detail/:id",cekAcaraDetail, acaraDetail);
export default route;
