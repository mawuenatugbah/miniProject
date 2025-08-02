// lib/history.ts
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export async function saveQuestion(question: string, subject: string, hasImage: boolean = false) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = await addDoc(collection(db, `users/${user.uid}/questions`), {
    question,
    subject,
    hasImage,
    timestamp: new Date(),
  });

  return docRef.id;
}

export async function getQuestions() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(collection(db, `users/${user.uid}/questions`), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as {
    id: string;
    question: string;
    subject: string;
    hasImage: boolean;
    timestamp: any;
  }[];
}
