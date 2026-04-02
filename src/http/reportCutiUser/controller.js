const { Sequelize } = require("sequelize");
const db = require("../../db/models/index.js");
const { resGagal, resSukses } = require("../../payloads/paylad.js");
const {
  cariCuti,
  cariUser,
  cariAppCuti,
  tampilKaryawan,
} = require("./service.js");
const { User, Cuti } = db;
const tampilUserCuti = async (req, res) => {
  try {
    const id = req.params.id;
    const userr = await cariUser(id);
    // console.log(userr);

    const listCuti = userr.cuti;
    if (!listCuti || listCuti.length === 0) {
      return resGagal(
        res,
        404,
        "error",
        `Maaf, data cuti dari user-id ${id} tidak ditemukan`,
      );
    }
    const setuju = listCuti.filter((c) => c.status === "disetujui").length;
    const tolak = listCuti.filter((c) => c.status === "ditolak").length;
    const pending = listCuti.filter((c) => c.status === "pending").length;

    const data = {
      id: userr.id,
      total_cuti: listCuti.length,
      total_disetujui: setuju,
      total_ditolak: tolak,
      total_pending: pending,
      detail: listCuti,
    };
    return resSukses(res, 200, "success", "Data cuti", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const cariByStatus = async (req, res) => {
  try {
    const status = req.params.status;

    const listCuti = await cariCuti(status);

    const data = {
      total: listCuti.length,
      detail: listCuti,
    };
    return resSukses(res, 200, "success", "Data status cuti", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const tampilUserKabag = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await cariAppCuti(id);

    const listApprov = user.approval;

    if (user.role !== "kabagppa" && user.role !== "kabagumum") {
      return resGagal(res, 404, "error", "Maaf, akses ditolak");
    }

    if (listApprov.length === 0) {
      return resGagal(
        res,
        404,
        "error",
        "Maaf, belum ada data approval oleh kepala bagian ini",
      );
    }

    const setuju = listApprov.filter(
      (c) => c.cuti.status === "disetujui",
    ).length;
    const tolak = listApprov.filter((c) => c.cuti.status === "ditolak").length;
    const pending = listApprov.filter(
      (c) => c.cuti.status === "pending",
    ).length;

    const data = {
      kabagId: user.id,
      total_approval: listApprov.length,
      total_disetujui: setuju,
      total_ditolak: tolak,
      total_pending: pending,
      detail: listApprov,
    };
    // console.log(data);
    return resSukses(res, 200, "success", "Data approval", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

module.exports = {
  tampilUserCuti,
  cariByStatus,
  tampilUserKabag,
  // readKaryawan,
};
