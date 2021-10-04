import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Screen from "../components/Screen";
import FormInputField from "./../components/FormInputField";
import TitleBar from "./../components/TitleBar";
import defaultStyles from "./../config/styles";
import IconSelection from "../components/IconSelection";
import { projectIcons } from "./../config/projectIcons";
import ProjectMembersField from "./../components/ProjectMembersField";
import usersRepository from "../API/repository/users";

// TODO: Navigation should pass a Project obj into this screen
// TODO: Replace all state default value using the Project prop
function ProjectDetailEditScreen(props) {
  const [projectIcon, setProjectIcon] = useState(projectIcons[0]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [projectOwners, setProjectOwners] = useState([
    "8cpwRHIqCHgd8L4mHwmALKibLh82",
  ]);
  const [projectMembers, setProjectMembers] = useState([
    "8cpwRHIqCHgd8L4mHwmALKibLh82",
    "LMqT8h0rDzYs3sYQCZlqKEJitus1",
  ]);
  const [isUsersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    // Load user information from user repository
    !isUsersLoaded && loadUsers();
  }, []);

  const loadUsers = async () => {
    const projectMembersTemp = await getProjectMembersInfo();
    const projectOwnersTemp = filterOwnersFromMembers(projectMembersTemp);

    setProjectOwners(projectOwnersTemp);
    setProjectMembers(projectMembersTemp);
    setUsersLoaded(true);
  };

  // helper function: Filter Owners From Members
  const filterOwnersFromMembers = (projectMembersTemp) => {
    return projectMembersTemp.filter((user) => {
      let isOwner = true;
      for (const ownerUID of projectOwners) {
        if (ownerUID === user.uid) isOwner = false;
        break;
      }
      return !isOwner;
    });
  };

  // helper function: transform userUID -> user{uid, email, firstName, lastName}
  const getProjectMembersInfo = async () => {
    const projectMembersInfoTemp = [];

    for (const memberUID of projectMembers) {
      // An user object has email, firstName, lastName
      const user = await usersRepository.getUserByUID(memberUID);
      user.uid = memberUID;
      projectMembersInfoTemp.push(user);
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

  return (
    <Screen>
      <TitleBar title="New Project" />

      <ScrollView>
        {/* List of icon selection */}
        <IconSelection
          label="Project Icon"
          projectIcons={projectIcons}
          onSelected={(iconName) => setProjectIcon(iconName)}
        />

        <FormInputField
          label="Project Name"
          leftIcon="folder"
          maxLength={50}
          numberOfLines={1}
          value={projectName}
          onChangeText={(text) => setProjectName(text)}
        />

        <FormInputField
          label="Project Description"
          leftIcon="information"
          maxLength={500}
          numberOfLines={4}
          multiline
          value={projectDescription}
          onChangeText={(text) => setProjectDescription(text)}
        />

        <TouchableOpacity onPress={showStartDatepicker}>
          <FormInputField
            label="Start Date"
            leftIcon="clock"
            value={moment(startDate).format("YYYY-MM-DD")}
            editable={false}
            placeholderTextColor="black"
            numberOfLines={1}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showEndDatepicker}>
          <FormInputField
            label="End Date"
            leftIcon="clock"
            value={moment(endDate).format("YYYY-MM-DD")}
            editable={false}
            placeholderTextColor="black"
            numberOfLines={1}
          />
        </TouchableOpacity>

        {showStartDate && (
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={onStartDateChange}
          />
        )}

        {showEndDate && (
          <DateTimePicker
            value={endDate}
            mode="date"
            onChange={onEndDateChange}
          />
        )}

        {/* Project Members */}
        {!isUsersLoaded && (
          <ActivityIndicator
            size="large"
            color={defaultStyles.colors.primaryLight}
          />
        )}
        {isUsersLoaded && (
          <ProjectMembersField
            projectOwners={projectOwners}
            projectMembers={projectMembers}
            onChange={(projectOwners, projectMembers) =>
              console.log("member field changed")
            }
          />
        )}

        <Button
          title="Create"
          onPress={() => console.log("submit new project")}
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
});

export default ProjectDetailEditScreen;
