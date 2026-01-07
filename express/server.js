// sintak dasar kalo mau bikin server di express
// HANYA BIKIN SERVER
import express from "express";
const app = express();

// ini url root
// yang pertama kali ditampilkan
app.get("/", (req, res) => {
  // cek isi req & res
  console.log(res.statusCode);

  res.send("Halo");
});
app.get("/okrek", (req, res) => {
  // cek isi req & res
  //   console.log(req.url);

  res.send("Halo, okrek");
});

// jika data yang dikirim ke client dalam dentuk JSON
app.get("/json", (req, res) => {
  res.json({
    status: "ok",
    message: "Sukses",
    data: [
      {
        usernama: "samson",
        pass: "samson123",
      },
    ],
  });
});

// seperti fitur search
// query param === search
app.get("/search", (req, res) => {
  const barang = req.query.barang;
  if (barang) {
    res.json(barang);
    // nantinya bisa menjalankan query sql database
  }

  res.json({
    status: "ok",
    message: "Sukses",
    data: [
      {
        nama_produk: "kaos",
        stok: 12,
      },
      {
        nama_produk: "kaos polos",
        stok: 14,
      },
      {
        nama_produk: "kaos partai",
        stok: 10,
      },
    ],
  });
});

// query params
app.get("/produk/:id", (req, res) => {
  // untuk pendapatkan data dari url get
  // dengan format query params
  // versi 1
  const { id } = req.params;
  console.log(id);

  // versi 2
  const idd = req.params.id;
  console.log(idd);

  res.json({
    status: "ok",
    message: "Sukses",
    data: [
      {
        nama_produk: "kaos",
        stok: 12,
      },
      {
        nama_produk: "kaos polos",
        stok: 14,
      },
      {
        nama_produk: "kaos partai",
        stok: 10,
      },
    ],
  });
});

app.get("/person/:id", (req, res) => {
  const data = [
    {id: 1, nama: "asep", nilai: 30},
    {id: 2, nama: "ujang", nilai: 100},
    {id: 3, nama: "samsul", nilai: 90},
    {id: 4, nama: "adit", nilai: 89}
  ];

  const id = req.params.id;
  

  const cari = data.find((item) => item.id === parseInt(id));
  console.log(cari);
  res.json(cari);
});

app.get("/santri", (req, res) => {
  const data = [
    {
      id: 1,
      nama: "asep",
      nilai: 30,
    },
    {
      id: 2,
      nama: "ujang",
      nilai: 100,
    },
    {
      id: 3,
      nama: "samsul",
      nilai: 90,
    },
    {
      id: 4,
      nama: "adit",
      nilai: 89,
    },
  ];
  // nilai dari param adalah string
  const genap = data.filter((dg) => dg.id % 2 === 0);
  const ganjil = data.filter((dg) => dg.id % 2 === 1);

  const mod = req.query.mod;
  if (mod === "ganjil") {
    res.json(ganjil);
  } else if (mod === "genap") {
    res.json(genap);
  }
});
app.listen(3000, () => {
  console.log("server berjalan");
});
