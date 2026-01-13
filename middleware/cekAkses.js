import { resGagal } from "../response/res.js";
import { acara } from "../model/data.js";

const cekPostAcara = (req, res, next) => {
  const { nama_acara, tanggal, kuota } = req.body;

  const newAcara = {
    id: acara.length + 1,
    nama_acara,
    tanggal,
    kuota,
    peserta: [],
  };

  if (!nama_acara || !tanggal || !kuota) {
    return resGagal(
      res,
      403,
      "error",
      "Nama, Tanggal, Kuota tidak boleh kosong"
    );
  }

  const namaAcara = acara.find(
    (item) => item.nama_acara === newAcara.nama_acara
  );

  if (namaAcara) {
    return resGagal(
      res,
      400,
      "error",
      `Acara ${newAcara.nama_acara} sudah terdaftar`
    );
  }
  acara.push(newAcara);
  next();
};

const cekUpdateAcara = (req, res, next) => {
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
  next();
};

const cekDeleteAcara = (req, res, next) => {
  const id = req.params.id;
  const parse = acara.findIndex((acr) => acr.id === parseInt(id));
  if (parse === -1) {
    return resGagal(res, 404, "error", "Data tidak ditemukan");
  }

  acara.splice(parse, 1);
  next();
};
const cekJoinAcara = (req, res, next) => {
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
  next();
};

const cekAcaraDetail = (req, res, next) => {
  const id = req.params.id;
  const parse = acara.find((acr) => acr.id === parseInt(id));

  if (!parse) {
    return resGagal(res, 404, "error", "Maaf, data acara tidak ditemukan");
  }

  req.acara = parse;
  
  next();
};
export {
  cekPostAcara,
  cekUpdateAcara,
  cekDeleteAcara,
  cekJoinAcara,
  cekAcaraDetail,
};
