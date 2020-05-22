import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDxtDnJtPzKB7KOralgiKaeIKEjdty_k5E',
	authDomain: 'moonlit-bucksaw-164319.firebaseapp.com',
	databaseURL: 'https://moonlit-bucksaw-164319.firebaseio.com',
	projectId: 'moonlit-bucksaw-164319',
	storageBucket: 'moonlit-bucksaw-164319.appspot.com',
	messagingSenderId: '23014649312',
	appId: '1:23014649312:web:398ac3e6ddc0873c1fcf85',
	measurementId: 'G-R73YFZPKJC',
}

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()
