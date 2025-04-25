import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Sua configuração do Firebase
// Substitua esses valores pelos seus próprios valores do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "sua-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "seu-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "seu-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "seu-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "seu-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "seu-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Firestore
const db = getFirestore(app);

// Inicializar o Analytics com tratamento de erro
let analytics = null;
const initAnalytics = async () => {
  try {
    const isAnalyticsSupported = await isSupported();
    if (isAnalyticsSupported && typeof window !== 'undefined') {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics inicializado com sucesso');
    } else {
      console.log('Firebase Analytics não é suportado neste ambiente');
    }
  } catch (error) {
    console.error('Erro ao inicializar Firebase Analytics:', error);
  }
};

// Inicializar Analytics apenas se estiver no navegador
if (typeof window !== 'undefined') {
  initAnalytics();
}

export { app, db, analytics }; 