import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Overlay } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "./../config/styles";
import FormInputLabel from "./FormInputLabel";
import { TouchableOpacity } from "react-native-gesture-handler";

function ProjectMembersField({ projectOwners, projectMembers, onChange }) {
  const [openAddMemberDialog, setOpenAddMemberDialog] = useState(false);

  const isProjectOwner = (member) => {
    // check if this member is in the projectOwner array
    return projectOwners.includes(member);
  };

  return (
    <View>
      <FormInputLabel label="Project Members" iconName="account-group" />

      {projectMembers.map((member) => (
        <View key={`${member.uid}`} style={styles.userContainer}>
          <Text style={styles.input}>
            {member.firstName + " " + member.lastName}
          </Text>

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

      {/* Add New Member Section */}
      <TouchableOpacity onPress={() => setOpenAddMemberDialog(true)}>
        <FormInputLabel
          label="Add Members"
          iconName="plus"
          containerStyle={styles.addMemberContainerStyle}
        />
      </TouchableOpacity>

      {/* Add Member Dialog */}
      <Overlay
        isVisible={openAddMemberDialog}
        onBackdropPress={() => {
          setOpenAddMemberDialog(false);
        }}
      >
        <Text>Hello from Overlay!</Text>
        <Text>Hello from Overlay!</Text>
        <Text>Hello from Overlay!</Text>
        <Text>Hello from Overlay!</Text>
      </Overlay>
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
