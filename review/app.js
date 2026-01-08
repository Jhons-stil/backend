import express from "express";
import { data } from "./models/data.js";

const app = express();

// ini wajib ada kalau mau menerima kiriman data json
app.use(express.json());

app.get("/", (req, res) => {
  // style 1
  // res.json({ message: "Sukes", data });

  // style 2
  res.status(200).json({ message: "Sukes", data });
});
// diusahakan didalam "/santri/:id"
app.get("/santri/:id", (req, res) => {
  const id = req.params.id;
  const result = data.find((snt) => snt.id === parseInt(id));

  if (!result) {
    return res
      .status(404)
      .json({ message: "Not Found, Data tidak ditemukan", data: null });
  }

  return res.status(200).json({ message: "Data Santri", result });
});

app.get("/santri", (req, res) => {
  // gimna jikalau gak ada query nya saya tampilin semua data
  // jika ada query saya cek query nya
  const ceknama = req.query.nama;
  if (!ceknama) {
    return res.status(200).json({ message: "Data Santri", data });
  } else {
    const hasil = data.find((snt) => snt.nama === ceknama);
    if (hasil) {
      return res.status(200).json({ message: "Data Santri", data: hasil });
    } else {
      return res
        .status(404)
        .json({ message: "Data tidak ditemukan", data: null });
    }
  }
});

app.post("/santri", (req, res) => {
  //  ini buat dapetin nangkep data dari client
  console.log(req.body.nama);
  const { nama, nilai } = req.body;

  const dataBaru = {
    id: data.length + 1,
    nama,
    nilai,
  };
  data.push(dataBaru);
  res
    .status(201)
    .json({ message: "Data berhasil ditambahkan", data: dataBaru });
});

app.delete("/santri/:id", (req, res) => {
  const id = req.params.id;
  // findIndex: mencari posisi array yang ada dinma letaknya
  // yang dikembalikan dari findIndex itu index array nya, bukan nilai dari id yang dibandingkan
  // nahh kalau dia gak ketemu id yang sama, maka findIndex akan mengembalikan nilai index -1

  // splice
  // hapus data array berdasarkan index
  const parse = data.findIndex((datas) => datas.id === parseInt(id));

  data.splice(parse, 1);

  res.status(200).json({ message: "Data berhasil dihapus", data });
  console.log(data);
});

app.put("/santri/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, nilai } = req.body;

  const dataUpdate = data.findIndex((item) => item.id === id);

  data.splice(dataUpdate, 1, { id, nama, nilai });

  res.status(200).json({ message: "Data berhasil diupdate", data });
});

app.listen(3000, () => {
  console.log("server berjalan........");
});
