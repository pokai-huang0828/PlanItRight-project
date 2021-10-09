import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import Screen from "./../components/Screen";
import TitleBar from "./../components/TitleBar";
import FormInputField from "./../components/FormInputField";
import defaultStyles from "./../config/styles";
import FormInputLabel from "./../components/FormInputLabel";
import taskStatus from "../config/taskStatus";
import DateUtil from "../utility/DateUtil";
import ErrorMessage from "./../components/ErrorMessage";

import usersRepository from "../API/repository/users";
import SelectAssigneeField from "../components/SelectAssigneeField";
import generateUUID from "./../utility/UUID";

import projectRepository from "../API/repository/projects";
import routes from "../navigation/routes";

// Use to CREATE or EDIT task
function TaskDetailEditScreen({ navigation, route }) {
  const { project, task } = route.params;

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [assignee, setAssignee] = useState({});

  const [startDate, setStartDate] = useState(
    task ? task.startDate : new Date()
  );
  const [endDate, setEndDate] = useState(task ? task.endDate : new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [isBacklog, setBacklog] = useState(true);
  const [isInProgress, setInProgress] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  const [usersLoaded, setUsersLoaded] = useState(false);
  const [projectMembers, setProjectMembers] = useState(project.members);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Load user information from user repository
    !usersLoaded && loadUsers();

    if (task) {
      handleStatusRadioCheck(task.status);
    }
  }, []);

  const loadUsers = async () => {
    setProjectMembers(await getProjectMembersInfo());
    setUsersLoaded(true);
  };

  // helper function: transform userUID -> user{uid, email, firstName, lastName}
  const getProjectMembersInfo = async () => {
    const projectMembersInfoTemp = [];

    for (const memberUID of projectMembers) {
      // An user object has email, firstName, lastName
      const user = await usersRepository.getUserByUID(memberUID.trim());
      user.uid = memberUID;
      projectMembersInfoTemp.push(user);

      if (task && task.assignee === memberUID) {
        setAssignee(user);
      }
    }

    return projectMembersInfoTemp;
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartDate(false);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndDate(false);
  };

  const showStartDatepicker = () => {
    setShowStartDate(true);
  };

  const showEndDatepicker = () => {
    setShowEndDate(true);
  };

  const onCreateTaskPressed = () => {
    // Validate project name and description are not empty
    if (title == "" || description == "") {
      return setErrorMsg("Please enter project name and description.");
    }
    // Validate assignee has been selected
    else if (!assignee.uid) {
      return setErrorMsg("Please select an assignee.");
    }
    // Validate date difference is greater than -1
    else if (DateUtil.calculateDayDifference(endDate, startDate) < 0) {
      return setErrorMsg("End Date cannot be before start date.");
    } else {
      const newTask = {
        id: generateUUID(),
        title,
        description,
        assignee: assignee.uid,
        startDate: DateUtil.formatDate(startDate, "YYYY-MM-DD"),
        endDate: DateUtil.formatDate(endDate, "YYYY-MM-DD"),
        status: getTaskStatus(),
      };

      project.tasks.push(newTask);

      try {
        projectRepository.updateProject(project.id, project);
        navigation.replace(routes.PROJECT_DETAIL, project);
      } catch (e) {
        setErrorMsg("Something went wrong. Please try again.");
        console.log(e);
      }
    }
  };

  const onSaveTask = () => {
    // Validate project name and description are not empty
    if (title == "" || description == "") {
      return setErrorMsg("Please enter project name and description.");
    }
    // Validate assignee has been selected
    else if (!assignee.uid) {
      return setErrorMsg("Please select an assignee.");
    }
    // Validate date difference is greater than -1
    else if (DateUtil.calculateDayDifference(endDate, startDate) < 0) {
      return setErrorMsg("End Date cannot be before start date.");
    } else {
      const updatedTask = {
        id: task.id,
        title,
        description,
        assignee: assignee.uid,
        startDate: DateUtil.formatDate(startDate, "YYYY-MM-DD"),
        endDate: DateUtil.formatDate(endDate, "YYYY-MM-DD"),
        status: getTaskStatus(),
      };

      const filteredTasks = project.tasks.filter(
        (t) => t.id !== updatedTask.id
      );
      project.tasks = [...filteredTasks, updatedTask];

      try {
        projectRepository.updateProject(project.id, project);
        navigation.replace(routes.PROJECT_DETAIL, project);
      } catch (e) {
        setErrorMsg("Something went wrong. Please try again.");
        console.log(e);
      }
    }
  };

  const getTaskStatus = () => {
    if (isBacklog) return taskStatus.BACKLOG;
    else if (isInProgress) return taskStatus.IN_PROGRESS;
    else if (isCompleted) return taskStatus.COMPLETED;
  };

  const handleStatusRadioCheck = (radioItemPressed) => {
    if (radioItemPressed === taskStatus.BACKLOG) {
      setBacklog(true);
      setInProgress(false);
      setCompleted(false);
    } else if (radioItemPressed === taskStatus.IN_PROGRESS) {
      setBacklog(false);
      setInProgress(true);
      setCompleted(false);
    } else {
      setBacklog(false);
      setInProgress(false);
      setCompleted(true);
    }
  };

  return (
    <Screen style={styles.container}>
      <TitleBar
        iconLeft="arrow-back"
        onLeftIconPress={() => navigation.pop()}
        title={task ? "Task Details Edit" : "Create New Task"}
      />
      <ScrollView>
        <FormInputField
          label="Task Name"
          leftIcon="note-plus"
          maxLength={50}
          numberOfLines={1}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <FormInputField
          label="Task Description"
          leftIcon="information"
          maxLength={500}
          numberOfLines={4}
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        {/* Assignee Field */}
        {usersLoaded && (
          <SelectAssigneeField
            projectMembers={projectMembers}
            selectedAssignee={assignee}
            onSelect={(selectedAssignee) => {
              setAssignee(selectedAssignee);
            }}
            showIcons={false}
          />
        )}

        <TouchableOpacity onPress={showStartDatepicker}>
          <FormInputField
            label="Start Date"
            leftIcon="clock"
            value={DateUtil.formatDate(startDate, "YYYY-MM-DD")}
            editable={false}
            placeholderTextColor="black"
            numberOfLines={1}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showEndDatepicker}>
          <FormInputField
            label="End Date"
            leftIcon="clock"
            value={DateUtil.formatDate(endDate, "YYYY-MM-DD")}
            editable={false}
            placeholderTextColor="black"
            numberOfLines={1}
          />
        </TouchableOpacity>

        {showStartDate && (
          <DateTimePicker
            value={task ? DateUtil.convertStringToDate(startDate) : startDate}
            mode="date"
            onChange={onStartDateChange}
          />
        )}

        {showEndDate && (
          <DateTimePicker
            value={task ? DateUtil.convertStringToDate(endDate) : endDate}
            mode="date"
            onChange={onEndDateChange}
          />
        )}

        {/* Add Status Radio Buttons */}
        <FormInputLabel label="Status" iconName="progress-check" />

        <CheckBox
          title="In Backlog"
          containerStyle={styles.checkBoxStyle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isBacklog}
          onPress={() => handleStatusRadioCheck(taskStatus.BACKLOG)}
        />
        <CheckBox
          title="In Progress"
          containerStyle={styles.checkBoxStyle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isInProgress}
          onPress={() => handleStatusRadioCheck(taskStatus.IN_PROGRESS)}
        />
        <CheckBox
          title="Completed"
          containerStyle={styles.checkBoxStyle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isCompleted}
          onPress={() => handleStatusRadioCheck(taskStatus.COMPLETED)}
        />

        <ErrorMessage error={errorMsg} visible={errorMsg} />

        <Button
          title={task ? "Save" : "Create"}
          onPress={task ? onSaveTask : onCreateTaskPressed}
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            backgroundColor: defaultStyles.colors.primary,
            marginBottom: 24,
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: defaultStyles.margin.large,
  },
  checkBoxStyle: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});

export default TaskDetailEditScreen;
