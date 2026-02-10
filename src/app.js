process.env.TZ = "Asia/Jakarta";
const express = require("express");
const routerUser = require("./http/user/router.js");
const routerKaryawan = require("./http/karyawan/router.js");
const routerCuti = require("./http/cuti/router.js");
const routerApproval = require("./http/approval/router.js");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerUser);
app.use("/api/masterdata/karyawan", routerKaryawan);
app.use("/api/cuti", routerCuti);
app.use("/api/approval", routerApproval);
app.listen(PORT, () => {
  console.log("server Berjalan.................");
});
