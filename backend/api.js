// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, getDoc, setDoc, doc, onSnapshot  } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
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

const registerAccount = async (name, CPU, GPU, RAM, OS, languages) => {
	const uid = generateUID();

	await setDoc(doc(db, "providers", uid), {
		name,
		CPU,
		GPU,
		RAM,
		OS,
		languages
	});

	return uid;
};

const sendCompileRequest = async (from, to, fileURL, instructions) => {
	await setDoc(doc(db, "compile_requests", `${from}_${to}`), {
		from,
		to,
		fileURL,
		instructions
	});
};

const sendCodeFile = async (from, to, file) => {
	const storageRef = ref(storage, `code_files/${from}_${to}/${file.name}`);
	await uploadBytes(storageRef, file);

	const url = await getDownloadURL(storageRef);
	return url;
};
