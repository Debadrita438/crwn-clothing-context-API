import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCDjeNMuU7pqR73OG9s9G0XZVmn0zPHIwo",
    authDomain: "crwn-db-bcbf3.firebaseapp.com",
    projectId: "crwn-db-bcbf3",
    storageBucket: "crwn-db-bcbf3.appspot.com",
    messagingSenderId: "248357052414",
    appId: "1:248357052414:web:213bcfa8a37c46775aaaaf",
    measurementId: "G-1F633V9EPW"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch(error) {
            console.log('Error creating user:', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;