getProviders().then((arr) => {
	arr.forEach((provider) => {
		const element = document.getElementById("list");

		const a = document.createElement("a");
		const aNode = document.createTextNode("Choose this provider.");
		a.appendChild(aNode);
		a.href = "./request.html";
		a.id = provider.uid;
		a.addEventListener("click", (a) => {
			localStorage.setItem("to_provider_uid", a.path[0].id);
		});
		element.appendChild(a);

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
		element.appendChild(para);
	});
});
