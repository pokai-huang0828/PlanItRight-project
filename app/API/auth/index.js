import Firebase from "../../config/firebase";

const auth = Firebase.auth();
const db = Firebase.firestore();

export const signUp = async (email, password, firstName, lastName) => {
  await auth.createUserWithEmailAndPassword(email, password);
  const currentUser = auth.currentUser;

  db.collection("users").doc(currentUser.uid).set({
    email: currentUser.email,
    firstName: firstName,
    lastName: lastName,
  });

  currentUser.firstName = firstName;
  currentUser.lastName = lastName;

  return currentUser;
};

export const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
}

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (uid) => {
  const docRef = db.collection("/users").doc(uid);

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        return doc.data();
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};