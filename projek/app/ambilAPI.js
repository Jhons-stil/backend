import { perowiAPI, quranAPI, asmaAPI, hadistAPI, juzAPI } from "../service/dataAPI.js";

async function ambPerowi() {
    const dataPerowi = await perowiAPI();
    const tbody = document.getElementById("tbody");

    const ambilData = dataPerowi.data;

    ambilData.forEach((element, index) => {
        
            tbody.innerHTML += `
            <tr>
            <td>${index + 1}</td>
            <td>${element.name}</td>
            <td>${element.slug}</td>
            <td>${element.total}</td>
            <td>${index % 2 ? "<span class='badge bg-primary'>masyhur</span>" : "<span class='badge bg-info text-black'>masyhur</span>"}</td>
            </tr>
            `

    });
    
};
ambPerowi();

async function ambilQuran() {
    const dataQuran = await quranAPI();
    const toSurat = document.getElementById("toSurat")
    const total = dataQuran.data.length;
    toSurat.textContent = total;
    
};
ambilQuran();

async function ambilJuz() {
    const dataJuz = await juzAPI();
    const toJuz = document.getElementById("toJuz")
    const total = dataJuz.data.length;
    toJuz.textContent = total;
    
};
ambilJuz();

async function ambilAsma() {
    const dataAsma = await asmaAPI();
    const toAsma = document.getElementById("toAsma")
    const total = dataAsma.data.length;
    toAsma.textContent = total;
    
};
ambilAsma();

async function ambilHadist() {
    const dataHadist = await hadistAPI();
    const toHadist = document.getElementById("toHadist")
    const total = dataHadist.data.length;
    toHadist.textContent = total;
    
};
ambilHadist();

async function tampilQuran() {
    const dataQuran = await quranAPI();
    const tbody = document.getElementById("tbodyQuran");
    const quran = dataQuran.data;

    const qurantampil10 = quran.slice(0, 10);

    qurantampil10.forEach((element, index) => {

        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${element.name_id}</td>
            <td>${element.name_short}</td>
            <td>${element.translation_id}</td>
            <td><span class="badge bg-warning text-black">${element.number_of_verses}</span></td>
        </tr>
        `
    });
};
tampilQuran();