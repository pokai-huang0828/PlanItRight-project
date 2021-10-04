import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import useUserInfo from "../hooks/useUserInfo";
import colors from "../config/colors";
import projectRepository from "../API/repository/projects";
import { signOut } from "../API/auth";
import { IconButton } from "../components";
import routes from "../navigation/routes";
import logoImage from "../assets/PlanItRightLogo.png";

import Firebase from "./../config/firebase";
import TitleBar from "./../components/TitleBar";
import Card from "./../components/Card";
import defaultStyles from "./../config/styles";
import Screen from './../components/Screen';

// This is to ignore the warning from firebase
LogBox.ignoreLogs(["Setting a timer"]);

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
    <Screen>
      <TitleBar
        title="My Projects"
        logoImage={logoImage}
        iconRight="logout"
        onRightIconPress={handleSignOut}
      />

      <ScrollView style={styles.contextContainer}>
        {!loading && (
          <Text style={styles.title}>Welcome {userInfo?.firstName}!</Text>
        )}
        <Text style={styles.title}>Your UID is: {user.uid} </Text>

        <Card
          iconLeft="email"
          cardHeading="headfing"
          cardText="conjfhdfb dsjdhf dsjkdh"
          cardDate="dhsjdh dbsjh"
          onViewDetailIconPress={() => navigation.navigate(routes.PROJECT_DETAIL, project)}
        />
        <Card
          iconLeft="email"
          cardHeading="headfing"
          cardText="conjfhdfb dsjdhf dsjkdh"
          cardDate="dhsjdh dbsjh"
          onViewDetailIconPress={() => console.log("card pressed")}
        />
        <Card
          iconLeft="email"
          cardHeading="headfing"
          cardText="conjfhdfb dsjdhf dsjkdh"
          cardDate="dhsjdh dbsjh"
          onViewDetailIconPress={() => console.log("card pressed")}
        />

        {data.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() => navigation.navigate(routes.PROJECT_DETAIL, project)}
          >
            <Text style={styles.title}>{project.name}</Text>
          </TouchableOpacity>
        ))}

        {/* add spacer at the end */}
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contextContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  title: defaultStyles.textTitle,
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
});
