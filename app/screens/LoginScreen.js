import React, { useState } from "react";
import { Button, Image } from "react-native-elements";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import colors from "../config/colors";
import defaultStyles from "../config/styles";
import logoImage from "../assets/PlanItRightLogo.png";
import { InputField, ErrorMessage } from "../components";

import { signIn } from "../API/auth";
import routes from "../navigation/routes";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [loginError, setLoginError] = useState("");

  const onLogin = async () => {
    try {
      if (email !== "" && password !== "") await signIn(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Plan it! Do it right!</Text>
          <Text></Text>
          
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

          {loginError ? (
            <ErrorMessage error={loginError} visible={true} />
          ) : null}
         
          <Button
            title="Login"
            titleStyle={{
              fontSize: 25,
            }}
            onPress={onLogin}
            buttonStyle={styles.loginButton}
          ></Button>
          
          <Button
            title="New User?"
            titleStyle={{
              fontSize: 25,
            }}
            onPress={() => navigation.navigate(routes.SIGNUP)}
            buttonStyle={styles.goToSignUpButton}
          ></Button>
        </ScrollView>
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
  input: {
    fontSize: 20,
  },
  inputField: {
    backgroundColor: colors.secondary,
    marginBottom: 20,
    borderRadius: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: defaultStyles.colors.primary,
  },
  loginButton: {
    backgroundColor: colors.primary,
    marginBottom: 24,
    borderRadius: 30,
  },

  goToSignUpButton: {
    backgroundColor: colors.primary,
    marginBottom: 24,
    borderRadius: 30,
  },
  title: {
    ...defaultStyles.textTitle,
    paddingBottom: defaultStyles.margin.small,
  },
});
