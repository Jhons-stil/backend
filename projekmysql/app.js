import express from "express";
import userRouter from "./routes/userRoute.js";
// import { koneksi, cekKoneksi } from "./config/db.js";
// import { getUser } from "./controller/userController.js";

const app = express();
app.use(express.json());
const PORT = 5000;

// buatkan endpoint untuk cek hasil dari koneksi
// app.get("/cekdb", async (req, res) => {
//   const hasil = await cekKoneksi();
//   if (hasil) {
//     return res.status(200).json({ message: "Koneksi berhasil" });
//   }
//   return res.status(500).json({ message: "Tidak berhasil" });
// });

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server berjalan di port ${PORT}`);
});
