import React from "react";

import Routes from "./app/navigation/index";
import LoginScreen from "./app/screens/LoginScreen";
import TestScreen from "./app/screens/TestScreen";
import TaskDetailEditScreen from './app/screens/TaskDetailEditScreen';

export default function App() {
  // return <TestScreen/>
  return <TaskDetailEditScreen/>
  // return <Routes />;
}
