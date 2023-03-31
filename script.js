function generateDiv(text) {
    // HTML injection
    let container = document.getElementById("container");
    container.innerHTML = `<div><h1>${text}</h1></div>`;
}

generateDiv("Test")


let item = {
    "name": "Backpack",
    "date": "3/23/2023",
    "tags": {
        "blue": true,
        "black": true
    }
}

// if (item["tags"]["blue"])
var loginState = false;

function toggleLogIn() {
    loginState = !loginState;
    console.log(loginState);
    if (loginState === true) {
        document.getElementById("pop-up-login").style.display = "block";
    }
    else {
        document.getElementById("pop-up-login").style.display = "none";
    }
}


function submitPassword() {
    let password = "password";
    let userPassword = document.getElementById("enter-password").value;
    if (userPassword == password) {
        console.log("password correct");
    } else {
        console.log("password incorrect");
    }
}