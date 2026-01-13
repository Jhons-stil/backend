import { peserta, acara } from "../model/data.js";
import { resSukess, resGagal } from "../response/res.js";

const getAllPeserta = (req, res) => {
  return resSukess(res, 200, "success", "Data peserta", peserta);
};

const getAllAcara = (req, res) => {
  return resSukess(res, 200, "success", "Data acara", acara);
};

const postAcara = (req, res) => {
  const { nama_acara, tanggal, kuota } = req.body;

  const newAcara = {
    id: acara.length + 1,
    nama_acara,
    tanggal,
    kuota,
    peserta: [],
  };

  const namaAcara = acara.find(
    (item) => item.nama_acara === newAcara.nama_acara
  );

  if (!nama_acara || !tanggal || !kuota) {
    return resGagal(
      res,
      400,
      "error",
      "Nama, Tanggal, Kuota tidak boleh kosong"
    );
  } else if (namaAcara) {
    return resGagal(
      res,
      400,
      "error",
      `Acara ${newAcara.nama_acara} sudah terdaftar`
    );
  }
  acara.push(newAcara);

  return resSukess(res, 200, "success", "Data acara berhasil dibuat");
};

const updateAcara = (req, res) => {
  const id = req.params.id;
  const { nama_acara, tanggal, kuota } = req.body;

  const cariId = acara.findIndex((acr) => acr.id === parseInt(id));

  if (cariId === -1) {
    return resGagal(res, 404, "error", "Data tidak ditemukan");
  }

  const dataLama = acara[cariId];

  const newData = {
    id: dataLama.id,
    nama_acara,
    tanggal,
    kuota,
    peserta: dataLama.peserta,
  };

  if (!nama_acara || !tanggal || !kuota) {
    return resGagal(
      res,
      400,
      "error",
      "Nama, Tanggal, Kuota tidak boleh kosong"
    );
  }

  acara.splice(cariId, 1, newData);

  return resSukess(res, 200, "success", "Data berhasil di update");
};

const delAcara = (req, res) => {
  const id = req.params.id;
  const parse = acara.findIndex((acr) => acr.id === parseInt(id));
  if (parse === -1) {
    return resGagal(res, 404, "error", "Data tidak ditemukan");
  }

  acara.splice(parse, 1);
  return resSukess(res, 200, "success", "Data berhasil dihapus");
};

const joinAcara = (req, res) => {
  const id = req.params.id;
  const { pesertaId } = req.body;

  const parse = acara.findIndex((acr) => acr.id === parseInt(id));

  if (parse === -1) {
    return resGagal(res, 404, "error", "Maaf, data acara tidak ditemukan");
  }

  const objekAcara = acara[parse];
  const idPeserta = acara.find((acr) => acr.id === pesertaId);

  if (!idPeserta) {
    return resGagal(res, 404, "error", "Maaf, Data peserta tidak ditemukan");
  }

  if (objekAcara.peserta.length >= acara[parse].kuota) {
    return resGagal(res, 404, "error", "Maaf kuota sudah penuh");
  }

  if (objekAcara.peserta.includes(pesertaId)) {
    return resGagal(res, 404, "error", "Maaf, peserta sudah terdaftar");
  }

  objekAcara.peserta.push(pesertaId);
  return resSukess(res, 200, "success", "Peserta berhasil ditambahkan", acara);
};

const acaraDetail = (req, res) => {
  const id = req.params.id;
  const parse = acara.find((acr) => acr.id === parseInt(id));

  if (!parse) {
    return resGagal(res, 404, "error", "Maaf, data acara tidak ditemukan");
  }

  const serta = peserta.filter((p) => parse.peserta.includes(p.id));

  const detail = {
    ...parse,
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
