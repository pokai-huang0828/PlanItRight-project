import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";

import { Button, InputField, ErrorMessage } from "../components";
import colors from "../config/colors";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { signUp } from "./../API/auth/index";

export default function SignupScreen({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (
        firstName !== "" &&
        lastName !== "" &&
        email !== "" &&
        password !== ""
      ) {
        // Sign Up User with Email and Password
        const currentUser = await signUp(
          email,
          password,
          firstName,
          lastName
        );
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Create new account</Text>

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: colors.white,
          marginBottom: 20,
        }}
        leftIcon="email"
        placeholder=" Enter First Name"
        autoCapitalize="none"
        keyboardType="text"
        textContentType="text"
        autoFocus={true}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: colors.white,
          marginBottom: 20,
        }}
        leftIcon="email"
        placeholder=" Enter Last Name"
        autoCapitalize="none"
        keyboardType="text"
        textContentType="text"
        autoFocus={true}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: colors.white,
          marginBottom: 20,
        }}
        leftIcon="email"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: colors.white,
          marginBottom: 20,
        }}
        leftIcon="lock"
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />

      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}

      <Button
        onPress={onHandleSignup}
        backgroundColor= {colors.secondary}
        title="Signup"
        tileColor={colors.white}
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />

      <RNButton
        onPress={() => navigation.navigate("Login")}
        title="Go to Login"
        color={colors.black}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.white,
    alignSelf: "center",
    paddingBottom: 24,
  },
});
