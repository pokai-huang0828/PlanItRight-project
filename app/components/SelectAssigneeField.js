import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import defaultStyles from "./../config/styles";
import FormInputLabel from "./FormInputLabel";
import { TouchableOpacity } from "react-native-gesture-handler";

function SelectAssigneeField({ projectMembers, selectedAssignee, onSelect }) {
  const onAssigneeSelected = (selectedAssignee) => {
    onSelect(selectedAssignee);
  };

  return (
    <View>
      <FormInputLabel label="Select An Assignee" iconName="account-group" />

      {projectMembers.map((member) => (
        <TouchableOpacity
          key={`${member.uid}`}
          onPress={() => onAssigneeSelected(member)}
        >
          <View
            style={[
              styles.userContainer,
              selectedAssignee.uid === member.uid
                ? { backgroundColor: defaultStyles.colors.primary }
                : { backgroundColor: "transparent" },
            ]}
          >
            <Text
              style={[
                styles.input,
                selectedAssignee.uid === member.uid
                  ? { color: defaultStyles.colors.white }
                  : { color: defaultStyles.colors.black },
              ]}
            >
              {member.firstName + " " + member.lastName}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  addMemberContainerStyle: {
    alignSelf: "center",
  },
  userContainer: {
    flexDirection: "row",
    borderRadius: 4,
    margin: defaultStyles.margin.small,
    alignItems: "center",
    borderRadius: defaultStyles.border.borderRadius,
    borderColor: defaultStyles.colors.primary,
    borderWidth: defaultStyles.border.borderWidth,
    padding: defaultStyles.margin.small,
  },
  label: defaultStyles.inputLabel,
  icon: {
    marginRight: defaultStyles.margin.tiny,
  },
  input: {
    flex: 1,
    fontSize: defaultStyles.text.fontSize,
    marginRight: defaultStyles.margin.tiny,
  },
});

export default SelectAssigneeField;
