import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleprovider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

   try {

      const result = await signInWithPopup(FirebaseAuth, googleprovider);
      // const credentials = GoogleAuthProvider.credentialFromResult(result);

      const { displayName, email, photoURL, uid } = result.user;

      return {
         ok: true,
         // User info
         displayName, email, photoURL, uid
      };

   } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
         ok: false,
         errorMessage
      };
   }

};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

   try {

      const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      const { uid, photoURL } = resp.user;
      console.log(resp);
      //TODO: actualizar el displayName en Firebase
      await updateProfile(FirebaseAuth.currentUser, { displayName });

      return {
         ok: true,
         uid, photoURL, email, displayName
      };


   } catch (error) {
      // console.log(error);
      return { ok: false, errorMessage: error.message };
   }

};

export const signInWithEmailPassword = async ({ email, password }) => {

   try {

      const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      const { uid, photoURL, displayName } = resp.user;

      return {
         ok: true,
         uid, photoURL, email, displayName
      };

   } catch (error) {
      return { ok: false, errorMessage: error.message };
   }

};

export const logoutFirebase = async () => {
   return await FirebaseAuth.signOut();
};
