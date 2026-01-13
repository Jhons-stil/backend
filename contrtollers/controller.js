import { peserta, acara } from "../model/data.js";
import { resSukess, resGagal } from "../response/res.js";

const getAllPeserta = (req, res) => {
  return resSukess(res, 200, "success", "Data peserta", peserta);
};

const getAllAcara = (req, res) => {
  return resSukess(res, 200, "success", "Data acara", acara);
};

const postAcara = (req, res) => {
  resSukess(res, 200, "success", "Data acara berhasil dibuat");
};

const updateAcara = (req, res) => {
  resSukess(res, 200, "success", "Data berhasil di update");
};

const delAcara = (req, res) => {
  return resSukess(res, 200, "success", "Data berhasil dihapus");
};

const joinAcara = (req, res) => {
  return resSukess(res, 200, "success", "Peserta berhasil ditambahkan", acara);
};

const acaraDetail = (req, res) => {
  const acara = req.acara;

  
  const serta = peserta.filter((p) => acara.peserta.includes(p.id));

  const detail = {
    ...acara,
    peserta: serta,
  };
  return resSukess(res, 200, "success", "Detail acara", detail);
};

export {
  getAllPeserta,
  getAllAcara,
  postAcara,
  updateAcara,
  delAcara,
  joinAcara,
  acaraDetail,
};
