const uid = localStorage.getItem("uid");
const toClientUID = localStorage.getItem("to_client_uid");

// document.getElementById("download-link").setAttribute("href", "https://google.com");

// downloadFile("https://firebasestorage.googleapis.com/v0/b/fasc-ec621.appspot.com/o/code_files%2F3ueht6_3ueht6%2FMinecraft.txt?alt=media&token=c59ddf7b-42f3-460a-8198-b4d50bbccdc3");


function forceDownload(blob, filename) {
	var a = document.createElement('a');
	a.download = filename;
	a.href = blob;
	// For Firefox https://stackoverflow.com/a/32226068
	document.body.appendChild(a);
	a.click();
	a.remove();
  }
  
  // Current blob size limit is around 500MB for browsers
  function downloadResource(url, filename) {
	if (!filename) filename = url.split('\\').pop().split('/').pop();
	fetch(url, {
		headers: new Headers({
		  'Origin': location.origin
		}),
		mode: 'cors'
	  })
	  .then(response => response.blob())
	  .then(blob => {
		let blobUrl = window.URL.createObjectURL(blob);
		forceDownload(blobUrl, filename);
	  })
	  .catch(e => console.error(e));
  }

getCodeFileDownload(toClientUID, uid).then(data => {
	console.log(data.instructions);
	document.getElementById("instructions").innerHTML += data.instructions;
	downloadResource(data.url, data.fileName);

});

const upload = async () => {
	const selectedFile = document.getElementById("file").files[0];
	
	const url = await sendCompiledFile(uid, toClientUID, selectedFile);
	await sendCompiledMessage(uid, toClientUID, url);
};