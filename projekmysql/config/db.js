// import library mysql nya
import mysql from "mysql2/promise";

// variable koneksi ini, cuma buat konfig susunan koneksinya
// nah kalo konfig sudah dibuat maka perlu di cek koneksinya
// sudah bener atau masih salah
const koneksi = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "passwordroot",
  database: "db_praktikum2026",

  //   ini kaya mau buat antrian untuk koneksi berikutnya
  waitForConnections: true,

  //   maksimal koneksi yang bisa dibuat dalam 1 waktu
  connectionLimit: 10,

  //   kalau di isi 0, maka antrian koneksinya unlimited
  queueLimit: 0,
});

const cekKoneksi = async () => {
  try {
    // jalankan perintah koneksinya
    const hasil = await koneksi.getConnection();
    console.log("koneksi sedang dijalankan");

    // lepas koneksi, jika sudah sudah berhasil dijalankan dan sudah dipakai
    hasil.release();
    return true;
  } catch (error) {
    console.log("Gagal", error.message);
  }
};

export { koneksi, cekKoneksi };
