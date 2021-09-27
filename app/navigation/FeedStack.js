import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./../screens/HomeScreen";
import ProjectDetailScreen from "./../screens/ProjectDetailScreen";
import TaskDetailScreen from "./../screens/TaskDetailScreen";
import colors from "../config/colors";
import routes from "./routes";
import TaskDetailEditScreen from "./../screens/TaskDetailEditScreen";

const Stack = createStackNavigator();

const FeedStack = () => (
  <Stack.Navigator
    initialRouteName={routes.HOME}
    screenOptions={{
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.primary, height: 60 },
    }}
  >
    <Stack.Screen
      name={routes.HOME}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.PROJECT_DETAIL}
      component={ProjectDetailScreen}
      options={{
        title: "Project Details",
      }}
    />
    <Stack.Screen
      name={routes.PROJECT_DETAIL_EDIT}
      component={ProjectDetailScreen}
      options={{
        title: "Edit Project Details",
      }}
    />
    <Stack.Screen
      name={routes.TASK_DETAIL}
      component={TaskDetailScreen}
      options={{
        title: "Task Details",
      }}
    />
    <Stack.Screen
      name={routes.TASK_DETAIL_EDIT}
      component={TaskDetailEditScreen}
      options={{
        title: "Edit Task Details",
      }}
    />
  </Stack.Navigator>
);

export default FeedStack;
