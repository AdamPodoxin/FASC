const uid = localStorage.getItem("uid");
const toClientUID = localStorage.getItem("to_client_uid");

function forceDownload(blob, filename) {
	var a = document.createElement("a");
	a.download = filename;
	a.href = blob;
	document.body.appendChild(a);
	a.click();
	a.remove();
}

function downloadResource(url, filename) {
	if (!filename) filename = url.split("\\").pop().split("/").pop();
	fetch(url, {
		headers: new Headers({
			Origin: location.origin,
		}),
		mode: "cors",
	})
		.then((response) => response.blob())
		.then((blob) => {
			let blobUrl = window.URL.createObjectURL(blob);
			forceDownload(blobUrl, filename);
		})
		.catch((e) => console.error(e));
}

getCodeFileDownload(toClientUID, uid).then((data) => {
	document.getElementById("instructions").innerHTML += data.instructions;
	downloadResource(data.url, data.fileName);
});

const upload = async () => {
	const selectedFile = document.getElementById("file").files[0];

	const url = await sendCompiledFile(uid, toClientUID, selectedFile);
	await sendCompiledMessage(uid, toClientUID, url);

	deleteCompileRequest(toClientUID, uid);
};
