const db = require("../../db/models/index.js");
const { Approval } = db;

const tampilApprov = async () => {
  return await Approval.findAll();
};

const cariApprovById = async (id) => {
  return await Approval.findByPk(id);
};

const tambahApprov = async (body) => {
  return await Approval.create(body);
};

const ubahApprov = async (id, body) => {
  const data = await Approval.findByPk(id);
  if (!data) return null;

  return await data.update(body);
};

const hapusApprov = async (id) => {
  return await Approval.destroy({
    where: { id: id },
  });
};
const byId = async (id) => {
  return await Approval.findOne({ where: { cutiId: id } });
};

module.exports = {
  tambahApprov,
  tampilApprov,
  cariApprovById,
  ubahApprov,
  hapusApprov,
  byId,
};
