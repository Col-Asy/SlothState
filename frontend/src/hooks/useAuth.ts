import { auth, db } from "@/utils/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, writeBatch } from "firebase/firestore";

// Email/password sign up with username check
export const signUp = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

// Check username availability
export const checkUsernameAvailable = async (username: string) => {
  const usernameDoc = await getDoc(doc(db, "usernames", username));
  return !usernameDoc.exists();
};

// Save additional details with atomic username creation
export const saveAdditionalDetails = async (username: string, bio: string) => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const batch = writeBatch(db);
  const userRef = doc(db, "users", auth.currentUser.uid);
  const usernameRef = doc(db, "usernames", username.toLowerCase());

  batch.set(userRef, {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    displayName: auth.currentUser.displayName,
    username: username.toLowerCase(),
    bio,
    createdAt: new Date().toISOString(),
  });

  batch.set(usernameRef, {
    uid: auth.currentUser.uid,
    createdAt: new Date().toISOString(),
  });

  await batch.commit();
};
