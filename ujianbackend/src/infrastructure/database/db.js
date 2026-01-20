import mysql from "mysql2/promise";

const koneksi = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "passwordroot",
  database: "2026_ujian",
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

const cekKoneksi = async () => {
  try {
    const result = await koneksi.getConnection();
    console.log(result);

    console.log("Koneksi ke database berhasil!");
    result.release();
    return true;
  } catch (error) {
    console.log("Gagal konek ke database:", error.message);
  }
};

export { cekKoneksi, koneksi };
