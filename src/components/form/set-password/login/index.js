import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TouchableOpacityComponent from "../../../touchable-opacity";
import { AppColors } from "../../../../constants/colors";
import HeaderSection from "../../../screens/header";
import { styles } from "./styles";

const LoginPasswordFormComponent = ({ handleFormSubmit, email }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSection title={"Complete Login"} />

      <ScrollView
        contentContainerStyle={[styles.formContainer]}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={{
            email: email || "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
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
                  placeholder="Email"
                  placeholderTextColor={AppColors.dark}
                  style={styles.textInput}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  editable={false}
                />

                {email && (
                  <Text
                    style={{
                      color: AppColors.success,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Email has been verified
                  </Text>
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
                  <Text style={styles.inputError}>{errors.password}</Text>
                )}
              </View>

              <View style={{ marginHorizontal: "25%" }}>
                <TouchableOpacityComponent
                  size={"m"}
                  type={AppColors.primary}
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
  );
};

export default LoginPasswordFormComponent;
