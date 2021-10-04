import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Screen from "./../components/Screen";
import TitleBar from "./../components/TitleBar";
import FormInputField from "./../components/FormInputField";
import defaultStyles from "./../config/styles";
import FormInputLabel from './../components/FormInputLabel';

const STATUS = {
  IN_BACKLOG: "IN_BACKLOG",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
};

function TaskDetailEditScreen(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [isBacklog, setBacklog] = useState(true);
  const [isInProgress, setInProgress] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

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

  const handleStatusRadioCheck = (radioItemPressed) => {
    if (radioItemPressed === STATUS.IN_BACKLOG) {
      setBacklog(true);
      setInProgress(false);
      setCompleted(false);
    } else if (radioItemPressed === STATUS.IN_PROGRESS) {
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
      <TitleBar title="Task Details Edit" />
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

        <FormInputField
          label="Assignee"
          leftIcon="account"
          maxLength={50}
          numberOfLines={1}
          value={assignee}
          onChangeText={(text) => setAssignee(text)}
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

        {/* Add Status Radio Buttons */}
        <FormInputLabel label="Status" iconName="progress-check" />

        <CheckBox
          title="In Backlog"
          containerStyle={styles.checkBoxStyle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isBacklog}
          onPress={() => handleStatusRadioCheck(STATUS.IN_BACKLOG)}
        />
        <CheckBox
          title="In Progress"
          containerStyle={styles.checkBoxStyle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isInProgress}
          onPress={() => handleStatusRadioCheck(STATUS.IN_PROGRESS)}
        />
        <CheckBox
          title="In Completed"
          containerStyle={styles.checkBoxStyle}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isCompleted}
          onPress={() => handleStatusRadioCheck(STATUS.COMPLETED)}
        />

        <Button
          title="Confirm"
          onPress={() => console.log("press task detail update")}
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
    backgroundColor: "white",
    borderWidth: 0,
  }
});

export default TaskDetailEditScreen;
