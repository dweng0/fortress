import firebase from 'firebase'
import '@firebase/firestore';

const configuration = {
    firebaseConfig: {
        apiKey: "AIzaSyCGcYuwhC_TgSa09SxpUdeZe_v770UoFfg",
        authDomain: "localhost",
        projectId: "fortress-da186"
    }
};

firebase.initializeApp(configuration.firebaseConfig);

export default {
    collections: firebase.firestore(),
    auth: firebase.auth()
}