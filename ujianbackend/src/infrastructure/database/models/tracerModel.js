import { koneksi } from "../db.js";
const getTracerId = async (id) => {
  const sql = `SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang WHERE id_tracer = ${id}`;

  const [data] = await koneksi.query(sql);
  return data;
};

const getTracer = async () => {
  const sql = "SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang";

  const [data] = await koneksi.query(sql);
  return data;
};

const addTracer = async (
  nama_barang,
  lokasi,
  deskripsi,
  status,
  kontak_pelapor
) => {
  const sql = `INSERT INTO tracer_barang (nama_barang, lokasi, deskripsi, status, kontak_pelapor) VALUES (?, ?, ?, ?, ?)`;
  const values = [nama_barang, lokasi, deskripsi, status, kontak_pelapor];
  const [data] = await koneksi.query(sql, values);
  return data;
};

const delTracer = async (id) => {
  const sql = `DELETE FROM tracer_barang WHERE id_tracer = ${id}`;

  const [data] = await koneksi.query(sql);
  return data;
};

const patchTracer = async (
  nama_barang,
  lokasi,
  deskripsi,
  status,
  kontak_pelapor,
  id
) => {
  const sql =
    "UPDATE tracer_barang SET nama_barang = ?, lokasi = ?, deskripsi = ?, status = ?, kontak_pelapor = ? WHERE id_tracer = ?";
  const values = [nama_barang, lokasi, deskripsi, status, kontak_pelapor, id];
  const [data] = await koneksi.query(sql, values);
  return data;
};

const cariData = async (key) => {
  const sql =
    "SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang WHERE nama_barang LIKE ? OR lokasi LIKE ?";
  const values = [`%${key}%`, `%${key}%`];
  const [data] = await koneksi.query(sql, values);
  return data;
};

const cariStatus = async (key) => {
  const sql = "SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang WHERE status LIKE ?";
  const values = [`%${key}%`];

  const [data] = await koneksi.query(sql, values);
  return data;
};

const cariSort = async (by, order) => {
  const sql = `SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang ORDER BY ${by} ${order}`;

  const [data] = await koneksi.query(sql);
  return data;
};

const tampilHilang = async () => {
  const sql =
    "SELECT COUNT(id_tracer) AS hilang FROM tracer_barang WHERE status= 'hilang'";

  const [data] = await koneksi.query(sql);
  return data[0].hilang;
};

const tampiltemu = async () => {
  const sql =
    "SELECT COUNT(id_tracer) AS ditemukan FROM tracer_barang WHERE status = 'ditemukan'";
  const [data] = await koneksi.query(sql);
  return data[0].ditemukan;
};

const tampilCountSemua = async () => {
  const sql = "SELECT COUNT(*) AS total_laporan FROM tracer_barang ";
  const [data] = await koneksi.query(sql);
  return data[0].total_laporan;
};
const tampilPersen = async () => {
  const sql =
    "SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang WHERE status = 'hilang'";
  const [data] = await koneksi.query(sql);
  return data[0].hilang;
};
export {
  getTracerId,
  getTracer,
  addTracer,
  delTracer,
  patchTracer,
  cariData,
  cariStatus,
  cariSort,
  tampilHilang,
  tampiltemu,
  tampilCountSemua,
  tampilPersen,
};
