import React, { useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";

import routes from "../navigation/routes";
import Screen from "./../components/Screen";
import TitleBar from "./../components/TitleBar";
import defaultStyles from "./../config/styles";
import TaskCard from "./../components/TaskCard";
import ProjectTitle from "../components/ProjectTitle";
import TaskStatusBarItems from "../components/TaskStatusBarItems";

function ProjectDetailScreen({ route, navigation }) {
  const project = route.params;
  // function ProjectDetailScreen({}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Screen>
      <TitleBar
        iconLeft="arrow-back"
        onLeftIconPress={() => navigation.pop()}
        title="Project Detail"
      />

      <ProjectTitle
        project={{ title: project.name }}
        onInfoPressed={() => console.log("info pressed")}
        onEditPressed={() => navigation.navigate(routes.PROJECT_DETAIL_EDIT)}
        onAddPressed={() =>
          navigation.navigate(routes.TASK_DETAIL_EDIT, project)
        }
      />

      {/* Task Status Group buttons */}
      <ButtonGroup
        buttons={TaskStatusBarItems}
        onPress={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{
          backgroundColor: defaultStyles.colors.primaryLight,
        }}
      />

      <ScrollView>
        {project.tasks &&
          project.tasks.map((task) => <TaskCard key={task.id} task={task} />)}

        {project.tasks.length === 0 && <Text>This project has no tasks.</Text>}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProjectDetailScreen;
