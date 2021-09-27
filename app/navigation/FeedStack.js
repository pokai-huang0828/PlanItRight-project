import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./../screens/HomeScreen";
import ProjectDetailScreen from "./../screens/ProjectDetailScreen";
import colors from "../config/colors";
import routes from "./routes";

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
  </Stack.Navigator>
);

export default FeedStack;
