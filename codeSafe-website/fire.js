import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInAnonymously } from 'firebase/auth'
import {} from 'firebase/firestore'

const config = {
    apiKey: "",
    authDomain: "codesafe-506d9.firebaseapp.com",
    projectId: "codesafe-506d9",
    storageBucket: "codesafe-506d9.firebasestorage.app",
    messagingSenderId: "352500479380",
    appId: "1:352500479380:web:b9ea4a65eca347b0014b81",
    measurementId: "G-NQJW7VJ9D9"
}

const app = initializeApp(config)

const appcheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6LdzYYkrAAAAAMzDi1vVqryy2qE5oxxxtLqkLLPV"), 
    isTokenAutoRefreshEnabled: true
})

const auth = getAuth(app)
auth.useDeviceLanguage()

signInAnonymously(auth)
onAuthStateChanged(auth, (user) => {
    if(user == null){
        console.log("user not found")
    }else{
        console.log("user logged in")
    }
})