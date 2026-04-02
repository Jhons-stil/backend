const { resGagal } = require("../../payloads/paylad");

const cekEndpoint = (req, res) => {
  return resGagal(res, 404, "error", "Maaf, halaman tidak ditemukan");
};
module.exports = { cekEndpoint };
