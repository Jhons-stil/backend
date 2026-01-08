import express from "express";
import {
  getAllData,
  getById,
  getByName,
  postData,
  updateData,
  deleteData,
  highScore,
  dataLulus,
  dataNoLulus
} from "./controller/santriControl.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/santri", getAllData);

app.get("/santri/cari/:id", getById);

app.get("/santri/cari", getByName);

app.post("/santri/tambah", postData);

app.put("/santri/update/:id", updateData);

app.delete("/santri/delete/:id", deleteData);

app.get("/santri/nilai/tinggi", highScore);

app.get("/santri/data/lulus", dataLulus);

app.get("/santri/data/tidak/lulus", dataNoLulus);

app.listen(PORT, () => {
  console.log("server dijalankan");
});
