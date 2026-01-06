import fs from "fs";

// Susunan sintaks menulis file secara syncronous
// fs.writeFileSync("nama_file", "isi_file");
// fs.writeFileSync("test.odt", "Belajar nulis file menggunakan node");


console.log(fs.readFileSync("test.txt", "utf-8"));


