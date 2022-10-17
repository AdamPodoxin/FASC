getCompileRequestList(localStorage.getItem("uid")).then((arr) => {
	arr.forEach((fileData) => {
		const element = document.getElementById("list");

		const a = document.createElement("a");
		const aNode = document.createTextNode("Compile this file.");
		a.appendChild(aNode);
		a.href = "./compile.html";
		a.id = fileData.from;
		a.addEventListener("click", (a) => {
			localStorage.setItem("to_client_uid", a.path[0].id);
		});
		element.appendChild(a);

		const para = document.createElement("p");
		const node = document.createTextNode(fileData.fileName);
		para.appendChild(node);
		element.appendChild(para);
	});
});
