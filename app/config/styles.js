import { Platform } from "react-native";
import colors from "./colors";

// Store all styles that will be reused in the app here

const defaultStyles = {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};

export default defaultStyles;
