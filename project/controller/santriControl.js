import { data } from "../model/data.js";
import { responSukses, responGagal } from "../response/res.js";

// ini nanti isinya adalah fungsi fungsi
// yang digunakan untuk mengelola logika proses
// dalam kasus ini berati kita akan membuat fungsi
// nampilin data, get id, update, delete

const getAllData = (req, res) => {
  return responSukses(res, 200, "Data santri", data);
};

const getById = (req, res) => {
  const id = req.params.id;
  const result = data.find((snt) => snt.id === parseInt(id));
  if (!result) {
    return responGagal(res, 404, "Data tidak ditemukan");
  }
  return responSukses(res, 200, "Data Berhasil ditampilkan", result);
};

const getByName = (req, res) => {
  const ceknama = req.query.nama;
  if (!ceknama) {
    return responSukses(res, 200, "Data santri", data);
  } else {
    const hasil = data.find((tri) => tri.nama === ceknama);
    if (hasil) {
      return responSukses(res, 200, "Data berhasil ditambahkan", hasil);
    } else {
      return responGagal(res, 404, "Data tidak ditemukan");
    }
  }
};

const postData = (req, res) => {
  const { nama, nilai } = req.body;

  const dataBaru = { id: data.length + 1, nama, nilai };
  data.push(dataBaru);
  if (!dataBaru) {
    return responGagal(res, 404, "Data belum ditambahkan");
  }
  return responSukses(res, 201, "Data berhasil ditambahkan", data);
};

const updateData = (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, nilai } = req.body;

  const dataUpdate = data.findIndex((item) => item.id === id);

  data.splice(dataUpdate, 1, { id, nama, nilai });

  if (dataUpdate === -1) {
    return responGagal(res, 404, "Data tidak ditemukan");
  }
  return responSukses(res, 200, "Data berhasil di Update", data);
};

const deleteData = (req, res) => {
  const id = req.params.id;
  const parse = data.findIndex((d) => d.id === parseInt(id));
  if (parse === -1) {
    responGagal(res, 404, "Data tidak ditemukan");
  }

  data.splice(parse, 1);
  responSukses(res, 200, "Data berhasil dihapus", data);
};

const highScore = (req, res) => {
  const nilaiTinggi = data.reduce((add, curr) => {
    return curr.nilai > add.nilai ? curr : add;
  });

  responSukses(res, 200, "nilai tertinggi berhasil diambil", nilaiTinggi);
};

const dataLulus = (req, res) => {
  const min = req.query.min;

  const lulus = data.filter((item) => item.nilai > parseInt(min));
  
  return responSukses(res, 200, "Data yang nilainya diatas 75 lulus", lulus);
  
};

const dataNoLulus = (req, res)=>{
    const tidakLulus = data.filter((san) => san.nilai < 75);
    return responSukses(res, 200, "Data yang nilainya 75", tidakLulus);
  
    
}

export {
  getAllData,
  getById,
  getByName,
  postData,
  updateData,
  deleteData,
  highScore,
  dataLulus,
  dataNoLulus
};
