import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Screen from "../components/Screen";
import FormInputField from "./../components/FormInputField";
import TitleBar from "./../components/TitleBar";
import defaultStyles from "./../config/styles";
import IconSelection from "../components/IconSelection";
import { projectIcons } from "./../config/projectIcons";

function CreateProjectScreen(props) {
  const [projectIcon, setProjectIcon] = useState(projectIcons[0]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

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

export default CreateProjectScreen;
