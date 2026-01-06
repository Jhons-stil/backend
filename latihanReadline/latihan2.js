const readline = require("readline");
const daftar = [
    { kode: "NG", nama: "Nasi Goreng", harga: 15000 },
    { kode: "AG", nama: "Ayam Geprek", harga: 10000 },
    { kode: "AB", nama: "Ayam Bakar", harga: 12000 },
    { kode: "ET", nama: "Es Teh", harga: 5000 },
    { kode: "EJ", nama: "Es Jeruk Peras", harga: 8000 },
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let pesanan = [];


function tanya(pertanyaan) {
    return new Promise((resolve) => {
        rl.question(pertanyaan, resolve);
    })
};

async function tampilMenu() {
    console.log(`
    --=( Warung BABA CHAN)=--
    
Daftar Menu :`);
    daftar.forEach(element => {
        if (element.kode === "ET") {
            console.log(`- (${element.kode}) ${element.nama} Manis - ${element.harga}`);
        } else {
            console.log(`- (${element.kode}) ${element.nama} - ${element.harga}`);
        }
        
    });
};


const pesan = async () => {
    const kode = (await tanya("Masukan kode makanan : ")).toUpperCase();
    const menu = daftar.find((item) => item.kode === kode);
    
    pesanan.push(menu);
    console.log(`
----------------------------
Pesanan berhasil ditambahkan
----------------------------
`);
   
    pilihOpsi();
    
} ;

const daftarPesanan = () => {
  
    if (pesanan.length === 0) {
    console.log(`
=========================
Anda belum memesan apapun
=========================`);
       
        return pilihOpsi();
    }

    console.log(`
  Daftar pesanan`);
    let total = 0;
    pesanan.forEach((element, index) => {
        console.log(`${index + 1}. ${element.nama} - ${element.harga}`);
        total += element.harga;
    });
    console.log(`
Total Bayar : Rp.${total}`);
    
    pilihOpsi();
}
const pilihOpsi = async () => {
     console.log(`
Opsi : 
1. Pesan
2. Daftar pesanan saya
3. Keluar`);
    const pilih = parseInt(await tanya(`Pilih (1/2/3): `));
    if (pilih === 1) {
        pesan();
        return;
    };
    if (pilih === 2) {
        daftarPesanan();
        return;
    };
    if (pilih === 3) {
        console.log('Terima kasih sudah berkunjung ke warung kami ..');
        rl.close();
    }
};
tampilMenu();

pilihOpsi();
