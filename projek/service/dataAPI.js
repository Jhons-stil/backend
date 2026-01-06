export async function perowiAPI() {
            const response = await fetch("https://api.myquran.com/v2/hadits/perawi/");
            const dataAPIPerowi = await response.json();
         return dataAPIPerowi;
 };

 export async function quranAPI() {
    const response = await fetch("https://api.myquran.com/v2/quran/surat/semua");
    const dataAPIQuran = await response.json();
    return dataAPIQuran
 };

export async function juzAPI() {
    const response = await fetch("https://api.myquran.com/v2/quran/juz/semua");
    const dataAPIJuz = await response.json();
    return dataAPIJuz
};

export async function asmaAPI() {
    const response = await fetch("https://api.myquran.com/v2/husna/semua");
    const dataAPIAsma = await response.json();
    return dataAPIAsma;
}
export async function hadistAPI() {
    const response = await fetch("https://api.myquran.com/v2/hadits/arbain/semua");
    const dataAPIAsma = await response.json();
    return dataAPIAsma;
};
