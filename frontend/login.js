document.getElementById("myButton").addEventListener("login-form-submit", uploadCodeFile);

const uploadCodeFile = () => {
    const user = {
      CPU:loginForm.CPU.value,
      GPU:loginForm.GPU.value,
      OS: loginForm.OS.value,
      RAM: loginForm.RAM.value,
      languages: loginForm.language.value.split(","),
    }

    document.getElementById("dem2").innerHTML = "balls"; 
    document.getElementById("demo").innerHTML = "bballs"; 
}