import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaaYZOM6ZEsZ8gst5S8lNvI2e688ePP1k",
  authDomain: "profile-ff5ea.firebaseapp.com",
  projectId: "profile-ff5ea",
  storageBucket: "profile-ff5ea.appspot.com",
  messagingSenderId: "76010109044",
  appId: "1:76010109044:web:48067cafb1d506a5a6f921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
export const storage = getStorage(app);