const registration = async () => {
    
    let name = document.getElementById("name").value;
    let cpu = document.getElementById("cpu").value;
    let gpu = document.getElementById("gpu").value;
    let os = document.getElementById("os").value;
    let ram = document.getElementById("ram").value;
    let lang = document.getElementById("lang").value.split(",");
    
    let uid = await registerAccount(name, cpu, gpu, os, ram, lang);
    localStorage.setItem("uid", uid);
}

document.getElementById("login-form-submit").addEventListener("click", registration);
