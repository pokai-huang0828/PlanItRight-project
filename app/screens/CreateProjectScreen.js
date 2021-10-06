import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import Screen from "../components/Screen";
import FormInputField from "./../components/FormInputField";
import TitleBar from "./../components/TitleBar";
import defaultStyles from "./../config/styles";
import IconSelection from "../components/IconSelection";
import { projectIcons } from "./../config/projectIcons";
import DateUtil from "../utility/DateUtil";
import ErrorMessage from "./../components/ErrorMessage";

import { AuthenticatedUserContext } from "./../navigation/AuthenticatedUserProvider";
import projectRepository from "../API/repository/projects";
import routes from "../navigation/routes";

function CreateProjectScreen({ navigation }) {
  // User obj contains user UID and email
  const { user } = useContext(AuthenticatedUserContext);

  const [projectIcon, setProjectIcon] = useState(projectIcons[0]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

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

  const onCreatePressed = () => {
    setErrorMsg("");

    const newProject = {
      icon: projectIcon,
      name: projectName,
      description: projectDescription,
      startDate: DateUtil.formatDate(startDate, "YYYY-MM-DD"),
      endDate: DateUtil.formatDate(endDate, "YYYY-MM-DD"),
      owners: [user.uid],
      members: [user.uid],
      tasks: [],
    };

    // Validate project name and description are not empty
    if (projectName == "" || projectDescription == "") {
      return setErrorMsg("Please enter project name and description.");
    }
    // Validate date difference is greater than -1
    else if (DateUtil.calculateDayDifference(endDate, startDate) < 0) {
      return setErrorMsg("End Date cannot be before start date.");
    } else {
      projectRepository.addProject(newProject);
      resetForm();
      navigation.navigate(routes.HOMESTACK);
    }
  };

  const resetForm = () => {
    setProjectIcon(projectIcons[0]);
    setProjectName("");
    setProjectDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <Screen>
      <TitleBar title="New Project" />

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

        {/* Calendar pop-ups */}
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

        <ErrorMessage error={errorMsg} visible={errorMsg} />

        <Button
          title="Create"
          onPress={onCreatePressed}
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

export default CreateProjectScreen;
