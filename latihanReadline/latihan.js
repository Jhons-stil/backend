
const readline = require("readline");

const daftar = [
    { kode: "NG", nama: "Nasi Goreng", harga: 15000 },
    { kode: "AG", nama: "Ayam Geprek", harga: 10000 },
    { kode: "AB", nama: "Ayam Bakar", harga: 12000 },
    { kode: "ET", nama: "Es Teh Manis", harga: 5000 },
    { kode: "EJ", nama: "Es Jeruk Peras", harga: 8000 },
];

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function tanya(pertanyaan) {
    return new Promise((resolve) => {
        read.question(pertanyaan, resolve);
    });
};

const tampilMenu = () => {
    console.log(`
--=( Warung BABA CHAN )=--

Daftar Menu:`);
    daftar.forEach((element) => {
        console.log(`- (${element.kode}) ${element.nama} - ${element.harga}`);
        
    });
};

async function kasir() {
    let keranjang = [];
    let tambahLagi = true;

    tampilMenu();

    while (tambahLagi) {
        const kode = (await tanya("Masukkan kode menu: ")).toUpperCase();
        const menu = daftar.find(item => item.kode === kode);

        if (!menu) {
            console.log("Kode tidak ditemukan!");
            continue;
        };

        const qty = Number(await tanya("Jumlah: "));
        if (qty <= 0) {
            console.log("jumlah tidak valid");
            continue;
        };

        keranjang.push({
            nama: menu.nama,
            harga: menu.harga,
            qty,
            subtotal: menu.harga * qty
        });

        const jawab = (await tanya("Tambah menu lagi? (y/n): ")).toLowerCase;
        if (jawab !== "y") lanjut = false; 
    }

    console.log("\n===== STRUK BELANJA =====");
    let total = 0;
    keranjang.forEach((item, index) => {
        console.log(
            `${index + 1}. ${item.nama} x${item.qty} = Rp ${item.subtotal}`
        );
        total += item.subtotal;
    })

        console.log("-------------");
        console.log("TOTAL: Rp" + total);

        const bayar = parseInt(await tanya("Bayar: Rp"));
        if (bayar < total) {
            console.log("Uang tidak cukup");
            
        } else {
            console.log("KEMBALIAN: Rp" + (bayar - total));
            
        };
        console.log("========== TERIMAKASIH =========");
        read.close();
        
};
kasir();