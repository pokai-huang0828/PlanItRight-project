import React from "react";
import { View, StyleSheet, Text } from "react-native";

function ProjectDetailScreen({route}) {
  const project = route.params;

  return (
    <View style={styles.container}>
      <Text>Project Name: {project.name} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProjectDetailScreen;
