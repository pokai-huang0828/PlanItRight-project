import React from "react";
import { StyleSheet, Text } from "react-native";
import defaultStyles from "./../config/styles";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: defaultStyles.colors.danger,
    fontSize: defaultStyles.text.fontSize,
    marginBottom: defaultStyles.margin.medium,
    paddingHorizontal: defaultStyles.margin.small,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ErrorMessage;
