import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import routes from "../navigation/routes";

function ProjectDetailScreen({ route, navigation }) {
  const project = route.params;

  return (
    <View style={styles.container}>
      <Text>Project Name: {project.name} </Text>

      {project.tasks.map((task) => (
        <TouchableOpacity
          key={task.title}
          onPress={() => navigation.navigate(routes.TASK_DETAIL, task)}
        >
          <Text>{task.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProjectDetailScreen;
