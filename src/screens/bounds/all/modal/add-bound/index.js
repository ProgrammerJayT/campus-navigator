import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { AppColors } from "../../../../../constants/colors";
import { Formik } from "formik";
import * as Yup from "yup";

const BoundsModalComponent = ({
  visible,
  setVisible,
  coords,
  submit,
  loading,
  setLoading,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.modalHeaderText}>Bound Coordinates</Text>
            </View>

            <Text style={styles.modalText}>
              Latitude: {coords?.latitude || "No latitude"}
            </Text>
            <Text style={styles.modalText}>
              Longitude: {coords?.longitude || "No longitude"}
            </Text>

            <Formik
              initialValues={{
                surroundings: "",
              }}
              validationSchema={Yup.object().shape({
                surroundings: Yup.string().required(
                  "Surroundings field is required"
                ),
              })}
              onSubmit={submit}
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
                  <View>
                    <TextInput
                      placeholder="Surroundings Description"
                      style={styles.textInput}
                      onChangeText={handleChange("surroundings")}
                      onBlur={handleBlur("surroundings")}
                      value={values.surroundings}
                    />
                    {errors.surroundings && (
                      <Text style={styles.error}>{errors.surroundings}</Text>
                    )}
                  </View>

                  <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    {loading ? (
                      <View
                        style={{
                          textAlign: "center",
                          width: "100%",
                          marginTop: 20,
                        }}
                      >
                        <ActivityIndicator
                          color={AppColors.accent}
                          size={"large"}
                        />
                      </View>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={[
                            styles.button,
                            {
                              marginHorizontal: 10,
                              backgroundColor: AppColors.danger,
                            },
                          ]}
                          onPress={() => setVisible(!visible)}
                        >
                          <Text style={styles.submitButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.button,
                            {
                              marginHorizontal: 10,
                            },
                          ]}
                          onPress={() => handleSubmit(values)}
                          disabled={!isValid}
                        >
                          <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: "10%",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: AppColors.success,
    marginTop: 10,
    flex: 1,
  },
  submitButtonText: {
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
  },
  modalHeaderText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    color: AppColors.background,
  },
  headerTextContainer: {
    backgroundColor: "black",
    marginHorizontal: "5%",
    marginTop: -15,
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  textInput: {
    borderColor: "#000000",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  error: {
    textAlign: "center",
    color: "red",
    fontSize: 12,
    marginBottom: 0,
  },
});

export default BoundsModalComponent;
