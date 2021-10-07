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
import taskStatus from "../config/taskStatus";

function ProjectDetailScreen({ route, navigation }) {
  const project = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState(project.tasks);

  const filterTasks = (selectedIndex) => {
    const { tasks } = project;

    setSelectedIndex(selectedIndex);

    if (selectedIndex === 0) {
      return setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((task) => task.status === getFilterName(selectedIndex))
      );
    }
  };

  const getFilterName = (selectedIndex) => {
    switch (selectedIndex) {
      case 1:
        return taskStatus.BACKLOG;
      case 2:
        return taskStatus.IN_PROGRESS;
      case 3:
        return taskStatus.COMPLETED;
    }
  };

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
        onEditPressed={() => navigation.navigate(routes.PROJECT_DETAIL_EDIT, project)}
        onAddPressed={() =>
          navigation.navigate(routes.TASK_DETAIL_EDIT, project)
        }
      />

      {/* Task Status Group buttons */}
      <ButtonGroup
        buttons={TaskStatusBarItems}
        onPress={filterTasks}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{
          backgroundColor: defaultStyles.colors.primaryLight,
        }}
      />

      <ScrollView>
        {filteredTasks &&
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)}

        {filteredTasks.length === 0 && <Text>This project has no tasks.</Text>}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProjectDetailScreen;
