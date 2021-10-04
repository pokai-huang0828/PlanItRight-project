import React, { useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import TitleBar from "./../components/TitleBar";
import moment from "moment"

import { Button as REButton, Icon } from "react-native-elements";

import logoImage from "../assets/PlanItRightLogo.png";
import Card from "./../components/Card";
import InputField from "./../components/InputField";
import defaultStyles from "./../config/styles";
import FormInputField from "./../components/FormInputField";

import DateTimePicker from "@react-native-community/datetimepicker";
import Screen from "./../components/Screen";
import { set } from "react-native-reanimated";

function TestScreen(props) {
  const [word, setWord] = useState("dword");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <Screen style={styles.container}>
    <ScrollView>

      <REButton title="Show Button" onPress={() => setShow(!show)} />
      {show && <Text>Testing</Text>}

      <View>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={onChange}
          />
        )}
      </View>

      <FormInputField
        label="Project Name"
        leftIcon="folder"
        maxLength={50}
        numberOfLines={1}
      />
      <FormInputField
        label="Project Description"
        leftIcon="folder-information"
        maxLength={500}
        numberOfLines={4}
        multiline
        value={word}
        onChangeText={(text) => setWord(text)}
      />
      <TouchableOpacity onPress={showDatepicker}>
      <FormInputField
        label="Start Date"
        leftIcon="clock"
        value={moment(date).format('YYYY-MM-DD')}
        editable={false}
        placeholderTextColor="black"
        numberOfLines={1}
      />
      </TouchableOpacity>

      <Text>word is {moment(date).format('YYYY-MM-DD')}</Text>

    </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TestScreen;
