import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function FormInputLabel({ label, iconName, containerStyle }) {
  return (
    <View style={[styles.labelContainer, containerStyle]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={defaultStyles.icon.size}
          color="black"
          style={styles.leftIcon}
        />
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: defaultStyles.inputLabel,
  labelContainer: {
    flexDirection: "row",
    minHeight: 30,
    alignItems: "center",
    marginHorizontal: defaultStyles.margin.small,
  },
  leftIcon: {
    marginRight: defaultStyles.margin.tiny,
  },
});

export default FormInputLabel;
