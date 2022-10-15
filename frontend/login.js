const uploadCodeFile = () => {
    let cpu = document.getElementById("cpu").value;
    let gpu = document.getElementById("gpu").value;
    let os = document.getElementById("os").value;
    let ram = document.getElementById("ram").value;
    let lang = document.getElementById("lang").value.split(",");

    const user = {
      CPU:cpu,
      GPU:gpu,
      OS:os,
      RAM:ram,
      languages:lang,
    }
    console.log(user);
}

document.getElementById("login-form-submit").addEventListener("click", uploadCodeFile);
