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
  rightIcon,
  onRightIconPress,
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

      <View style={styles.labelContainer}>
        <TextInput
          {...rest}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, inputStyle]}
        />
        {rightIcon && (
          <MaterialCommunityIcons
            name={rightIcon}
            size={defaultStyles.icon.size}
            color={defaultStyles.colors.primary}
            style={styles.icon}
            onPress={onRightIconPress}
          />
        )}
      </View>
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
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: defaultStyles.text.fontSize,
    borderRadius: defaultStyles.border.borderRadius,
    borderColor: defaultStyles.colors.primary,
    borderWidth: defaultStyles.border.borderWidth,
    padding: defaultStyles.margin.small,
  },
});

export default FormInputField;
