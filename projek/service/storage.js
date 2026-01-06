const keyUser = "user";

if (!localStorage.getItem(keyUser)) {
    localStorage.setItem(keyUser, JSON.stringify([]));
};



 let parseUser = JSON.parse(localStorage.getItem(keyUser));


if (parseUser.length === 0) {
    parseUser.push({
        id: parseUser.length + 1,
        emailUser: "admin@gmail.com",
        password: "admin123",
    });
    parseUser.push({

        id: parseUser.length + 1,
        emailUser: "staff@gmail.com",
        password: "staff123"
    })
    localStorage.setItem(keyUser, JSON.stringify(parseUser));
}

export const ambilDataUser = () =>{
    return JSON.parse(localStorage.getItem(keyUser));
};
