import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
import 'firebase/compat/database'

const firebaseConfig = {
	apiKey: "AIzaSyCUP2fjQzQ02qe9wI1ZjlIu8LPJNUfXgII",
	authDomain: "crisp-shop.firebaseapp.com",
	projectId: "crisp-shop",
	storageBucket: "crisp-shop.appspot.com",
	messagingSenderId: "672476267301",
	appId: "1:672476267301:web:ab339694f9f387e02150cc",
	measurementId: "G-4T0KJGD3TD"
};


const app = firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore();
const storage = firebase.storage()
const auth = firebase.auth();
const database = firebase.database();

export { app, firestore, storage, auth, database }