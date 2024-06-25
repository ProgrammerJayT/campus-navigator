import { Text, TextInput, View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TouchableOpacityComponent from "../../../touchable-opacity";
import { AppColors } from "../../../../constants/colors";
import HeaderSection from "../../../screens/header";
import { styles } from "./styles";

const CreatePasswordFormComponent = ({ handleFormSubmit, email }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderSection title={"Create New Password"} />

      <ScrollView
        contentContainerStyle={[styles.formContainer]}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={{
            email: email || "",
            password: "",
            verifyPassword: "",
          }}
          validationSchema={Yup.object().shape({
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
                  <Text style={styles.inputError}>{errors.verifyPassword}</Text>
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

export default CreatePasswordFormComponent;
