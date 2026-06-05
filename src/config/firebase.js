import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuration keys loaded from Vite env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app = null;
let db = null;
let analytics = null;
let isFirebaseEnabled = false;

// Check if credentials exist to decide whether to activate database operations
if (firebaseConfig.projectId && firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseEnabled = true;
    console.log("[Sai Trends Firebase] Cloud Firestore initialized successfully.");
    
    // Initialize Analytics if supported and measurementId is present
    if (firebaseConfig.measurementId) {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
          console.log("[Sai Trends Firebase] Analytics initialized successfully.");
        }
      });
    }
  } catch (error) {
    console.error("[Sai Trends Firebase] Initialization failed:", error);
  }
} else {
  console.warn("[Sai Trends Firebase] Credentials not found in environment. Running in LocalStorage fallback mode.");
}

export { db, analytics, isFirebaseEnabled };

