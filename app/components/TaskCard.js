import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Badge, Divider, Overlay } from "react-native-elements";
import taskStatus from "../config/taskStatus";

import defaultStyles from "./../config/styles";

function TaskCard({ task }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getStatusColor = () => {
    switch (task.status) {
      case taskStatus.BACKLOG:
        return "error";
      case taskStatus.IN_PROGRESS:
        return "warning";
      case taskStatus.COMPLETED:
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentHeadingContainer}>
        <View style={styles.badgeTextContainer}>
          <Badge status={getStatusColor()} value={" "} />
          <Text style={styles.contentHeadingText} numberOfLines={1}>
            {" "}
            {task.title}
          </Text>
        </View>
        <Icon
          containerStyle={styles.contentIcon}
          name="more"
          color={defaultStyles.colors.white}
          onPress={toggleOverlay}
        />
      </View>

      <Text style={styles.contentText} numberOfLines={1}>
        {task.description}
      </Text>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={styles.dateContainer}>
        <Text style={styles.contentDate}>Start {task.startDate}</Text>
        <Text style={styles.contentDate}>End {task.endDate}</Text>
      </View>

      {/* This is the pop-up section */}
      <Overlay
        overlayStyle={styles.overlayStyle}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View style={styles.badgeTextContainer}>
          <Badge status={getStatusColor()} value={" "} />
          <Text style={styles.contentHeadingText} numberOfLines={1}>
            {" "}
            {task.title}
          </Text>
        </View>

        <Text style={styles.contentText}>{task.description}</Text>

        <Text style={styles.contentDate}>Assignee: {task.assignee}</Text>
        <Text style={styles.contentDate}>Start Date: {task.startDate}</Text>
        <Text style={styles.contentDate}>End Date: {task.endDate}</Text>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    padding: defaultStyles.margin.small,
    marginBottom: defaultStyles.margin.medium,
    backgroundColor: defaultStyles.colors.primary,
    margin: defaultStyles.margin.small,
    borderRadius: defaultStyles.border.borderRadius,
  },
  contentHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: defaultStyles.colors.white,
  },
  contentHeadingText: {
    color: defaultStyles.colors.white,
    fontWeight: defaultStyles.textTitle.fontWeight,
    fontSize: defaultStyles.textTitle.fontSize,
  },
  contentDate: {
    color: defaultStyles.colors.white,
  },
  contentText: {
    color: defaultStyles.colors.white,
    marginVertical: defaultStyles.margin.medium,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginVertical: defaultStyles.margin.small,
  },
  overlayStyle: {
    width: "90%",
    minHeight: "25%",
    padding: defaultStyles.margin.large,
    backgroundColor: defaultStyles.colors.primaryLight,
    borderRadius: defaultStyles.border.borderRadius,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default TaskCard;
