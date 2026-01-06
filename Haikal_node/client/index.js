import http from "http";

const request = http.request("http://localhost:3000/json", (res) => {
    let data = "";
    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        console.log(JSON.parse(data));
        
    } )
});

request.on("error", (err) => {
    console.log("Error:", err.message);
    
});

request.end()