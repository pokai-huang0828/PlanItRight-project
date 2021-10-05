import { Platform } from "react-native";
import colors from "./colors";

// Store all styles that will be reused in the app here

const defaultStyles = {
  colors,
  text: {
    color: colors.dark,
    fontSizeSmall: 12,
    fontSize: 18,
    fontSizeLarge: 24,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
  },
  margin: {
    tiny: 5,
    small: 10,
    medium: 15,
    large: 20,
  },
  border: {
    borderColor: colors.light,
    borderRadius: 10,
    borderWidth: 2,
  },
  icon: {
    size: 30,
    largeSize: 60,
  },
};

export default defaultStyles;
