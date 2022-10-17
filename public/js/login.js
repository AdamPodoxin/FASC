const uid = localStorage.getItem('uid');
if (uid != null) {
    window.location.href = "./landing.html";
}

const registration = async () => {
    
    let name = document.getElementById("name").value;
    let cpu = document.getElementById("cpu").value;
    let gpu = document.getElementById("gpu").value;
    let os = document.getElementById("os").value;
    let ram = document.getElementById("ram").value;
    let lang = document.getElementById("lang").value.split(",");
    
    let uid = await registerAccount(name, cpu, gpu, os, ram, lang);
    localStorage.setItem("uid", uid);

    window.location.href = "./landing.html";
}

document.getElementById("login-form-submit").addEventListener("click", registration);
