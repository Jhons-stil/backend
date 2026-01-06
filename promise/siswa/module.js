const data = [
    {id: 1, name: "adit", gender: "l"},
    {id: 2, name: "Maryam", gender: "p"},
    {id: 3, name: "samsul", gender: "l"},
    {id: 4, name: "kokom", gender: "p"}
];


// const daftar = () => {
//     const laki = data.filter((item) => item.gender === "l");
//     const pr = data.filter((item) => item.gender === "p");
//     const totalSiswa = data.length;
//     console.log(`Total: ${totalSiswa}`);
//     console.log(`Laki-laki: ${laki.length}`);
//     laki.forEach(element => {
//         console.log(`- ${element.name}`);
//     });
//     console.log(`Perempuan: ${pr.length}`);
//     pr.forEach(element => {
//         console.log(`- ${element.name}`);
        
//     });
// };

// const daftar = () => {
//     const totalSiswa = data.length;
//     console.log(`Total: ${totalSiswa}`);

//     const laki = data.map((item) => item.gender).filter((d) => d === "l");
//     console.log(`Laki-laki: ${laki.length}`);

//     const namaLaki = data.filter((i) => i.gender === "l").map((data) => data.name);
//     namaLaki.forEach(element => {
//         console.log(`- ${element}`);
//     });

//     const pr = data.map((item) => item.gender).filter((data) => data === "p");
//     console.log(`Perempuan: ${pr.length}`);
    
//     const namaPr = data.filter((i) => i.gender === "p").map((data) => data.name);
//     namaPr.forEach(element => {
//         console.log(`- ${element}`);
        
//     });

    
// };

const daftar = () => {
    const totalSiswa = data.length;
    console.log(`Total: ${totalSiswa}`);
    
    const laki = [];
    const pr = [];
    data.map((data) => data.gender === "l" ? laki.push(data) : pr.push(data));
    
    console.log(`Laki-laki: ${laki.length}`);
    const namaLaki = laki.map((data) => data.name);
    namaLaki.forEach(element => {
        console.log(`- ${element}`);
    });
    
    console.log(`Perempuan: ${pr.length}`);
    const namaPr = pr.map((d) => d.name);
    namaPr.forEach(element => {
        console.log(`- ${element}`);
        
    });
    
    
    
    
}

module.exports = {daftar};


