import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

import defaultStyles from "../config/styles";
import FormInputLabel from "./FormInputLabel";

function IconSelection({ projectIcons, onSelected, label }) {
  const [selectedIcon, setSelectedIcon] = useState("");

  const handleSelection = (icon) => {
    setSelectedIcon(icon);
    onSelected(icon);
  };

  return (
    <>
      {projectIcons && (
        <>
          <FormInputLabel label={label} iconName="apps-box" />

          <ScrollView
            style={styles.iconsContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {projectIcons.map((icon) => (
              <Icon
                name={icon}
                key={icon}
                size={defaultStyles.icon.largeSize}
                containerStyle={styles.icons}
                color={
                  selectedIcon === icon
                    ? defaultStyles.colors.primary
                    : defaultStyles.colors.black
                }
                onPress={() => handleSelection(icon)}
              />
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  iconsContainer: {
    padding: defaultStyles.margin.small,
  },
  icons: {
    paddingEnd: defaultStyles.margin.small,
  },
});

export default IconSelection;
