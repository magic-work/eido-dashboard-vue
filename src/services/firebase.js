import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
  deleteUser
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-5XlHKznr-twx7yBnxz2gukhlD47mXOI",
  authDomain: "magicwork-dev-107ec.firebaseapp.com",
  projectId: "magicwork-dev-107ec",
  storageBucket: "magicwork-dev-107ec.appspot.com",
  messagingSenderId: "646358261243",
  appId: "1:646358261243:web:19c3299b13da5b696bff5e"
};

const firebaseInit = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseInit);

const signInWithFirebase = async (email, password) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

const firebaseEmailSignup = async (email, password) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

const signOutWithFirebase = async () => {
  return await signOut(firebaseAuth)
};

const signInWithGoogle =  async() => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  return await signInWithPopup(firebaseAuth, provider);
};

const deleteUserAccount = async (user) => {
  return await deleteUser(user);
}

const passwordResetEmail = async (email) => {
  return await sendPasswordResetEmail(firebaseAuth, email);
}

const updateProfileWithFirebase = async (user, payload) => {
  return await updateProfile(user, {
    displayName: payload.displayName
  });
}

const getFirebaseErrorMessage = (firebaseMessage) => {
  switch (firebaseMessage) {
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-credential":
      return "These credentials are not valid";
    case "auth/user-not-found":
      return "User account not found";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/missing-password":
      return "Please insert your password";
    case "auth/invalid-login-credentials":
      return "Invalid credentials";
    case "auth/email-already-in-use":
      return "This email address already in use";
    case "auth/too-many-requests":
      return "You have attempted this too many times in a short period of time. Please try again later.";
    case "auth/requires-recent-login":
      return "This action requires a recent login. Please logout and login again, then repeat the process.";
    default:
      return "There was a problem processing the request";
  }
};

export {
  signInWithFirebase,
  getFirebaseErrorMessage,
  signInWithGoogle,
  signOutWithFirebase,
  passwordResetEmail,
  updateProfileWithFirebase,
  firebaseEmailSignup,
  deleteUserAccount
}
