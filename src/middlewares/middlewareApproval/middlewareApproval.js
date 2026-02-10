const { body } = require("express-validator");

const cekApprov = [
  body("cutiId").notEmpty().withMessage("ID Cuti wajib diisi"),
  body("status").notEmpty().withMessage("Status wajib diisi"),
  body("catatan")
    .notEmpty()
    .withMessage("Catatan wajib diisi")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Catatan minimal 3 karakter"),
];

module.exports = cekApprov;
