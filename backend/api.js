// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, deleteDoc, query, where, getDocs, getDoc, setDoc, doc, onSnapshot  } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfIy85p1fGmZwdfSacgFGic2Htzu2-YgM",
  authDomain: "fasc-ec621.firebaseapp.com",
  projectId: "fasc-ec621",
  storageBucket: "fasc-ec621.appspot.com",
  messagingSenderId: "885995656780",
  appId: "1:885995656780:web:07beae9e0c1c0a401186e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// https://stackoverflow.com/a/6248722
const generateUID = () => {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

const getProviders = async () => {
	const providersCollection = collection(db, "providers");
	const providersSnapshot = await getDocs(providersCollection);
	const providersList = providersSnapshot.docs.map(doc => doc.data());
	return providersList;
};
window.getProviders = getProviders;

const registerAccount = async (name, CPU, GPU, RAM, OS, languages) => {
	const uid = generateUID();

	await setDoc(doc(db, "providers", uid), {
		uid,
		name,
		CPU,
		GPU,
		RAM,
		OS,
		languages
	});

	return uid;
};
window.registerAccount = registerAccount;

const sendCompileRequest = async (from, to, fileURL, fileName, instructions) => {
	await setDoc(doc(db, "compile_requests", `${from}_${to}`), {
		from,
		to,
		fileURL,
		fileName,
		instructions
	});
};
window.sendCompileRequest = sendCompileRequest;

const sendCodeFile = async (from, to, file) => {
	const storageRef = ref(storage, `code_files/${from}_${to}/${file.name}`);
	await uploadBytes(storageRef, file);

	const url = await getDownloadURL(storageRef);
	return url;
};
window.sendCodeFile = sendCodeFile;

const sendCompiledMessage = async (from, to, fileURL) => {
	await setDoc(doc(db, "compiled_messages", `${from}_${to}`), {
		from,
		to,
		fileURL
	});
};
window.sendCompiledMessage = sendCompiledMessage;

const sendCompiledFile = async (from, to, file) => {
	const storageRef = ref(storage, `compiled_files/${from}_${to}/${file.name}`);
	await uploadBytes(storageRef, file);

	const url = await getDownloadURL(storageRef);
	return url;
};
window.sendCompiledFile = sendCompiledFile;

const deleteAccount = async (uid) => {
	await deleteDoc(doc(db, "providers", uid));
};
window.deleteAccount = deleteAccount;

const downloadFile = async(url) => {
	const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';

    xhr.onload = (event) => {
      const blob = xhr.response;
    };

    xhr.open('GET', url);
    xhr.send();
};
window.downloadFile = downloadFile;

const getCodeFileDownload = async (from, to) => {
	const docRef = doc(db, "compile_requests", `${from}_${to}`);
	const docSnap = await getDoc(docRef);

	const data = docSnap.data();
	const url = data.fileURL;
	const fileName = data.fileName;
	const instructions = data.instructions;

	return {
		url, 
		fileName,
		instructions
	};
};
window.getCodeFileDownload = getCodeFileDownload;