import fs from "fs";
// import { dataSiswa } from "../module/index.js";
import  readline  from "readline";

const rl = readline.createInterface(
    {input: process.stdin, 
     output: process.stdout
    },
)

export function dataPertama() {
    const read = fs.readFileSync("../module/data.json", "utf-8");
    const parseRead = JSON.parse(read)
    console.log(parseRead.splice(0, 5));
    
}

export function tampilData () {
const read =   fs.readFileSync("../module/data.json", "utf-8")
  const parseRead = JSON.parse(read)
  console.log(parseRead);
  pilihOpsi();
}

export function tambahData() {
const read =   fs.readFileSync("../module/data.json", "utf-8")
  const parseRead = JSON.parse(read)

rl.question("Masukkan nama: ",(nama) => {
   rl.question("Masukkan jurusan: ", (jurus) => {
    const dataBaru = {id: parseRead.length + 1, nama: nama, jurusan: jurus};
   if (!isNaN(nama) || !isNaN(jurus)) {
    console.log("Data tidak valid");
    return
   }
    parseRead.push(dataBaru);
    fs.writeFileSync("../module/data.json", JSON.stringify(parseRead))
    console.log("Data berhasil ditambahkan");
    pilihOpsi();

} )
});
};

export function cariData() {
    const read =   fs.readFileSync("../module/data.json", "utf-8")
  const parseRead = JSON.parse(read)

  rl.question("Masukkan id mahasiswa: ", (id) => {
    const parseId = parseInt(id)
    const cari = parseRead.find((d) => d.id === parseId)
    console.log(cari);
    pilihOpsi();
    });
};

 export function pilihOpsi() {
    
    rl.question( "Silahkan Pilih (1/2/3/4) : ", (opsi) => {
        if (opsi === "1") {
            tambahData();
        } else if ( opsi === "2") {
            cariData();
        } else if (opsi === "3") {
            tampilData();
        } else if (opsi === "4") {
            console.log( "Terima kasih telah berkunjung" );
               rl.close();
        } else {
            console.log("anda belum memsukan pilihan ");
            pilihOpsi();
        }
    });
}





