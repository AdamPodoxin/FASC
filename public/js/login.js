const id = localStorage.getItem("id");
if (id != null) {
	window.location.href = "./landing.html";
}

const registration = async () => {
	let name = document.getElementById("name").value;
	let cpu = document.getElementById("cpu").value;
	let gpu = document.getElementById("gpu").value;
	let os = document.getElementById("os").value;
	let ram = document.getElementById("ram").value;
	let lang = document.getElementById("lang").value.split(",");

	let id = await registerUser(name, cpu, gpu, os, ram, lang);
	localStorage.setItem("id", id);

	window.location.href = "./landing.html";
};

document
	.getElementById("login-form-submit")
	.addEventListener("click", registration);
