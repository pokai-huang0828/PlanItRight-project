import Firebase from "../../config/firebase";
import firebase from "firebase/app";

const db = Firebase.firestore().collection("projects");

const getProjects = (userID) => {
  const projects = [];

  return db
    .where("members", "array-contains", userID)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        projects.push({ id: doc.id, ...doc.data() });
      });

      return projects;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

const addProject = (project) => {
  project.timeStamp = firebase.firestore.FieldValue.serverTimestamp();

  return db
    .add(project)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

const updateProject = (project) => {
  return db
    .doc(project.id)
    .set({ ...project })
    .then(() => {
      console.log("Document successfully written!");
      return project;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

const deleteProject = (projectID) => {
  db.doc(projectID)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

const onProjectsChange = (userID, callback) => {
  const unsubscriber = db
    .where("members", "array-contains", userID)
    .onSnapshot((querySnapshot) => {
      var projects = [];
      
      querySnapshot.forEach((doc) => {
        projects.push(doc.data().name);
      });

      callback();
      // console.log("Current cities in CA: ", projects.join(", "));
    });

  return unsubscriber;
};

export default {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  onProjectsChange,
};
