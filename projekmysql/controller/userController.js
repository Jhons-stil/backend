import { koneksi } from "../config/db.js";
import { resError, resSuccess } from "../payload/res.js";

const getUser = async (req, res) => {
  // jalanin querynya
  try {
    // const sql = "SELECT * FROM user";
    // ini bisa di pecahkan jadi fungsi
    const data = await koneksi.query("SELECT * FROM user");
    // bisa juga kaya gini
    const a = data[0];
    return res.status(200).json({ message: "data user", a });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getId = async (req, res) => {
  try {
    const id = req.params.id;

    // jangan buat variable kek gini
    // const sql = `SELECT * FROM user WHERE id =${id} `;
    // const [data] = await koneksi.query(sql);

    // pake ini buat menghindari inject
    const [data] = await koneksi.query("SELECT * FROM user WHERE id = ?", [id]);

    return resSuccess(res, 200, "success", "Data berhasil ditemukan", data);
  } catch (error) {
    return resError(res, 500, "error", error.message);
  }
};

const hapusData = async (req, res) => {
  try {
    const id = req.params.id;

    const [data] = await koneksi.query("DELETE FROM `user` WHERE id = ?", [id]);

    return resSuccess(res, 200, "success", "Data berhasil dihapus");
  } catch (error) {
    return resError(res, 500, "error", error.message);
  }
};

const tambahData = async (req, res) => {
  try {
    const { username, email, status } = req.body;
    const [data] = await koneksi.query(
      "INSERT INTO `user` (username, email, status ) VALUES (?,?,?)",
      [username, email, status]
    );
    //  jika ingin menapilkan isi data yang udah dibuat pake cara ini
    const [dataId] = await koneksi.query("SELECT * FROM user WHERE id=?", [
      data.insertId,
    ]);

    return resSuccess(res, 201, "success", "Data berhasil ditambahkan", dataId);
  } catch (error) {
    return resError(res, 500, "error", error.message);
  }
};

const updateData = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, status } = req.body;

    const [data] = await koneksi.query(
      "UPDATE `user` SET `username` = ?, `email` = ?, `status` = ? WHERE id = ?",
      [username, email, status, id]
    );

    return resSuccess(res, 200, "success", "Data berhasil di update");
  } catch (error) {
    return resError(res, 400, "error", error.message);
  }
};
// affectedRows = fitur update dan delete
// insertId = itu sama kaya id yang ada di database
// pelajari regex

export { getUser, getId, hapusData, tambahData, updateData };
