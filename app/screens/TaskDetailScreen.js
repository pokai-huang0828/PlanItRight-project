import React from "react";
import { View, StyleSheet, Text } from "react-native";

function TaskDetailScreen({route}) {
  const task = route.params;

  return (
    <View style={styles.container}>
      <Text>Task Name: {task?.name} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TaskDetailScreen;
