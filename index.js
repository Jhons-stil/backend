// CARA 1
// =======================================================
// menginport semua module yang ada di file data.js
// const bebas = require("./data.js");


// variabe bebas sekarang bukan lagi sebuah variable biasa, variable nya sekarang menjadi sebuah object
// jika ingin lihat variabel bebas itu adalah object kita bisa lihat di console 
// seperti ini
// console.log(typeof bebas);

// console.log(bebas);


// console.log(bebas.nama);

// CARA 2
// ====================================================
// konsep distructuring

const {nama} = require("./data.js");

console.log(nama);

