const db = require("../../db/models/index.js");
const { Karyawan } = db;

const tampilKaryawan = async () => {
  return await Karyawan.findAll();
};

const cariKaryawanById = async (id) => {
  return await Karyawan.findByPk(id);
};

const tambahKaryawan = async (body) => {
  return await Karyawan.create(body);
};

const ubahKaryawan = async (id, body) => {
  const data = await Karyawan.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusKaryawan = async (id) => {
  return await Karyawan.destroy({
    where: { id: id },
  });
};
const byId = async (id) => {
  return await Karyawan.findByPk(id);
};

module.exports = {
  tambahKaryawan,
  tampilKaryawan,
  cariKaryawanById,
  ubahKaryawan,
  hapusKaryawan,
  byId,
};
