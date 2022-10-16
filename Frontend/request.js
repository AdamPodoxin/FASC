const uid = localStorage.getItem("uid");
const toProviderUID = localStorage.getItem("to_provider_uid");

const upload = () => {
	const selectedFile = document.getElementById("file").files[0];
	const instructions = document.getElementById("instructions").value;
	console.log(instructions);
};