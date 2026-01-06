import http from "http";


const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.statusCode);


    const kelas = [
        {id: 1, nama_jurusan: "PPW"},
        {id: 2, nama_jurusan: "PPM"},
        {id: 3, nama_jurusan: "PSJ"},
    ];

    res.setHeader("Content-type", "application/json");
    if (req.url === "/data") {
        res.end(JSON.stringify({message: "Suksess"}));
    } else if (req.url === "/user") {
        res.end(JSON.stringify({ username: "Adit", pass: "aditia"}));
    } else if (req.url === "/json") {
        res.end(JSON.stringify(kelas))
    } else {
        res.end(JSON.stringify({error: "Page Not Found"}))
    }
});

server.listen(3000, () => {
    console.log("server Berjalan.............");
    
})
