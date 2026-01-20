import { koneksi } from "../../../infrastructure/database/db.js";
import { responError } from "../../../shared/helpers/payload.js";
const cekId = async (req, res, next) => {
  const id = req.params.id;
  const [data] = await koneksi.query(
    "SELECT * FROM tracer_barang WHERE id_tracer = ? ",
    [id]
  );
  if (data.length === 0) {
    return responError(res, 400, "error", "Maaf, data tracer tidak ditemukan");
  }
  next();
};

const cekInput = async (req, res, next) => {
  const { nama_barang, lokasi, deskripsi, status, kontak_pelapor } = req.body;
  if (!nama_barang || !lokasi || !deskripsi || !status || !kontak_pelapor) {
    responError(
      res,
      400,
      "error",
      "Nama barang, Lokasi, Deskripsi, Status, Kontak pelapor wajib diisi"
    );
  }
  next();
};

const cekText = async (req, res, next) => {
  const { nama_barang, lokasi, deskripsi, status, kontak_pelapor } = req.body;

  if (
    nama_barang.length > 50 ||
    lokasi.length > 50 ||
    deskripsi.length > 50 ||
    status.length > 50 ||
    kontak_pelapor.length > 50
  ) {
    responError(
      res,
      400,
      "error",
      "Maaf, data nama barang terlalu panjang. Maksimal 50 karakter "
    );
  }
  next();
};

const cekDataDuplikat = async (req, res, next) => {
  const { nama_barang } = req.body;
  const { id } = req.params;

  const [data] = await koneksi.query(
    "SELECT * FROM tracer_barang WHERE nama_barang = ? AND id_tracer != ?",
    [nama_barang, id]
  );

  if (data.length > 0) {
    return responError(
      res,
      409,
      "error",
      `Nama barang (${nama_barang}) sudah digunakan oleh data lain`
    );
  }
  next();
};

const cekDuplikat = async (req, res, next) => {
  const { nama_barang } = req.body;

  const [data] = await koneksi.query(
    "SELECT * FROM tracer_barang WHERE nama_barang = ?",
    [nama_barang]
  );

  if (data.length > 0) {
    return responError(
      res,
      409,
      "error",
      `Nama barang sudah ada, silakan gunakan yang lain`
    );
  }
  next();
};

const cekKey = async (req, res, next) => {
  const { key } = req.query;
  const [data] = await koneksi.query(
    `SELECT * FROM tracer_barang WHERE nama_barang LIKE ? `,
    [`%${key}%`]
  );
  if (!key) {
    return responError(res, 400, "error", "Maaf, key tidak boleh kosong");
  }

  if (data.length === 0) {
    return responError(res, 400, "error", "Maaf, data tracer tidak ditemukan");
  }

  next();
};

const cekStatusKey = async (req, res, next) => {
  const { key } = req.query;
  const [data] = await koneksi.query(
    `SELECT * FROM tracer_barang WHERE status LIKE ? `,
    [`%${key}%`]
  );
  if (!key) {
    return responError(res, 400, "error", "Maaf, key tidak boleh kosong");
  }

  if (data.length === 0) {
    return responError(res, 400, "error", "Maaf, data tracer tidak ditemukan");
  }

  next();
};


export { cekId, cekInput, cekText, cekDataDuplikat, cekDuplikat, cekKey, cekStatusKey };
