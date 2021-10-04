import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "./../config/styles";
import FormInputLabel from "./FormInputLabel";

function ProjectMembersField({ projectOwners, projectMembers, onChange }) {
  const isProjectOwner = (member) => {
    // check if this member is in the projectOwner array
    return projectOwners.includes(member);
  };

  return (
    <View>
      <FormInputLabel label="Project Members" iconName="account-group" />
      {projectMembers.map((member) => (
        <View key={`${member.uid}`} style={styles.userContainer}>
          <TextInput
            style={styles.input}
            value={member.firstName + " " + member.lastName}
          />

          <MaterialCommunityIcons
            name="delete-alert"
            size={defaultStyles.icon.size}
            color={defaultStyles.colors.danger}
            style={styles.icon}
          />
          <MaterialCommunityIcons
            name="crown"
            size={defaultStyles.icon.size}
            color={
              isProjectOwner(member)
                ? defaultStyles.colors.primary
                : defaultStyles.colors.black
            }
            style={styles.icon}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    borderRadius: 4,
    margin: defaultStyles.margin.small,
    alignItems: "center",
  },
  label: defaultStyles.inputLabel,
  icon: {
    marginRight: defaultStyles.margin.tiny,
  },
  input: {
    flex: 1,
    fontSize: defaultStyles.text.fontSize,
    borderRadius: defaultStyles.border.borderRadius,
    borderColor: defaultStyles.colors.primary,
    borderWidth: defaultStyles.border.borderWidth,
    padding: defaultStyles.margin.small,
    marginRight: defaultStyles.margin.tiny,
  },
});

export default ProjectMembersField;
