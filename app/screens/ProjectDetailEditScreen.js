import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import Screen from "../components/Screen";
import FormInputField from "./../components/FormInputField";
import TitleBar from "./../components/TitleBar";
import defaultStyles from "./../config/styles";
import IconSelection from "../components/IconSelection";
import { projectIcons } from "./../config/projectIcons";
import ProjectMembersField from "./../components/ProjectMembersField";
import ErrorMessage from "./../components/ErrorMessage";
import DateUtil from "../utility/DateUtil";

import usersRepository from "../API/repository/users";
import projectRepository from "../API/repository/projects";
import routes from "../navigation/routes";

// TODO: Navigation should pass a Project obj into this screen
// TODO: Replace all state default value using the Project prop
function ProjectDetailEditScreen({ route, navigation }) {
  const project = route.params;

  const [projectIcon, setProjectIcon] = useState(project.icon);
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [projectOwners, setProjectOwners] = useState(project.owners);
  const [projectMembers, setProjectMembers] = useState(project.members);

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [isUsersLoaded, setUsersLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const updateProject = () => {
    setErrorMsg("");

    const updatedProject = {
      icon: projectIcon,
      name: projectName,
      description: projectDescription,
      startDate: DateUtil.formatDate(startDate, "YYYY-MM-DD"),
      endDate: DateUtil.formatDate(endDate, "YYYY-MM-DD"),
      owners: removeMembersInfo(projectOwners),
      members: removeMembersInfo(projectMembers),
      tasks: project.tasks,
    };

    // Validate project name and description are not empty
    if (projectName == "" || projectDescription == "") {
      return setErrorMsg("Please enter project name and description.");
    }
    // Validate date difference is greater than -1
    else if (DateUtil.calculateDayDifference(endDate, startDate) < 0) {
      return setErrorMsg("End Date cannot be before start date.");
    } else {
      projectRepository.updateProject(project.id, updatedProject);
      navigation.navigate(routes.HOMESTACK);
    }
  };
  
  const deleteProject = () => {
    projectRepository.deleteProject(project.id);
    navigation.navigate(routes.HOMESTACK);
  };

  const removeMembersInfo = (members) => {
    return members.map((member) => member.uid);
  };

  const removeMember = (member) => {
    setProjectMembers(projectMembers.filter((m) => m.uid !== member.uid));
  };

  const makeOwner = (member) => {
    if (projectOwners.includes(member)) {
      if (projectOwners.length === 1) {
        return setErrorMsg("A project must have at least one owner.");
      }
      setProjectOwners(projectOwners.filter((m) => m.uid !== member.uid));
    } else {
      setProjectOwners([...projectOwners, member]);
    }
  };

  const addMember = async () => {
    setErrorMsg("");

    // First check if the user has been added
    if (isProjectMember()) {
      return setErrorMsg("This user has already been added.");
    }

    // Note that this returns an ARRAY with all matches
    const existingUsers = await usersRepository.getUsersByEmail(
      newMemberEmail.toLowerCase().trim()
    );

    if (existingUsers.length === 0) {
      return setErrorMsg("Cannot find user with this email.");
    }

    setProjectMembers([...projectMembers, existingUsers[0]]);
    setNewMemberEmail("");
  };

  const isProjectMember = () => {
    for (let member of projectMembers) {
      if (member.email === newMemberEmail.toLowerCase().trim()) return true;
    }
    return false;
  };

  return (
    <Screen>
      <TitleBar
        iconLeft="arrow-back"
        onLeftIconPress={() => navigation.pop()}
        title="Edit Project"
      />

      <ScrollView>
        {/* List of icon selection */}
        <IconSelection
          label="Project Icon"
          projectIcons={projectIcons}
          selectedIcon={projectIcon}
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
            value={DateUtil.convertStringToDate(startDate)}
            mode="date"
            onChange={onStartDateChange}
          />
        )}

        {showEndDate && (
          <DateTimePicker
            value={DateUtil.convertStringToDate(endDate)}
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
            onRemoveMember={(member) => removeMember(member)}
            onMakeOwner={(member) => makeOwner(member)}
          />
        )}

        {/* Add member section */}
        <FormInputField
          label="New Member"
          leftIcon="new-box"
          rightIcon="plus"
          onRightIconPress={addMember}
          value={newMemberEmail}
          placeholder="Enter new member email"
          onChangeText={setNewMemberEmail}
          numberOfLines={1}
        />

        <ErrorMessage error={errorMsg} visible={errorMsg} />

        <Button
          title="Save"
          onPress={updateProject}
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            backgroundColor: defaultStyles.colors.primary,
          }}
        />

        <Button
          title="Delete Project"
          onPress={deleteProject}
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            backgroundColor: defaultStyles.colors.danger,
            marginBottom: 24,
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: defaultStyles.margin.medium,
    marginHorizontal: defaultStyles.margin.large,
  },
});

export default ProjectDetailEditScreen;
