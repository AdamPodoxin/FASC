// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
	getFirestore,
	collection,
	addDoc,
	deleteDoc,
	query,
	where,
	getDocs,
	getDoc,
	setDoc,
	doc,
	onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import {
	getStorage,
	ref,
	getDownloadURL,
	uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCfIy85p1fGmZwdfSacgFGic2Htzu2-YgM",
	authDomain: "fasc-ec621.firebaseapp.com",
	projectId: "fasc-ec621",
	storageBucket: "fasc-ec621.appspot.com",
	messagingSenderId: "885995656780",
	appId: "1:885995656780:web:07beae9e0c1c0a401186e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const usersCollection = collection(db, "users");
const requestsCollection = collection(db, "requests");
const filesCollection = collection(db, "files");

const getUsers = async () => {
	const usersSnapshot = await getDocs(usersCollection);
	let usersList = [];
	usersSnapshot.docs.forEach((doc) => {
		usersList.push({
			...doc.data(),
			id: doc.id,
		});
	});

	return usersList;
};
window.getUsers = getUsers;

const registerUser = async (name, CPU, GPU, RAM, OS, languages) => {
	const res = await addDoc(usersCollection, {
		name,
		CPU,
		GPU,
		RAM,
		OS,
		languages,
	});

	return res.id;
};
window.registerUser = registerUser;

const createRequest = async (from, to, instructions, sourceRef) => {
	await addDoc(requestsCollection, {
		from,
		to,
		instructions,
		isFinished: false,
		sourceRef: sourceRef,
		compiledRef: null,
	});
};
window.createRequest = createRequest;

const uploadFile = async (userID, file) => {
	const storageRef = ref(storage, `files/${userID}/${file.name}`);
	await uploadBytes(storageRef, file);
	const url = await getDownloadURL(storageRef);

	const fileRef = await addDoc(filesCollection, {
		url,
		name: file.name,
	});

	return fileRef;
};
window.uploadFile = uploadFile;
