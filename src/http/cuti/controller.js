const { resSukses, resGagal } = require("../../payloads/paylad");

const { tambahCuti, ubahCuti, cariCutiById, hapusCuti } = require("./serivce");

const createCuti = async (req, res) => {
  try {
    const user = req.user;
    console.log(user.id);

    const { tgl_mulai, tgl_selesai, alasan } = req.body;
    const body = { tgl_mulai, tgl_selesai, alasan, userId: user.id };

    await tambahCuti(body);
    return resSukses(res, 201, "Data cuti berhasil ditambahkan");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateKaryawan = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const dataCuti = await cariCutiById(id);

    if (!dataCuti) {
      return resGagal(res, 403, "Maaf, data cuti tidak ditemukan");
    }

    if (dataCuti.userId !== userId) {
      return resGagal(res, 403, "Maaf, akses ditolak");
    }

    const { tgl_mulai, tgl_selesai, alasan } = req.body;
    const body = { tgl_mulai, tgl_selesai, alasan, userId: userId };
    await ubahCuti(id, body);
    return resSukses(
      res,
      200,
      "success",
      `Data cuti id-(${userId}) berhasil diubah`,
    );
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteCuti = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const dataCuti = await cariCutiById(id);

    if (!dataCuti) {
      return resGagal(res, 403, "Maaf, data cuti tidak ditemukan");
    }

    if (dataCuti.userId !== userId) {
      return resGagal(res, 403, "Maaf, akses ditolak");
    }
    await hapusCuti(id);
    return resSukses(res, 200, "success", "Data berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
module.exports = {
  createCuti,
  updateKaryawan,
  deleteCuti,
};
