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

getUsers().then((arr) => {
	arr.forEach((user) => {
		const a = document.createElement("a");
		const aNode = document.createTextNode("Choose this provider.");
		a.appendChild(aNode);
		a.href = "./request.html";
		a.id = user.id;
		a.addEventListener("click", (a) => {
			localStorage.setItem("to_provider_id", a.path[0].id);
		});
		providersList.appendChild(a);

		const para = document.createElement("p");
		const node = document.createTextNode(
			user.name +
				", " +
				user.CPU +
				", " +
				user.GPU +
				", " +
				user.OS +
				", " +
				user.RAM +
				", " +
				user.languages
		);
		para.appendChild(node);
		providersList.appendChild(para);
	});
});
