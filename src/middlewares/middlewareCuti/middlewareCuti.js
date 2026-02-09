const { body } = require("express-validator");

const cekCreate = [
  body("tgl_mulai").notEmpty().withMessage("Tanggal mulai wajib diisi"),
  body("tgl_selesai")
    .notEmpty()
    .withMessage("Tanggal selesai wajib diisi")
    .bail()
    .custom((values, { req }) => {
      const tglMulai = new Date(req.body.tgl_mulai);
      const tglSelesai = new Date(values);

      if (tglSelesai <= tglMulai) {
        throw new Error(
          "Maaf, tanggal selesai harus lebih besar dari tanggal mulai",
        );
      }
      return true;
    }),
  body("alasan").notEmpty().withMessage("Alasan wajib diisi"),
];

module.exports = cekCreate;
