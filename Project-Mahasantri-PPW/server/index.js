import http from "http"
import fs from "fs";

const server = http.createServer( (req, res) => {
    console.log(res.statusCode);
    console.log(req.url);

   
    res.setHeader("Content-Type", "application/json")
    if (req.url === "/data" && req.method === "GET") {
        const read = fs.readFileSync("../app/module/data.json", "utf-8");
        
        res.statusCode = 200;
        // res.end()
        res.end(read)
    } else {
        res.statusCode = 404;
        res.end("Page Not Found")

    }
    
});

server.listen(3000, () => {
    console.log("Server berjalan");
    
})