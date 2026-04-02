const db = require("../../db/models/index.js");
const { Cuti, User, Approval, Karyawan } = db;

const cariUser = async (id) => {
  return await User.findByPk(id, {
    include: [
      {
        model: Cuti,
        as: "cuti",
        attributes: ["id", "tgl_mulai", "tgl_selesai", "alasan", "status"],
      },
    ],
  });
};

const cariCuti = async (status) => {
  return await Cuti.findAll({
    where: { status },
    attributes: ["tgl_mulai", "tgl_selesai", "alasan", "status"],
  });
};

const cariAppCuti = async (id) => {
  return await User.findByPk(id, {
    include: [
      {
        model: Approval,
        as: "approval",
        attributes: ["id", "catatan"],
        include: [
          { model: User, as: "user", attributes: ["id", "nama"] },
          {
            model: Cuti,
            as: "cuti",
            attributes: ["id", "tgl_mulai", "tgl_selesai", "alasan", "status"],
            include: [{ model: User, as: "user", attributes: ["id", "nama"] }],
          },
        ],
      },
    ],
  });
};

module.exports = {
  cariCuti,
  cariUser,
  cariAppCuti,
  // tampilKaryawan,
};
