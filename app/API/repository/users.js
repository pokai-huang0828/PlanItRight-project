import Firebase from "../../config/firebase";
import firebase from "firebase/app";

const db = Firebase.firestore().collection("users");

const updateUser = (userID, user) => {
  return db
  .doc(userID)
  .set({ ...user })
  .then(() => {
    console.log("Document successfully written!");
    return user;
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
}


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

const getUsersByEmail = (email) => {
  const users = [];

  return db
    .where("email", "==", email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push({...doc.data(), uid: doc.id});
      });
      return users;
    })
    .catch((error) => {
      console.error("Error getting user document: ", error);
    });
};

export default {
  getUserByUID,
  getUsersByEmail,
  updateUser
};
