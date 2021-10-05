import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { ButtonGroup, Icon } from "react-native-elements";
import ButtonGroupItem from "../components/ButtonGroupItem";

import routes from "../navigation/routes";
import Screen from "./../components/Screen";
import TitleBar from "./../components/TitleBar";
import defaultStyles from "./../config/styles";
import TaskCard from "./../components/TaskCard";
import taskStatus from "../config/taskStatus";
import ProjectTitle from "../components/ProjectTitle";

const buttons = [
  <ButtonGroupItem label="All" badgeLabel="primary" />,
  <ButtonGroupItem label="BackLog" badgeLabel="error" />,
  <ButtonGroupItem label="Progress" badgeLabel="warning" />,
  <ButtonGroupItem label="Completed" badgeLabel="success" />,
];

// function ProjectDetailScreen({ route, navigation }) {
// const project = route.params;
function ProjectDetailScreen({}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const task1 = {
    id: "123",
    title: "Find the left person",
    description:
      "Need to find a person who I can rely on. This is a very hard task!",
    assignee: "123",
    startDate: "02-12-2003",
    endDate: "02-12-2013",
    status: taskStatus.COMPLETE,
  };

  const task2 = {
    id: "123",
    title: "Find the right person",
    description:
      "Need to find a person who I can rely on. This is a very hard task!",
    assignee: "123",
    startDate: "02-12-2003",
    endDate: "02-12-2013",
    status: taskStatus.IN_PROGRESS,
  };

  return (
    <Screen>
      <TitleBar title="Project Detail" />

      <ProjectTitle
        project={{ title: "Wedding Plan" }}
        onEditPressed={() => console.log("edit pressed")}
        onInfoPressed={() => console.log("info pressed")}
      />

      {/* Task Status Group buttons */}
      <ButtonGroup
        buttons={buttons}
        onPress={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{
          backgroundColor: defaultStyles.colors.primaryLight,
        }}
      />

      <ScrollView>
        {/* TODO: Replace with real data!!!! */}
        <TaskCard task={task1} />
        <TaskCard task={task2} />
        <TaskCard task={task1} />
        <TaskCard task={task2} />
        <TaskCard task={task1} />
        <TaskCard task={task2} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProjectDetailScreen;
