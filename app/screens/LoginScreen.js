import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, Image } from "react-native-elements";

import { InputField, ErrorMessage } from "../components";
import { signIn } from "../API/auth";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import logoImage from "../assets/PlanItRightLogo.png";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") {
        await signIn(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar style="dark-content" /> */}

      <View style={styles.logoContainer}>
        {/* place logo here */}
        <Image
          source={logoImage}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <View style={styles.contentContainer}>
        {/* the rest of the content */}
        <Text style={styles.title}>Login</Text>

        <InputField
          inputStyle={{
            fontSize: 14
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

        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}

        <Button
          title="Login"
          onPress={onLogin}
          buttonStyle={{ backgroundColor: colors.primary, marginBottom: 24 }}
        />

        <Button
          title="Go to Signup"
          onPress={() => navigation.navigate("Signup")}
          buttonStyle={{
            backgroundColor: colors.primary,
            marginBottom: 24,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.primary,
  },
  contentContainer: {
    flex: 2,
    backgroundColor: defaultStyles.colors.white,
    padding: 24,
  },
  logoContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyles.colors.primary,
  },
  title: defaultStyles.textTitle,
});
