import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";

import Screen from "./../components/Screen";
import TitleBar from "./../components/TitleBar";
import FormInputField from "./../components/FormInputField";
import defaultStyles from "./../config/styles";

function AccountScreen(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Screen style={styles.container}>
      <TitleBar title="My Account" />
      <ScrollView>
        <FormInputField
          label="First Name"
          leftIcon="account"
          maxLength={50}
          numberOfLines={1}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <FormInputField
          label="Last Name"
          leftIcon="account"
          maxLength={50}
          numberOfLines={1}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <FormInputField
          label="Email"
          leftIcon="email"
          maxLength={50}
          numberOfLines={1}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <FormInputField
          label="Phone Number"
          leftIcon="phone"
          maxLength={50}
          numberOfLines={1}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <Button
          title="Update Account"
          onPress={() => console.log("press update account")}
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            backgroundColor: defaultStyles.colors.primary,
            marginBottom: 24,
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: defaultStyles.margin.large,
  },
});

export default AccountScreen;
