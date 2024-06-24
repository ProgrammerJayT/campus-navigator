import { AppColors } from "../../../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  confirmButton: {
    backgroundColor: AppColors.success,
    width: "100%",
    borderRadius: 10,
  },

  confirmButtonText: {
    padding: 10,
    textAlign: "center",
    color: AppColors.background,
  },

  confirmMessageText: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
});
