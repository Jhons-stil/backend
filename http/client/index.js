
import http from "https";

// menentukan jenis request apa yang akan di eksekusi
// bisa pake GET, POST, PUT, DELETE

const request = http.request(
    "https://jsonplaceholder.typicode.com/users",
    (res) => {
        // res.on("data", (data) =>{
        //     console.log(data.toString());
        // });

        // // jika ada error ketika menampilkan data dari API
        // res.on("error", (err) =>{
        //     console.log(err.message);
        // });


        // digunakan untuk mengakhiri proses membaca data
        // res.on("end", () => {
        //     console.log("end");
            
        // });


        // ===========================================================================================
        // ini versi 2 dalam membaca data
        // data yang didapatkan melalui event "data" itu sebenernya masih dalam bentuk potongan/ chunk
        // oleh karena itu perlu digabungkan secara manual agar datanya menjadi data utuh

        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });

        // jika datanya sudah diterima semua maka event "end" akan dijalankan
        res.on("end", () => {
            console.log(JSON.parse(data));
        });
        
        // ===========================================================================================
        
});

// ini digunakan untuk kalau ternyata pas ngakses ke server itu ada error
// misal : waktu terlalu lama (timeout), url nya salah
request.on("error", (err) =>{
    console.log("ERROR:",err.message);
});

// 
request.end();