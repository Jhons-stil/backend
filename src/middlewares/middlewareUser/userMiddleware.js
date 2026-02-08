const { validationResult, body } = require("express-validator");
const { resGagal } = require("../../payloads/paylad");
const db = require("../../db/models/index.js");
const { User } = db;
const cekError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const arrayError = errors.array().map((err) => {
      return {
        field: err.path,
        message: err.msg,
      };
    });
    return resGagal(res, 400, "error", "Terjadi kesalahan", arrayError);
  }
  next();
};

const cekRegister = [
  body("nama").notEmpty().withMessage("Nama wajib diisi"),
  body("username")
    .notEmpty()
    .withMessage("Username wajib diisi")
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });

      if (user) {
        throw new Error("Username sudah ada, silakan isi yang lain");
      }
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Format email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("konfirmasi-password")
    .notEmpty()
    .withMessage("Konfirmasi password wajib diisi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Konfirmasi password tidak sama dengan password");
      }
      return true;
    }),
];

const cekCreateUser = [
  body("nama").notEmpty().withMessage("Nama wajib diisi"),
  body("username")
    .notEmpty()
    .withMessage("Username wajib diisi")
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });

      if (user) {
        throw new Error("Username sudah ada, silakan isi yang lain");
      }
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Format email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
];

const cekUpdateUser = [
  body("nama")
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Nama minimla 5 karakter"),
  body("username")
    .notEmpty()
    .withMessage("Username wajib diisi")
    .isLength({ min: 5 })
    .bail()
    .withMessage("Username minimal 5 karakter"),
  body("email")
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Format email tidak valid"),
];

module.exports = {
  cekRegister,
  cekCreateUser,
  cekUpdateUser,
  cekError,
};
