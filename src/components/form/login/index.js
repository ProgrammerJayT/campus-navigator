import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TouchableOpacityComponent from "../../touchable-opacity";
import { AppColors } from "../../../constants/colors";
import { styles } from "./styles";

const LoginForm = ({ handleFormSubmit }) => {
  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
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
                />
                {errors.email && (
                  <Text style={styles.inputError}>{errors.email}</Text>
                )}
              </View>

              <TouchableOpacityComponent
                  size={"m"}
                  type={AppColors.primary}
                  text={"Submit"}
                  disabled={!isValid}
                  handleOnPress={handleSubmit}
                />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default LoginForm;
