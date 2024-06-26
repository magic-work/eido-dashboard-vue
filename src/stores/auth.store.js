import { defineStore } from "pinia";
import {
  getFirebaseErrorMessage,
  signInWithFirebase,
  signInWithGoogle,
  signOutWithFirebase,
  passwordResetEmail,
  updateProfileWithFirebase,
  firebaseEmailSignup,
  deleteUserAccount
} from "@/services/firebase";
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    accessToken: null,
    isCheckingAuth: false,
    authErrorMessage: null,
    showEmailVerificationModal: false
  }),

  getters: {
    displayName: (state) => {
      return state.user?.displayName;
    },
    email: (state) => {
      return state.user?.email;
    },
    checkingAuth: (state) => {
      return state.isCheckingAuth;
    },
    dateCreated: (state) => {
      return new Date(state.user?.metadata?.creationTime);
    },
  },

  actions: {

    async clearErrorMessage() {
      this.authErrorMessage = null;
    },

    async signIn(email, password) {
      try {
        const userCredential = await signInWithFirebase(email, password);
        await this.setUser(userCredential.user);
      }
      catch (error) {
        this.authErrorMessage = getFirebaseErrorMessage(error.code);
      }
    },

    async emailSignUp(email, password) {
      try {
        const userCredential = await firebaseEmailSignup(email, password);
        await this.setUser(userCredential.user);
        this.emailVerificationSend();
      }
      catch (error) {
        console.log('Email signup error:', error.message);
        this.authErrorMessage = getFirebaseErrorMessage(error.code);
      }
    },

    async emailVerificationSend() {
      if (!this.user) {
        console.error('No user to send email verification to');
        return;
      }
      try {
        console.log('Sending Verification Email...');
        await sendEmailVerification(this.user);
        return { severity: 'success', summary: "We've sent you an email", detail: `We've resent a verification email to ${email}.`, life: 3000 }
      }
      catch (error) {
        console.error('Error sending verification email: ', error.message);
        const firebaseErrorMessage = getFirebaseErrorMessage(error.code);
        return { severity: 'error', summary: "Problem sending the verification email", detail: firebaseErrorMessage, life: 5000 }
      }
    },

    async googleSignIn() {
      try {
        const response = await signInWithGoogle();
        console.log("Login via Google was successful  😃");
        await this.setUser(response.user);
      }
      catch (error) {
        this.authErrorMessage = getFirebaseErrorMessage(error.code);
        console.error('Sign-in error:', error.message);}
    },

    async passwordReset(email) {
      try {
        await passwordResetEmail(email);
        return { severity: 'success', summary: "We've sent you an email", detail: `If the email ${email} exists in our database, you'll recieve an email with password reset instructions.`, life: 5000 }
      }
      catch (error) {
        console.log('Password reset error', error.message)
        return { severity: 'error', summary: 'Password', detail: `There was a problem resetting your password. Please try again.`, life: 3000 }
      }
    },

    async checkForAuthenticatedUser() {
      const auth = getAuth();
      this.isCheckingAuth = true;
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          await this.setUser(user);
          this.isCheckingAuth = false;
          unsubscribe();
          resolve();
        });
      });
    },

    async setUser(user) {
      this.user = user;
      if (user) {
        await user.reload();
        this.setEmailVerificationModal(!user.emailVerified);
        const token = await user.getIdToken();
        this.accessToken = token;
      }
    },

    async setEmailVerificationModal(value) {
      this.showEmailVerificationModal = value;
    },

    async updateUserProfile(payload) {
      try {
        await updateProfileWithFirebase(this.user, payload);
        return { severity: 'success', summary: 'Profile Updated', detail: `Your user profile was updated successfully.`, life: 3000 }
      }
      catch (error) {
        console.error('Profile update error:', error.message);
        return { severity: 'error', summary: 'Profile Update Failed', detail: `Something went wrong when trying to update your user profile. Please try again.`, life: 3000 }
      }
    },

    async getToken() {
      if (!this.user)
        return null;
      return await this.user.getIdToken();
    },

    async signOut() {
      await signOutWithFirebase();
      this.user = null;
    },

    async deleteUser() {
      return { severity: 'error', summary: 'Account not deleted', detail: `This is a test application and won't live very long. Account deletion is not possible.`, life: 3000 }
    }
  }

});


export default useAuthStore;
