import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import useUserInfo from "../hooks/useUserInfo";
import colors from "../config/colors";
import projectRepository from "../API/repository/projects";
import { signOut } from "../API/auth";
import { IconButton } from "../components";
import routes from "../navigation/routes";

import Firebase from "./../config/firebase";

// Mock project
const project = {
  name: "my new project 3",
  createDate: Date().toString(),
  owners: ["1", "2"],
  members: ["1", "2"],
  tasks: [{ title: "", assignee: "", status: "completed" }],
};

const updatedProject = {
  id: "OzNI3T9GmiuiWH7GtAL9",
  name: "my updated project 2",
  createDate: Date().toString(),
  owners: ["1", "2"],
  members: ["1", "2"],
  tasks: [{ title: "", assignee: "", status: "completed" }],
};

export default function HomeScreen({ navigation }) {
  // this user obj contains user UID and email
  const { user } = useContext(AuthenticatedUserContext);

  // use this hook if you need to get extra user info firstName and lastName
  const { userInfo, loading, getUserInfo } = useUserInfo(user);

  const [data, setData] = useState([]);

  const loadData = async () => {
    const result = await projectRepository.getProjects(user.uid);
    // console.log(result);
    // projectRepository.addProject(project)
    setData(result);
  };

  useEffect(() => {
    // Call this function to get userInfo
    getUserInfo();

    // Load data from project repository
    loadData();

    // listen for any changes of the projects
    // in which this user is a member
    // You can pass a callback if changes happen
    const unsubscriber = projectRepository.onProjectsChange(user.uid, loadData);

    return unsubscriber;
  }, []);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        {!loading && (
          <Text style={styles.title}>Welcome {userInfo?.firstName}!</Text>
        )}
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <Text style={styles.text}>Your UID is: {user.uid} </Text>
      {data.map((project) => (
        <TouchableOpacity
          key={project.id}
          onPress={() => navigation.navigate(routes.PROJECT_DETAIL, project)}
        >
          <Text style={styles.title}>{project.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
});
