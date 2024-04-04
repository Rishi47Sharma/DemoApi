import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import config from "./config.js";

const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);
const selector_CSS = collection(db, "selector_CSS");

export { db, selector_CSS, collection, doc, setDoc, writeBatch, getDocs };
