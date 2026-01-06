// ini bagian setup awal agar program bisa menerima inputan dari keyboard
// ================================================================
// ini menginpor module bawaannya Node js bernama readline
// module ini dipakai untuk :
// - membaca input user
// - menampilkan output di terminal
const readline = require("readline");
//  ini membuat interface input-output
// disimpen di variabel rl
const rl = readline.createInterface({
    // input dari keyboard
    input: process.stdin,
    // output ke terminal
    output: process.stdout
});
// ===============================================================
//  input string
console.log(`
--=( Warung BABA CHAN )=--
    `);
rl.question("Siapa nama Kamu? ", (nama) => {
    console.log(`Halo, ${nama}`);
    rl.close();
});


// ===============================================================
// input nomor
// ===============================================================
rl.question("Masukan umur: ", (umur) => {
    umur = parseInt(umur);
    console.log(`Umur Kamu: ${umur}`);

});
// ================================================================


// ==================================================================
// ini kalo mau di gabungkan dan berurutan
// =================================================================
console.log(`
--=( Warung BABA CHAN )=--
    `);
rl.question("Siapa nama Kamu? ", (nama) => {
    rl.question("Masukan umur: ", (umur) => {
        umur = parseInt(umur);
    console.log(`Halo, ${nama}`);
    console.log(`Umur Kamu: ${umur}`);
    rl.close();
    });
});

// ==============================================
// ini pake async function
// ==============================================
// const readline = require("readline");

// const proses = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function tanya(pertanyaan) {
//     return new Promise((resolve) => {
//         proses.question(pertanyaan, resolve);
//     });
// };

// async function main() {
//     const nama = await tanya("Siapa nama kamu? ");
//     const umur = parseInt(await tanya("berapa usia kamu? "));

//     console.log(`Halo ${nama}`);
//     console.log(`Umur kamu : ${umur} tahun`);
//     proses.close();
// };
// main();