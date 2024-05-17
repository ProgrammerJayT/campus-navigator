import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import RegisterLogo from "../../../../assets/images/register.png";
import { Formik } from "formik";
import * as Yup from "yup";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import { styles } from "./styles";
import SpinnerComponent from "../../../components/spinner";
import { register } from "../../../services/auth";
import { failedRequest } from "../../../services/exception";
import Toast from "react-native-root-toast";
import { axiosHeaders } from "../../../services/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ComponentsStateContext from "../../../state-management/context/components";

const RegisterScreen = ({ navigation }) => {
  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const handleFormSubmit = async (values) => {
    console.log("Form submitted:", values);

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));

    const response = await register(values);

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: false,
    }));

    if (!response.token) {
      Toast.show(failedRequest(response).message, {
        duration: Toast.durations.LONG,
        backgroundColor: "red",
      });
      console.log("Register response", failedRequest(response).message);
    } else {
      console.log("Token", response.token);

      const saveToken = async () => {
        await AsyncStorage.setItem("token", response.token);
      };

      saveToken();
      axiosHeaders();

      navigation.navigate("Home", { new: true });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text
              style={{ textAlign: "center", fontSize: 25, marginBottom: 15 }}
            >
              Registration
            </Text>
            <Image source={RegisterLogo} style={styles.logo} />

            <Formik
              initialValues={{
                name: "",
                surname: "",
                email: "",
                password: "",
                verifyPassword: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                surname: Yup.string().required("Surname is required"),
                email: Yup.string()
                  .email("Invalid email")
                  .required("Email is required"),
                password: Yup.string()
                  .required("Password is required")
                  .min(8, "Password must be at least 8 characters"),
                verifyPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Please confirm your password"),
              })}
              onSubmit={handleFormSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Name"
                      style={styles.textInput}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                    {errors.name && (
                      <Text style={styles.error}>{errors.name}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Surname"
                      style={styles.textInput}
                      onChangeText={handleChange("surname")}
                      onBlur={handleBlur("surname")}
                      value={values.surname}
                    />
                    {errors.surname && (
                      <Text style={styles.error}>{errors.surname}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Email"
                      style={styles.textInput}
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Password"
                      style={styles.textInput}
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    {errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Re-Password"
                      style={styles.textInput}
                      secureTextEntry
                      onChangeText={handleChange("verifyPassword")}
                      onBlur={handleBlur("verifyPassword")}
                      value={values.verifyPassword}
                    />
                    {errors.verifyPassword && (
                      <Text style={styles.error}>{errors.verifyPassword}</Text>
                    )}
                  </View>

                  <View style={{ marginTop: 50 }}>
                    <TouchableOpacityComponent
                      size={"m"}
                      type={AppColors.secondary}
                      text={"Submit"}
                      disabled={!isValid}
                      handleOnPress={handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
