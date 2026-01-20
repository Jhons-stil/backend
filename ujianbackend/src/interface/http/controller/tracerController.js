import { responSukses, responError } from "../../../shared/helpers/payload.js";
import { koneksi, cekKoneksi } from "../../../infrastructure/database/db.js";
import {
  addTracer,
  cariData,
  cariSort,
  cariStatus,
  delTracer,
  getTracer,
  getTracerId,
  patchTracer,
  tampilCountSemua,
  tampilHilang,
  tampilPersen,
  tampiltemu,
} from "../../../infrastructure/database/models/tracerModel.js";
const getId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getTracerId(id);
    return responSukses(res, 200, "success", "Data Tracer", result);
  } catch (error) {
    return responError(res, 500, error.message);
  }
};

const getDataTracer = async (req, res) => {
  try {
    const result = await getTracer();
    return responSukses(res, 200, "success", "Data Tracer", result);
  } catch (error) {
    return responError(res, 500, "error", error.message);
  }
};

const createTracer = async (req, res) => {
  try {
    const { nama_barang, lokasi, deskripsi, status, kontak_pelapor } = req.body;
    const result = await addTracer(
      nama_barang,
      lokasi,
      deskripsi,
      status,
      kontak_pelapor
    );

    const [data] = await koneksi.query(
      "SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang WHERE id_tracer = ?",
      [result.insertId]
    );

    return responSukses(res, 200, "success", "Data berhasil ditambahkan", data);
  } catch (error) {
    return responError(res, 400, "error", error.message);
  }
};

const deleteTracer = async (req, res) => {
  try {
    const id = req.params.id;
    await delTracer(id);

    return responSukses(res, 200, "success", "Data berhasil di hapus", null);
  } catch (error) {
    return responError(res, 400, "error", error.message);
  }
};

const updateTracer = async (req, res) => {
  try {
    const { nama_barang, lokasi, deskripsi, status, kontak_pelapor } = req.body;
    const id = req.params.id;
    await patchTracer(
      nama_barang,
      lokasi,
      deskripsi,
      status,
      kontak_pelapor,
      id
    );
    const [data] = await koneksi.query(
      "SELECT *, DATE_FORMAT(tgl_lapor, '%y-%m-%d') as tgl_lapor FROM tracer_barang WHERE id_tracer = ?",
      [id]
    );
    return responSukses(res, 200, "success", "Data berhasil diubah", data);
  } catch (error) {
    return responError(res, 400, "error", error.message);
  }
};

const carTracer = async (req, res) => {
  try {
    const { key } = req.query;
    const result = await cariData(key);

    return responSukses(res, 200, "success", "Hasil pencarian tracer", result);
  } catch (error) {
    return responError(res, 500, "error", error.message);
  }
};

const getStatus = async (req, res) => {
  try {
    const { key } = req.query;
    const result = await cariStatus(key);
    return responSukses(
      res,
      200,
      "success",
      "Hasil pencarian status tracer",
      result
    );
  } catch (error) {
    return responError(res, 500, "error", error.message);
  }
};

const getbyOrder = async (req, res) => {
  const { by, order } = req.query;
  const result = await cariSort(by, order);

  return responSukses(res, 200, "success", "Data tracer", result);
};

const getStatistik = async (req, res) => {
  try {
    const hilang = await tampilHilang();
    const temu = await tampiltemu();
    const semua = await tampilCountSemua();

    const data = {
      total_laporan: semua,
      hilang: hilang,
      ditemukan: temu,
    };

    return responSukses(res, 200, "success", "Statistik Data Tracer", data);
  } catch (error) {
    return responError(res, 500, "error", error.message);
  }
};

const getDashboard = async (req, res) => {
  try {
    const semua = await getTracer();
    const hilang = await tampilHilang();
    const temu = await tampiltemu();
    const countSemua = await tampilCountSemua();

    const data = {
      data_barang: semua,
      statistik: {
        total_laporan: countSemua,
        hilang: hilang,
        temu: temu,
      },
    };
    return responSukses(res, 200, "success", "Dashboar Tracer App", data);
  } catch (error) {
    return responError(res, 500, "error", error.message);
  }
};
const getPersen = async (req, res) => {
  try {
    const result = await tampilPersen();
    const hilang = await tampilHilang();
    const temu = await tampiltemu();
    const countSemua = await tampilCountSemua();
    const hasilHilang = (hilang / countSemua) * 100;
    const hasiTemu = (temu / countSemua) * 100;
    const data = {
      total_laporan: countSemua,
      hilang: hilang,
      temu: temu,
      persentase: {
        hilang: `${hasilHilang.toFixed(2)}%`,
        ditemukan: `${hasiTemu.toFixed(2)}%`,
      },
    };
    return responSukses(res, 200, "success", "Dashboard Tracep App", data);
  } catch (error) {
    return responError(res, 500, "error", error.message);
  }
};
export {
  getId,
  getDataTracer,
  createTracer,
  deleteTracer,
  updateTracer,
  carTracer,
  getStatus,
  getbyOrder,
  getStatistik,
  getDashboard,
  getPersen,
};
