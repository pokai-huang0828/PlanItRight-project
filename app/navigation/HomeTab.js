import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "./../screens/AccountScreen";
import CreateProjectScreen from "./../screens/CreateProjectScreen";
import NewProjectButton from "./NewProjectButton";
import routes from "./routes";
import colors from "../config/colors";
import FeedStack from "./FeedStack";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator 
      barStyle={{ backgroundColor: colors.primary }}
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.NEW_PROJECT}
        component={CreateProjectScreen}
        options={({ navigation }) => ({
          tabBarIcon: () => (
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
