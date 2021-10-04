import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";
import { Button, Image } from "react-native-elements";

import { InputField, ErrorMessage } from "../components";
import colors from "../config/colors";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { signUp } from "./../API/auth/index";
import defaultStyles from "./../config/styles";
import logoImage from "../assets/PlanItRightLogo.png";

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
        const currentUser = await signUp(email, password, firstName, lastName);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar style="dark-content" /> */}

      <View style={styles.logoContainer}>
        {/* place logo here */}
        <Image
          source={logoImage}
          style={{ width: 100, height: 100 }}
        />
      </View>

      <View style={styles.contentContainer}>
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

        {signupError ? (
          <ErrorMessage error={signupError} visible={true} />
        ) : null}

        <Button
          title="Signup"
          onPress={onHandleSignup}
          buttonStyle={{ backgroundColor: colors.primary, marginBottom: 24 }}
        />

        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
          buttonStyle={{ backgroundColor: colors.primary, marginBottom: 24 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainer: {
    flex: 3,
    backgroundColor: defaultStyles.colors.white,
    padding: 24,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyles.colors.primary,
  },
  title: defaultStyles.textTitle,
});
