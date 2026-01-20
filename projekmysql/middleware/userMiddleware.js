import { koneksi } from "../config/db.js";
import { resError } from "../payload/res.js";

const cekId = async (req, res, next) => {
  const id = req.params.id;
  const [data] = await koneksi.query("SELECT * FROM user WHERE id = ?", [id]);

  if (data.length === 0) {
    return resError(res, 404, "error", "Data tidak ditemukan");
  }
  next();
};

const cekInput = async (req, res, next) => {
  const { username, email, status } = req.body;

  if (!username || !email || !status) {
    return resError(res, 400, "error", "username , email, status harus diisi");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return resError(res, 500, "error", "Format email tidak valid");
  }
  next();
};

export { cekId, cekInput };
