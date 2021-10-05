import React from "react";

import Routes from "./app/navigation/index";
import LoginScreen from "./app/screens/LoginScreen";
import TestScreen from "./app/screens/TestScreen";
import TaskDetailEditScreen from './app/screens/TaskDetailEditScreen';
import CreateProjectScreen from "./app/screens/CreateProjectScreen";
import ProjectDetailEditScreen from './app/screens/ProjectDetailEditScreen';
import ProjectDetailScreen from './app/screens/ProjectDetailScreen';

export default function App() {
  // return <TestScreen/>
  // return <TaskDetailEditScreen/> 
  // return <CreateProjectScreen/>
  // return <ProjectDetailEditScreen/>
  return <ProjectDetailScreen/>
  // return <Routes />;
}
