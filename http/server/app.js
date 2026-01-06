import http from "http";


const server = http.createServer((req, res) => {
    // ini buat cek url yang diaksessss oleh client
    console.log(req.url);
    // ini buat cek statusCode
    console.log(res.statusCode);

    // kirim data ke client
    res.setHeader("Content-type", "text/plain")
    res.end("Ini data yang dikirimkan dari server dan client");

    res.setHeader("Content-type", "text/plain");
    if (req.url === "/data") {
        res.end("Ini data yang dikirimkan dari server dan client");
    } else {
        res.end("Selamat Datang")
    }
//     const kosong = [];

//     kosong.push(
//         {nama: "HAIkal", age: 10}
//     )
//     res.setHeader("Content-type", "application/json");
//     if (req.url === "/data") {
//         res.end(JSON.stringify({message: "Sukses"}))
//     } else if (req.url === "/user") {
//         res.end(JSON.stringify({ username: "Adit", pass: "aditia"}));
//     } else if (req.url === "/json") {
//         res.end(JSON.stringify(kosong))
//     } else {
//         res.end(JSON.stringify({error: "Page Not Found"}))
//     }
});
server.listen(3000, () => {
    console.log("server berjalan...........");
    
})