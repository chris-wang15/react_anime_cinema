import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO fix hardcode
// This not work: console.log("App: " + import.meta.env.REACT_APP_FIREBASE_API_KEY)
const firebaseConfig = {
    apiKey: "AIzaSyAFvNoZJ7k4_NHoRSec-uk_6wCkcdfdowI",
    authDomain: "animationcinema-74dc6.firebaseapp.com",
    databaseURL: "https://animationcinema-74dc6-default-rtdb.firebaseio.com",
    projectId: "animationcinema-74dc6",
    storageBucket: "animationcinema-74dc6.appspot.com",
    messagingSenderId: "861108305023",
    appId: "1:861108305023:web:dfa8178e281839f777d34a"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage}