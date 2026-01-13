import express from "express";
import routeAcara from "./routes/route.js";
const app = express();
const PORT = 3001;
app.use(express.json());

app.use("/api/v1/event", routeAcara);

app.listen(PORT, () => {
  console.log("Server berjalan cuuyyyy...........");
});
