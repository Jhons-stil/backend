import { ambilDataUser } from "../service/storage.js";

const inpEmail = document.getElementById("inpEmail");
const inpPw = document.getElementById("inpPw");
const smallEmail = document.getElementById("smallEmail");
const smallPw = document.getElementById("smallPw");
const smallNoValid = document.getElementById("smallNoValid");
const btnmasuk = document.getElementById("masuk");
smallEmail.classList.add("d-none");
smallPw.classList.add("d-none");
smallNoValid.classList.add("d-none");

btnmasuk.addEventListener('click', () => {

    const dataUser = ambilDataUser();
    if (inpEmail === "" || inpPw === "") {
        smallPw.classList.remove("d-none");
        smallEmail.classList.remove("d-none");
        return;
    };
    const ambilUser = dataUser.find((data) => data.emailUser === inpEmail && data.password === inpPw);
    if (!ambilUser) {
        smallNoValid.classList.remove("d-none");
    }

    
});


