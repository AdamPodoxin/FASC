const completedRequestsList = document.getElementById("requests-list");
const providersList = document.getElementById("providers-list");

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

getCompletedRequestsList(localStorage.getItem("uid")).then((arr) => {
	arr.forEach((completedRequest) => {
		const a = document.createElement("a");
		const aNode = document.createTextNode(
			`Download ${completedRequest.fileName}`
		);
		a.appendChild(aNode);
		a.fileURL = completedRequest.fileURL;
		a.fileName = completedRequest.fileName;
		a.requestName = `${completedRequest.from}_${completedRequest.to}`;
		a.addEventListener("click", (a) => {
			const fileURL = a.path[0].fileURL;
			const fileName = a.path[0].fileName;
			downloadResource(fileURL, fileName);

			deleteCompiledMessage(a.path[0].requestName);
		});
		completedRequestsList.appendChild(a);
	});
});

getUsers().then((arr) => {
	arr.forEach((provider) => {
		const a = document.createElement("a");
		const aNode = document.createTextNode("Choose this provider.");
		a.appendChild(aNode);
		a.href = "./request.html";
		a.id = provider.uid;
		a.addEventListener("click", (a) => {
			localStorage.setItem("to_provider_uid", a.path[0].id);
		});
		providersList.appendChild(a);

		const para = document.createElement("p");
		const node = document.createTextNode(
			provider.name +
				", " +
				provider.CPU +
				", " +
				provider.GPU +
				", " +
				provider.OS +
				", " +
				provider.RAM +
				", " +
				provider.languages
		);
		para.appendChild(node);
		providersList.appendChild(para);
	});
});
