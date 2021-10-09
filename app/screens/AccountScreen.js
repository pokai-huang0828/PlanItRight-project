import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";

import Screen from "./../components/Screen";
import TitleBar from "./../components/TitleBar";
import FormInputField from "./../components/FormInputField";
import defaultStyles from "./../config/styles";
import ErrorMessage from "./../components/ErrorMessage";

import { AuthenticatedUserContext } from "./../navigation/AuthenticatedUserProvider";
import usersRepository from "../API/repository/users";
import Validate from "../utility/Validate";

function AccountScreen(props) {
  // this user obj contains user UID and email
  const { user } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadUserInfo = async () => {
    const {
      firstName = "",
      lastName = "",
      email = "",
      phoneNumber = "",
    } = await usersRepository.getUserByUID(user.uid);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setLoading(false);
  };

  useEffect(() => {
    // Call this function to get userInfo
    loadUserInfo();
  }, []);

  useEffect(() => {
    setSuccessMsg("");
  }, [firstName, lastName, email, phoneNumber]);

  const onUpdate = () => {
    setSuccessMsg("");
    setErrorMsg("");

    const updatedUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber: phoneNumber.trim(),
    };

    if (firstName === "" || lastName === "" || email === "") {
      setErrorMsg("Please fill in first name, last name, and email.");
    } else if (!Validate.validateEmail(email)) {
      setErrorMsg("Please fill in a valid email.");
    } else {
      usersRepository.updateUser(user.uid, updatedUser);
      setSuccessMsg("Updated Successfully.");
    }
  };

  return (
    <Screen style={styles.container}>
      <TitleBar title="My Account" />
      <ScrollView>
        {!loading && (
          <>
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
              editable={false}
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

            <ErrorMessage error={errorMsg} visible={errorMsg} />
            <ErrorMessage
              error={successMsg}
              visible={successMsg !== ""}
              color={defaultStyles.colors.success}
            />

            <Button
              title="Update"
              onPress={onUpdate}
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                backgroundColor: defaultStyles.colors.primary,
                marginBottom: 24,
              }}
            />
          </>
        )}
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
