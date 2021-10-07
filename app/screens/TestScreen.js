import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import projectRepository from "../API/repository/projects";

function TestScreen(props) {
  const [projects, setProjects] = useState([]);

  const loadData = async () => {
    setProjects(
      await projectRepository.getProjects("8cpwRHIqCHgd8L4mHwmALKibLh82")
    );
  };

  useEffect(() => {
    loadData();

    const unsubscriber = projectRepository.onProjectsChange(
      "8cpwRHIqCHgd8L4mHwmALKibLh82",
      loadData
    );

    return unsubscriber;
  }, []);

  return (
    <View style={styles.container}>
      <Text>dkjdsk</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TestScreen;
