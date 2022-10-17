const uid = localStorage.getItem("uid");
const toProviderUID = localStorage.getItem("to_provider_uid");

const upload = async () => {
	const selectedFile = document.getElementById("file").files[0];
	const fileName = selectedFile.name;
	const instructions = document.getElementById("instructions").value;

	const url = await sendCodeFile(uid, toProviderUID, selectedFile);
	await sendCompileRequest(uid, toProviderUID, url, fileName, instructions);

	window.location = "./client.html";
};
