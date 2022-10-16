const uid = localStorage.getItem("uid");
const toProviderUID = localStorage.getItem("to_provider_uid");

const upload = async () => {
	const selectedFile = document.getElementById("file").files[0];
	const instructions = document.getElementById("instructions").value;
	
	const url = await sendCodeFile(uid, toProviderUID, file);
	await sendCompileRequest(uid, toProviderUID, url, instructions);
};