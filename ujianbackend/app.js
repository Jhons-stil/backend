import express from "express";
import routerTracer from "./src/interface/http/routes/tracerRoutes.js";

const app = express();
app.use(express.json());
const PORT = 5000;

app.use("/api/tracer", routerTracer);

app.listen(PORT, () => {
  console.log("server berjalan...");
});
