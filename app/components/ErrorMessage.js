import React from "react";
import { StyleSheet, Text } from "react-native";
import defaultStyles from "./../config/styles";

const ErrorMessage = ({
  error,
  visible,
  color = defaultStyles.colors.danger,
}) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={[styles.errorText, { color }]}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: defaultStyles.text.fontSize,
    marginBottom: defaultStyles.margin.medium,
    paddingHorizontal: defaultStyles.margin.small,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ErrorMessage;
