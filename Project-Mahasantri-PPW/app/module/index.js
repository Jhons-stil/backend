import fs from "fs";

export const dataSiswa = JSON.parse(fs.readFileSync("data.json"))
console.log(dataSiswa);
console.log(typeof dataSiswa);



