import React, { useContext, useEffect, useState } from "react";
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
import CreateInterestsPlaceLogo from "../../../../assets/images/create-interests-place.png";
import { Formik } from "formik";
import * as Yup from "yup";
import TouchableOpacityComponent from "../../../components/touchable-opacity";
import { AppColors } from "../../../constants/colors";
import { styles } from "./styles";
import SpinnerComponent from "../../../components/spinner";
import { login } from "../../../services/auth";
import { failedRequest } from "../../../services/exception";
import Toast from "react-native-root-toast";
import { axiosHeaders } from "../../../services/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationStateContext from "../../../state-management/context/location";
import { createInterestsPlace } from "../../../services/interests-places";
import ComponentsStateContext from "../../../state-management/context/components";

const CreateInterestsPlaceScreen = ({ navigation }) => {
  const { location } = useContext(LocationStateContext);

  const { lottieLoadingComponent, setLottieLoadingComponent } = useContext(
    ComponentsStateContext
  );

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Location updated in create", location);
    setLatitude(location?.latitude || 0);
    setLongitude(location?.longitude || 0);
  }, [location]);

  const handleFormSubmit = async (values, { resetForm }) => {
    const placeValues = {
      name: values.name,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
    };

    console.log("Form submitted:", placeValues);

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: true,
    }));

    const response = await createInterestsPlace(placeValues);

    console.log("Response", response);

    setLottieLoadingComponent((lottieLoadingComponent) => ({
      ...lottieLoadingComponent,
      visible: false,
    }));

    response.interestsPlace ? resetForm() : null;

    Toast.show(
      response.interestsPlace
        ? "Interests place created successfully"
        : failedRequest(response).message,
      {
        duration: Toast.durations.LONG,
        backgroundColor: response.interestsPlace ? "green" : "red",
      }
    );
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
              style={{ textAlign: "center", fontSize: 25, marginVertical: 15 }}
            >
              Create Interests Place
            </Text>
            <Image source={CreateInterestsPlaceLogo} style={styles.logo} />

            <View style={{ flex: 1 }} />

            <Formik
              initialValues={{
                name: "",
                latitude: "",
                longitude: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .required("Name is required")
                  .min(3, "Name must be at least 3 characters long"),
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
                      placeholder="Latitude"
                      style={styles.textInput}
                      value={latitude.toString()}
                      editable={false}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Longitude"
                      style={styles.textInput}
                      value={longitude.toString()}
                      editable={false}
                    />
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

export default CreateInterestsPlaceScreen;
