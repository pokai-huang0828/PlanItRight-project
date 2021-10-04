import Firebase from "../../config/firebase";
import firebase from "firebase/app";

const db = Firebase.firestore().collection("users");

const getUserByUID = (userID) => {
  return db
    .doc(userID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .catch((error) => {
      console.error("Error getting user document: ", error);
    });
};

export default {
  getUserByUID,
};
