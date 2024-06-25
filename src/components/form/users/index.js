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

const UserForm = ({
  handleFormSubmit,
  userType,
  setUserType,
  user,
  intent = "create",
}) => {
  const [accountTypeSwitchEnabled, setAccountTypeSwitchEnabled] = useState(
    userType === "admin" ? true : false
  );

  const toggleSwitch = () => {
    setAccountTypeSwitchEnabled((previousState) => !previousState);
    setUserType(accountTypeSwitchEnabled ? "user" : "admin");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.formContainer]}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={{
            name: user?.name || "",
            surname: user?.surname || "",
            email: user?.email || "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            surname: Yup.string().required("Surname is required"),
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
                <View
                  style={{
                    marginBottom: 15,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      Account Type
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      trackColor={{ false: "#000", true: "#000" }}
                      thumbColor={AppColors.primary}
                      ios_backgroundColor="#000"
                      onValueChange={toggleSwitch}
                      value={accountTypeSwitchEnabled}
                    />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {(userType || "").toUpperCase()}
                    </Text>
                  </View>
                </View>

                <TextInput
                  placeholder="Name"
                  placeholderTextColor={AppColors.dark}
                  style={styles.textInput}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && (
                  <Text style={styles.inputError}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Surname"
                  placeholderTextColor={AppColors.dark}
                  style={styles.textInput}
                  onChangeText={handleChange("surname")}
                  onBlur={handleBlur("surname")}
                  value={values.surname}
                />
                {errors.surname && (
                  <Text style={styles.inputError}>{errors.surname}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={AppColors.dark}
                  style={styles.textInput}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  editable={user ? false : true}
                />
                {errors.email && (
                  <Text style={styles.inputError}>{errors.email}</Text>
                )}

                {user && (
                  <Text style={styles.inputError}>
                    You cannot change this field
                  </Text>
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

export default UserForm;
