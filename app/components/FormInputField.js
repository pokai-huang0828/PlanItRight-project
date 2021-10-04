import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "./../config/styles";

const FormInputField = ({
  label,
  leftIcon,
  iconColor = "#000",
  inputStyle,
  containerStyle,
  placeholderTextColor = "#444",
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        {leftIcon ? (
          <MaterialCommunityIcons
            name={leftIcon}
            size={defaultStyles.icon.size}
            color={iconColor}
            style={styles.leftIcon}
          />
        ) : null}

        {label && <Text style={styles.label}>{label}</Text>}
      </View>

      <TextInput
        {...rest}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    margin: defaultStyles.margin.small,
  },
  labelContainer: {
    flexDirection: "row",
    minHeight: 30,
    alignItems: "center",
  },
  label: defaultStyles.inputLabel,
  leftIcon: {
    marginRight: defaultStyles.margin.tiny,
  },
  input: {
    fontSize: defaultStyles.text.fontSize,
    borderRadius: defaultStyles.border.borderRadius,
    borderColor: defaultStyles.colors.primary,
    borderWidth: defaultStyles.border.borderWidth,
    padding: defaultStyles.margin.small,
  },
});

export default FormInputField;
