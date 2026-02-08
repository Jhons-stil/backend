const db = require("../../db/models/index.js");
const { Cuti } = db;

const tampilCuti = async () => {
  return await Cuti.findAll();
};

const cariCutiById = async (id) => {
  return await Cuti.findByPk(id);
};

const tambahCuti = async (body) => {
  return await Cuti.create(body);
};

const ubahCuti = async (id, body) => {
  const data = await Cuti.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusCuti = async (id) => {
  return await Cuti.destroy({
    where: { id_buku: id },
  });
};
const byId = async (id) => {
  return await Cuti.findByPk(id);
};

module.exports = {
  tambahCuti,
  tampilCuti,
  cariCutiById,
  ubahCuti,
  hapusCuti,
  byId,
};
