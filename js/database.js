// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth, signInAnonymously} from "firebase/auth"
// import { getDatabase,ref,push,get,child,set } from "firebase/database"
import {getFirestore,collection, addDoc} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBlDi5qXtDTfMT_Q2QJhZu6AqxXdjii0BY",
	authDomain: "bigtactoe-e074b.firebaseapp.com",
	projectId: "bigtactoe-e074b",
	storageBucket: "bigtactoe-e074b.firebasestorage.app",
	messagingSenderId: "500679305801",
	appId: "1:500679305801:web:4b9c7a454b045aa822ad98",
	measurementId: "G-CMYPYEHV79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();
// const database = getDatabase(app)


export function turnIncrement(cur){

}

// export function getIncrement(){
// 	const dbRef = ref(database,'bigtactoe/stats')
// 	let val = {
// 		totalvisits:0;
//
// 	}
// 	await set(dbRef,{totalvisits:0,})
// }


async function signIn(){
	signInAnonymously(auth).then(()=>{
		console.log("signed in")
	}).catch((error)=>{
		console.log("error: "+ error)
	})

}
async function initialSetup(){
	// const dbRef = ref(database,'bigtactoe/stats')
	// let data={
	// 	turns:0,
	// 	games:0
	// }
	// await set(dbRef,data);
	const col = collection(db,"stats")
	const data = {
		turns:0,
		games:0
	}
	const docRef = await addDoc(col,data)
	db.collection("stats")
}


//
signIn();
initialSetup().then(r => console.log("success"))
