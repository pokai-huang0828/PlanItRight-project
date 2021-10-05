import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

import defaultStyles from "./../config/styles";

function ProjectTitle({ project, onInfoPressed, onEditPressed }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{project.title}</Text>
      <View style={styles.iconsContainer}>
        <Icon
          containerStyle={styles.moreIconStyle}
          name="more"
          onPress={onInfoPressed}
          size={defaultStyles.icon.size}
        />
        <Icon
          name="edit"
          onPress={onEditPressed}
          size={defaultStyles.icon.size}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: defaultStyles.margin.small,
  },
  titleText: {
    flex: 2,
    fontSize: defaultStyles.text.fontSizeLarge,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  moreIconStyle: {
    marginEnd: defaultStyles.margin.small,
  },
});

export default ProjectTitle;
