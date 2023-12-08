import admin from "firebase-admin"
import notificationConfig from "lib/firebase/firebaseConfig"

const serviceAccount = notificationConfig as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const getAuth = () => admin.auth()
