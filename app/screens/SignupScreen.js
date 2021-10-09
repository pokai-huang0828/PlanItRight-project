import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Image } from "react-native-elements";

import colors from "../config/colors";
import defaultStyles from "./../config/styles";
import logoImage from "../assets/PlanItRightLogo.png";
import { InputField, ErrorMessage } from "../components";

import routes from "../navigation/routes";
import { signUp } from "./../API/auth/index";

export default function SignupScreen({ navigation }) {
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
        await signUp(email, password, firstName, lastName);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* place logo here */}
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Create new account</Text>

          <InputField
            inputStyle={styles.input}
            containerStyle={styles.inputField}
            leftIcon="email"
            placeholder=" Enter First Name"
            autoCapitalize="none"
            // keyboardType="text"
            // textContentType="text"
            autoFocus={true}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <InputField
            inputStyle={styles.input}
            containerStyle={styles.inputField}
            leftIcon="email"
            placeholder=" Enter Last Name"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <InputField
            inputStyle={styles.input}
            containerStyle={styles.inputField}
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
            inputStyle={styles.input}
            containerStyle={styles.inputField}
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
            buttonStyle={styles.button}
          />

          <Button
            title="Go to Login"
            onPress={() => navigation.navigate(routes.LOGIN)}
            buttonStyle={styles.button}
          />
        </ScrollView>
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
  input: {
    fontSize: 14,
  },
  inputField: {
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyles.colors.primary,
  },
  title: {
    ...defaultStyles.textTitle,
    paddingBottom: defaultStyles.margin.small,
  },
  button: {
    backgroundColor: colors.primary,
    marginBottom: 24,
  },
});
