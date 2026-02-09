const { resSukses, resGagal } = require("../../payloads/paylad");
const {
  tambahKaryawan,
  tampilKaryawan,
  hapusKaryawan,
  ubahKaryawan,
  cariKaryawanById,
} = require("./serivce");

require("bcrypt");

const createKaryawan = async (req, res) => {
  try {
    const { nama_karyawan, username, jabatan, alamat } = req.body;

    const body = { nama_karyawan, username, jabatan, alamat };
    const data = await tambahKaryawan(body);
    return resSukses(res, 201, "success", "Data berhasil dibuat", data);
  } catch (error) {
    return resGagal(res, "error", error.message);
  }
};

const readKaryawan = async (req, res) => {
  try {
    const data = await tampilKaryawan();
    return resSukses(res, 200, "success", "Data karyawan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateKaryawan = async (req, res) => {
  try {
    const id = req.params.id;
    const { nama_karyawan, username, jabatan, alamat } = req.body;
    const body = { nama_karyawan, username, jabatan, alamat };
    await ubahKaryawan(id, body);
    return resSukses(res, 201, "success", "Data berhasil di ubah");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
const deleteKaryawan = async (req, res) => {
  try {
    const id = req.params.id;
    await hapusKaryawan(id);
    return resSukses(res, 201, "success", "Data berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const cariById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cariKaryawanById(id);
    return resSukses(res, 201, "success", "Data Karyawan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  createKaryawan,
  readKaryawan,
  updateKaryawan,
  deleteKaryawan,
  cariById,
};
