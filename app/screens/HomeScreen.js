import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import useUserInfo from "../hooks/useUserInfo";
import colors from "../config/colors";
import projectRepository from "../API/repository/projects";
import usersRepository from "../API/repository/users";
import { signOut } from "../API/auth";
import { IconButton } from "../components";
import routes from "../navigation/routes";
import logoImage from "../assets/PlanItRightLogo.png";

import Firebase from "./../config/firebase";
import TitleBar from "./../components/TitleBar";
import Card from "./../components/Card";
import defaultStyles from "./../config/styles";
import Screen from "./../components/Screen";
import TextUtil from "./../utility/TextUtil";

// This is to ignore the warning from firebase
LogBox.ignoreLogs(["Setting a timer"]);

export default function HomeScreen({ navigation }) {
  // this user obj contains user UID and email
  const { user } = useContext(AuthenticatedUserContext);
  // use this hook if you need to get extra user info firstName and lastName
  const { userInfo, loading, getUserInfo } = useUserInfo(user);

  const [projects, setProjects] = useState([]);

  const loadData = async () => {
    setProjects(await projectRepository.getProjects(user.uid));
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
          <Text style={styles.title}>
            Welcome {TextUtil.capitalizeFirstLetter(userInfo?.firstName)}!
          </Text>
        )}

        {/* <Text style={styles.title}>Your UID is: {user.uid} </Text> */}

        {/* TODOs: Add a text: no projects if there is no project */}

        {projects &&
          projects.map((project) => (
            <Card
              key={project.name}
              iconLeft={project.icon}
              cardHeading={project.name}
              cardText={project.description}
              cardStartDate={project.startDate}
              cardEndDate={project.endDate}
              onViewDetailIconPress={() =>
                navigation.navigate(routes.PROJECT_DETAIL, project)
              }
            />
          ))}

        {/* add spacer at the end */}
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contextContainer: {
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
  },
  title: {
    ...defaultStyles.textTitle,
    marginVertical: defaultStyles.margin.medium,
  },
});
