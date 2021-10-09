import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import {
  ButtonGroup,
  LinearProgress,
  Overlay,
  Icon,
} from "react-native-elements";

import routes from "../navigation/routes";
import Screen from "./../components/Screen";
import TitleBar from "./../components/TitleBar";
import defaultStyles from "./../config/styles";
import TaskCard from "./../components/TaskCard";
import ProjectTitle from "../components/ProjectTitle";
import TaskStatusBarItems from "../components/TaskStatusBarItems";
import taskStatus from "../config/taskStatus";

import projectRepository from "../API/repository/projects";
import { AuthenticatedUserContext } from "./../navigation/AuthenticatedUserProvider";

function ProjectDetailScreen({ route, navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  let project = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState(project.tasks);
  const [overlayVisible, setOverlayVisible] = useState(false);

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

  const deleteTask = (taskToDelete) => {
    if (project.tasks.includes(taskToDelete)) {
      project.tasks = project.tasks.filter((t) => t.id !== taskToDelete.id);
      setFilteredTasks(project.tasks);
      projectRepository.updateProject(project.id, project);
    }
  };

  const editTask = (taskToEdit) => {
    navigation.navigate(routes.TASK_DETAIL_EDIT, { project, task: taskToEdit });
  };

  const calculateProjectCompletion = () => {
    const { tasks } = project;

    if (tasks.length === 0) return 0;

    const completedTaskCount = [...tasks].filter(
      (task) => task.status === taskStatus.COMPLETED
    ).length;

    return completedTaskCount / tasks.length;
  };

  const projectCompletionInPercentage = () => {
    return Math.round(calculateProjectCompletion() * 100);
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const isProjectOwner = () => {
    return project.owners.includes(user.uid);
  };

  return (
    <Screen>
      <TitleBar
        iconLeft="arrow-back"
        onLeftIconPress={() => navigation.navigate(routes.HOMESTACK)}
        title="Project Detail"
      />

      <Icon
        raised
        name={project.icon}
        type="font-awesome"
        size={defaultStyles.icon.size}
        color={defaultStyles.colors.primary}
      />

      <ProjectTitle
        project={{ title: project.name }}
        onInfoPressed={toggleOverlay}
        showEditIcon={isProjectOwner()}
        onEditPressed={() =>
          navigation.navigate(routes.PROJECT_DETAIL_EDIT, project)
        }
        onAddPressed={() =>
          navigation.replace(routes.TASK_DETAIL_EDIT, { project })
        }
      />

      <View style={{ margin: defaultStyles.margin.medium }}>
        <Text>{projectCompletionInPercentage()}% Completed</Text>
        <LinearProgress
          value={calculateProjectCompletion()}
          variant="determinate"
          color={defaultStyles.colors.primaryLight}
        />
      </View>

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
        {filteredTasks.length !== 0 &&
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              showDeleteIcon={isProjectOwner()}
              onDeleteTask={(taskToDelete) => deleteTask(taskToDelete)}
              onEditTask={(taskToEdit) => editTask(taskToEdit)}
            />
          ))}

        {filteredTasks.length === 0 && (
          <Text style={styles.noTextStyle}>No tasks.</Text>
        )}
      </ScrollView>

      {/* Pop up to show project details */}
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.contentHeadingText} numberOfLines={1}>
          {project.name}
        </Text>

        <Text style={styles.contentText}>{project.description}</Text>
        <Text style={styles.contentDate}></Text>
        <Text style={styles.contentDate}>Start Date: {project.startDate}</Text>
        <Text style={styles.contentDate}>End Date: {project.endDate}</Text>
        <Text style={styles.contentDate}>
          Member count: {project.members.length}
        </Text>
      </Overlay>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentHeadingText: {
    color: defaultStyles.colors.white,
    fontWeight: defaultStyles.textTitle.fontWeight,
    fontSize: defaultStyles.textTitle.fontSize,
  },
  contentDate: {
    color: defaultStyles.colors.white,
  },
  contentText: {
    color: defaultStyles.colors.white,
    marginVertical: defaultStyles.margin.medium,
  },
  overlayStyle: {
    width: "90%",
    minHeight: "50%",
    padding: defaultStyles.margin.large,
    backgroundColor: defaultStyles.colors.primaryLight,
    borderRadius: defaultStyles.border.borderRadius,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  noTextStyle: {
    marginStart: defaultStyles.margin.small,
  },
});

export default ProjectDetailScreen;
