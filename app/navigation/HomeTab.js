import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "./../screens/AccountScreen";
import CreateProjectScreen from "./../screens/CreateProjectScreen";
import NewProjectButton from "./NewProjectButton";
import routes from "./routes";
import colors from "../config/colors";
import FeedStack from "./FeedStack";

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.medium,
      }}
    >
      <Tab.Screen
        name={routes.HOME}
        component={FeedStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.NEW_PROJECT}
        component={CreateProjectScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewProjectButton
              onPress={() => navigation.navigate(routes.NEW_PROJECT)}
            />
          ),
        })}
      />
      <Tab.Screen
        name={routes.ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
