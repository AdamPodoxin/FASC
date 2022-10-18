const id = localStorage.getItem("id");
const toProviderID = localStorage.getItem("to_provider_uid");

const upload = async () => {
	const selectedFile = document.getElementById("file").files[0];
	const instructions = document.getElementById("instructions").value;

	const fileRef = await uploadFile(id, selectedFile);
	await createRequest(id, toProviderID, instructions, fileRef);

	window.location = "./client.html";
};
