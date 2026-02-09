require("dotenv");
const db = require("../../db/models/index.js");
const { User } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const {
  tambahUser,
  findUsername,
  tampilUser,
  cariUserById,
  ubahUser,
  hapusUser,
} = require("./serivce");
const { resSukses, resGagal } = require("../../payloads/paylad.js");
const token = require("../../payloads/toknJwt.js");

const register = async (req, res) => {
  try {
    const { nama, username, email, password, konfirmasi_password } = req.body;
    const salt = Number(process.env.BCRYPT_SALT);
    const passwordAcak = await bcrypt.hash(password, salt);
    const body = {
      nama,
      username,
      email,
      password: passwordAcak,
      "konfirmasi-password": konfirmasi_password,
    };
    await tambahUser(body);
    return resSukses(res, 201, "success", "User berhasil dibuat");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUsername(username);
    if (user === null) {
      return resGagal(res, 500, "error", "Maaf, username tidak ditemukan");
    }

    const passwordAcak = await bcrypt.compare(password, user.password);

    if (!passwordAcak) {
      return resGagal(res, 500, "error", "Maaf, password salah");
    }

    const aksesToken = token(user);
    const decode = jwt.verify(aksesToken, process.env.JWT_SECRET);

    return res.status(201).json({
      status: "success",
      message: "Login berhasil",
      token: aksesToken,
      user: {
        id: decode.id,
        username: decode.username,
        role: decode.role,
      },
    });
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { nama, username, email, password, role } = req.body;

    const salt = Number(process.env.BCRYPT_SALT);
    const passwrdAcak = await bcrypt.hash(password, salt);

    let profil = null;

    if (req.file) {
      profil = path.basename(req.file.path);
    }

    const body = {
      nama,
      username,
      email,
      password: passwrdAcak,
      role,
      profil,
    };
    const data = await tambahUser(body);
    return resSukses(res, 201, "success", "Data berhasil ditambahkan", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
const readUser = async (req, res) => {
  try {
    const data = await tampilUser();
    return resSukses(res, 200, "success", "Data user", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const user = req.user;

    const { nama, username, email } = req.body;
    const profil = req.file ? path.basename(req.file.path) : undefined;
    const dataNew = { nama, username, email, profil };
    if (req.file) {
      await cariUserById(req.user.id);
      if (user && user.profil) {
        const fotoLama = path.join(__dirname, "../../uploads", user.profil);
        try {
          await fs.access(fotoLama);
          await fs.unlink(fotoLama);
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    const data = await ubahUser(user.id, dataNew);
    return resSukses(res, 200, "success", "Data berhasil diubah", data);
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
const updatePassword = async (req, res) => {
  try {
    const { passwordLama, passwordBaru, konfirmasi_password } = req.body;
    if (konfirmasi_password !== passwordBaru) {
      return resGagal(
        res,
        400,
        "error",
        "konfirmasi password tidak sama dengan passwrod baru",
      );
    }
    const cariUser = await cariUserById(req.user.id);
    console.log(cariUser);
    const bandingPw = await bcrypt.compare(passwordLama, cariUser.password);
    if (!bandingPw) {
      return resGagal(res, 400, "error", "Password yang anda masukan salah!!");
    }
    const passwordAcak = await bcrypt.hash(passwordBaru, 10);
    const body = { password: passwordAcak };
    await ubahUser(req.user.id, body);
    return resSukses(res, 200, "success", "Password berhasil diubah");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    if (id !== userId) {
      return resGagal(
        res,
        400,
        "error",
        "Anda tidak bisa menghapus akun orang lain!!!",
      );
    }

    // if (req.user.role !== "admin") {
    //   return resGagal(res, 400, "error", "Hanya admin yang bisa menghapus!!!");
    // }
    await hapusUser(id);
    return resSukses(res, 201, "success", "Data berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, "error", error.message);
  }
};
module.exports = {
  register,
  login,
  createUser,
  readUser,
  updateUser,
  updatePassword,
  deleteUser,
};
