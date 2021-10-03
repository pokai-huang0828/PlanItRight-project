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
  textTitle:{
    fontSize: 24,
    fontWeight: "600",
    color: colors.primary,
    alignSelf: "center",
    paddingBottom: 24,
  },
  margin: {
    small: 10,
    medium: 15,
    large: 20
  } 
};

export default defaultStyles;
