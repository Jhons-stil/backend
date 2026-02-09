const { body } = require("express-validator");
const db = require("../../db/models/index.js");

const { resGagal } = require("../../payloads/paylad.js");
const { byId } = require("../../http/karyawan/serivce.js");
const { Karyawan } = db;

const cekCreate = [
  body("nama_karyawan").notEmpty().withMessage("Nama wajib diisi"),
  body("username")
    .notEmpty()
    .withMessage("Username wajib diisi")
    .custom(async (value) => {
      const user = await Karyawan.findOne({ where: { username: value } });

      if (user) {
        throw new Error("Username sudah ada, silakan isi yang lain");
      }
      return true;
    }),
  body("jabatan").notEmpty().withMessage("Jabatan wajib diisi"),
  body("alamat").notEmpty().withMessage("Alamat wajib diisi"),
];

const cekId = async (req, res, next) => {
  const id = req.params.id;
  const regexId = /^\d+$/;

  if (!regexId.test(id)) {
    return resGagal(res, 400, "error", `id ${id} tidak ada`);
  }
  const karyawanId = parseInt(id);
  const data = await byId(karyawanId);
  if (!data) {
    return resGagal(res, 400, "error", "Karyawan tidak ditemukan");
  }
  next();
};
module.exports = {
  cekCreate,
  cekId,
};
