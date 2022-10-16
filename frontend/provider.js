const uid = localStorage.getItem("uid");
const toClientUID = localStorage.getItem("to_client_uid");

document.getElementById("download-link").setAttribute("href", "https://google.com");

const upload = async () => {
	const selectedFile = document.getElementById("file").files[0];
	
	const url = await sendCompiledFile(uid, toClientUID, selectedFile);
	await sendCompiledMessage(uid, toClientUID, url);
};