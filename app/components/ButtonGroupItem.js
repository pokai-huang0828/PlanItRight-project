import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-elements";
import defaultStyles from "./../config/styles";

// badgeLabel is the colored dot beside the button label
// success = green, error = red, primary = blue, warning = yellow
function ButtonGroupItem({ label, badgeLabel }) {
  return (
    <View style={styles.container}>
      <Badge status={badgeLabel} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: defaultStyles.colors.dark,
    fontSize: defaultStyles.text.fontSizeSmall,
    marginStart: defaultStyles.margin.tiny,
  },
});

export default ButtonGroupItem;
