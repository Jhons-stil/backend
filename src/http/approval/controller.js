const { resSukses, resGagal } = require("../../payloads/paylad");
const { ubahCuti, cariCutiById } = require("../cuti/serivce");
const {
  tambahApprov,
  cariApprovById,
  byId,
  ubahApprov,
  hapusApprov,
} = require("./serivce");

const createApprov = async (req, res) => {
  try {
    const { cutiId, status, catatan } = req.body;
    const userId = req.user.id;

    const cariIdCuti = await byId(cutiId);

    if (cariIdCuti) {
      return resGagal(res, 400, "error", "Maaf, data cuti sudah ada");
    }

    const dataCuti = await cariCutiById(cutiId);

    if (!dataCuti) {
      return resGagal(res, 403, "error", "Maaf, data cuti tidak ditemukan");
    }

    await ubahCuti(cutiId, { status: status });
    const body = {
      cutiId,
      userId: userId,
      catatan,
    };

    await tambahApprov(body);
    return resSukses(res, 201, "success", "Data approval berhasil ditambahkan");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const updateApprov = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { cutiId, status, catatan } = req.body;

    const dataApproval = await cariApprovById(id);

    if (!dataApproval) {
      return resGagal(res, 400, "error", "Maaf, data approval tidak ditemukan");
    }

    if (dataApproval.userId !== userId) {
      return resGagal(res, 400, "error", "Maaf, akses ditolak");
    }
    await ubahCuti(cutiId, { status: status });
    const body = { cutiId, status, catatan, updatedBy: userId };
    await ubahApprov(id, body);
    return resSukses(res, 200, "success", "Data approval berhasil di update");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const deleteApprov = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const dataApproval = await cariApprovById(id);

    if (!dataApproval) {
      return resGagal(res, 400, "error", "Maaf, data approval tidak ditemukan");
    }

    if (dataApproval.userId !== userId) {
      return resGagal(res, 400, "error", "Maaf, akses ditolak");
    }
    await hapusApprov(id);
    return resSukses(res, 200, "success", "Data approval berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
module.exports = {
  createApprov,
  updateApprov,
  deleteApprov,
};
