import express from "express";
import {
  getAllPeserta,
  getAllAcara,
  postAcara,
  updateAcara,
  delAcara,
  joinAcara,
  acaraDetail,
} from "./contrtollers/controller.js";
const app = express();
const PORT = 3001;
app.use(express.json());

app.get("/peserta", getAllPeserta);

app.get("/acara", getAllAcara);

app.post("/acara/create", postAcara);

app.patch("/acara/update/:id", updateAcara);

app.delete("/acara/delete/:id", delAcara);

app.post("/acara/join/:id", joinAcara)

app.get("/acara/detail/:id", acaraDetail)

app.listen(PORT, () => {
  console.log("Server berjalan cuuyyyy...........");
});
