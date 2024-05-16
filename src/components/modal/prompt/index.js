import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import TouchableOpacityComponent from "../../touchable-opacity";
import { AppColors } from "../../../constants/colors";

const PromptModal = ({ visible, setModalVisible, handleDeleteUser }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Delete user?</Text>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{ marginHorizontal: 10, paddingHorizontal: 10, flex: 1 }}
              >
                <TouchableOpacityComponent
                  size={"s"}
                  type={AppColors.secondary}
                  text={"Cancel"}
                  handleOnPress={() => setModalVisible(!visible)}
                />
              </View>

              <View
                style={{ marginHorizontal: 10, paddingHorizontal: 10, flex: 1 }}
              >
                <TouchableOpacityComponent
                  size={"s"}
                  type={"green"}
                  text={"Yes"}
                  handleOnPress={handleDeleteUser}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: "center",
    position: "absolute",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PromptModal;
