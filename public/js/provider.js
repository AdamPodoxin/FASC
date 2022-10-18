getCompileRequests(localStorage.getItem("id")).then(async (arr) => {
	for (let i = 0; i < arr.length; i++) {
		const request = arr[i];
		const element = document.getElementById("list");

		const a = document.createElement("a");
		const aNode = document.createTextNode("Compile this file.");
		a.appendChild(aNode);
		a.href = "./compile.html";
		a.id = request.from;
		a.addEventListener("click", (a) => {
			localStorage.setItem("request_id", a.path[0].id);
		});
		element.appendChild(a);

		const fileInfo = await getFileInfo(request.sourceRef);

		const para = document.createElement("p");
		const node = document.createTextNode(fileInfo.name);
		para.appendChild(node);
		element.appendChild(para);
	}
});
